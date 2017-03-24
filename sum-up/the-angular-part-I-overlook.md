## angular的核心思想
angular的核心思想是通过在event-loop增加一个自己的angular-contect,来实现操作和修改dom树的🌲的目的。在这其中，最重要的就是dirty-checking机制和scope机制，下面就通过简单实现一个最简单的scope对象，并实现在scope对象上的$watch和$digest,我们可以一窥angular内部机制。

```js
function Scope () {
  this.$$watchers = [];
}

Scope.prototype.$watch = function(watchFn, listenerFn) {
  var watcher = {
    wathcFn:watchFn,
    listenerFn: listenerFn
  };
  this.$$watchers.push(watcher);
};

Scope.prototype.$digest = function() {
  var self = this;
  _.forEach(this.$$watchers, function(watch) {
    var newValue = watch.watchFn(self);
    var oldValue = watch.last;
    if(newValue !== oldValue) {
      watch.listenerFn(newValue, oldValue, self);
      watch.last = newValue;
    }
  })
}
```

上面的就是一个初级的watch和digest函数的实现版本，只要有了$watch和$digest，我们就可以轻松的实现数据脏检查。
```js
var scope = new Scope();
scope.firstName = 'Joe';
scope.counter = 0;

scope.$watch(
  function(scope) {
    return scope.firstName;
  },
  function(newValue, oldValue, scope) {
    scope.counter++;
  }
);
// We haven't run $digest yet so counter should be untouched:
console.assert(scope.counter === 0);

// The first digest causes the listener to be run
scope.$digest();
console.assert(scope.counter === 1);

// Further digests don't call the listener...
scope.$digest();
scope.$digest();
console.assert(scope.counter === 1);

// ... until the value that the watch function is watching changes again
scope.firstName = 'Jane';
scope.$digest();
console.assert(scope.counter === 2);
```

一个简单的`$watch`,`$digest`就这么创造出来了。但是如果我们仔细分析，可以发现如果不同的`watch`之间有依赖关系，那一次`digest`是捕获不了所有的变化的。这时候，我们就需要去改变一下`$digest`函数。

我们可以把以前的`$digest`稍作修改，添加一个`$dirty`变量，函数改为`$$digestOnce`,让 `$digest`函数不断执行`$$digestOnce`，一直到所有`$watch`不再改变。

```js
Scope.prototype.$$digestOnce = function() {
  var self  = this;
  var dirty;
  _.forEach(this.$$watchers, function(watch) {
    var newValue = watch.watchFn(self);
    var oldValue = watch.last;
    if (newValue !== oldValue) {
      watch.listenerFn(newValue, oldValue, self);
      dirty = true;
      watch.last = newValue;
    }
  });
  return dirty;


Scope.prototype.$digest = function() {
  var dirty;
  do {
    dirty = this.$$digestOnce();
  } while (dirty);
};
```

现在，任何一个watchEvent事件都会至少触发两次digestOnce函数。这就达到了每个scope都改变的目的。除此之外，对于类似数组和对象的值的变化，angular本身还用到trueValue的标签来判断是否执行数值检查，如果使用数值检查，就会对scope上绑定的对象做一次深拷贝，一次检查每个值是否改变。

理解了`$digest`和`$watch`,我们下面来研究一下`$apply`,`$apply`的实现方式其实很简单，
```js

Scope.prototype.$apply = function(expr) {
  try {
    return this.$eval(expr);
  } finally {
    this.$digest();
  }
};
```
$eval可以帮助我们去执行当前函数，无论执行结果如何，我们最终都会触发一个digest循环。通过这样的方式我们可以人为的触发$digest,来唤醒前面写到的`$$digestOnce`去遍历 `$$watch`。下面就是一个使用apply第一种传入函数参数的方式去人为更新数据。

(为什么说$apply是触发$rootscope.$digest?不懂这个。)
```js
/* 使用了$apply()会发生什么 */
angular.module('myApp', []).controller('MessageController', function ( $scope ) {
    $scope.getMessage = function () {
        setTimeout(function () {
            $scope.$apply(function () {
                //wrapped this within $apply
                $scope.message = 'Fetched after 3 seconds';
                console.log('message:' + $scope.message);
            });
        }, 2000);
    };

    $scope.getMessage();
});
```

### angular什时候触发dirty-checking？
- DOM事件，譬如用户输入文本，点击按钮等。(`ng-click`)
- XHR响应事件 (`$http`)
- 浏览器Location变更事件 (`$location`)
- Timer事件(`$timeout`, `$interval`)
- 执行`$digest()`或`$apply()`

![imgs](https://cloud.githubusercontent.com/assets/227713/5223551/56c772da-76f6-11e4-9a0d-a847072e91ac.png)


## angular性能该如何优化？

- #### 通过提速$digest cycle
  - 尽少的触发$digest
  -  尽快的执行$digest

- #### 优化$watch
  - 避免watchExpression中执行耗时操作，因为它在每次$digest都会执行1~2次。
  - 避免watchExpression中操作dom，因为它很耗时。
  - ng-if vs ng-show， 前者会移除DOM和对应的watch
  - 避免深度watch， 即第三个参数为true
  - 减少watch的变量长度

- #### 慎用事件
  - 减少事件广播，使用双向数据绑定或共享`service`等方法来代替。
  - `$broadcast`会遍历`scope`和它的`子scope`，而不是只通知注册了该事件的子scope。
  - 一个优化方式是使用`$emit`, 参见angular/angular.js#4574

- ### 规范directive
  - 跟scope数据无关的操作放在compile阶段，它只执行一次。
  - 除了directive外其他地方，特别是controller里面不要操作dom


## angular执行顺序
- 1，原生dom先执行
- 2，寻找页面中的directive，执行directive里的compile函数
- 3，执行page的controller
- 4，执行directive力的contr
- 5，执行directivel里的pre link
- 6，执行directive里的pos tlink
