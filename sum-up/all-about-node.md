
虽然说以前node常见的require作为commonJS的产物，正在逐渐被ES6的import所替代，但是还需要了解一些简单的关于node中的模块机制。首选，我按`node-interview`中的建议去读了下Node关于Module的[文档](https://nodejs.org/dist/latest-v6.x/docs/api/modules.html)。

## `module.export`和`export`的区别
三个知识点:
- `module.export`的初始值为一个空对象{}
- exports是指向的module.exports的引用，requre返回的是node.exports，而不是exports。这就像和下面的例子，直接给对象赋值会改变他的指向，而添加属性方式则不会
- exports其实是module的属性，require则是Module原型的方法。exports.xx=xx，其实跟module.exports.xx=xx其实是一样的，不过如果直接为export赋值，则不能写成exports=xx，而应该写成module.exports=xx，因为exports在这里只是一个引用。

```js
var a = {name: 1};
var b = a;

console.log(a);
console.log(b);

b.name = 2;
console.log(a);
console.log(b);

var b = {name: 3};
console.log(a);
console.log(b);

运行 test.js 结果为：

{ name: 1 }
{ name: 1 }
{ name: 2 }
{ name: 2 }
{ name: 2 }
{ name: 3 }
```
文档上对`module.export`和`export`的使用情况有下面的表示
>If you want the root of your module's export to be a **function (such as a constructor)** or if you want to export a **complete object** in one assignment instead of building it one property at a time, assign it to module.exports instead of exports.


##  `require+模块文件`文件会在第一次声明的时候就运行吗？如果出现相互引用怎么解决?

和ES6不同，当require第一次声明的时候就会运行所有模块内的代码。那么如果`main`引用a和b，但是a引用b，b引用a，形成一个循环的时候怎么办？答案是：
>When main.js loads a.js, then a.js in turn loads b.js. At that point, b.js tries to load a.js. **In order to prevent an infinite loop, an unfinished copy of the a.js exports object is returned to the b.js module**. b.js then finishes loading, and its exports object is provided to the a.js module.

也就是说两个文件相互引用时候不会造成死循环，先执行的导出空对象, 模块在导出的只是 var module = { exports: {} }; 中的 exports, 以从 a.js 启动为例, a.js 还没执行完 exports 就是 {} 在 b.js 的开头拿到的就是 {} 而已


##  `require`缓存机制

对于每一个文件，每次在第一次运行的时候就会cached住运行结果，所以对于连续的`require()`其实会返回相同的object。这一点特性在循环require的时候非常重要，因为能缓存部分执行的结果，所以不会造成死循环。

如果需要多次require时运行不同的结果，则可以考虑export一个函数。

## 省略的路径和文件类型
一般来说，当找不到确切符合文件名的文件后，Node会依次按`.js`，`.json`,`.node`来寻找文件。

当文件路径不以`'/', '../', or './',`开始时，会去当前路径到`node_module`一直到最外层路径的`node_module`文件夹去寻找。
例如，当前脚本文件 /home/ry/projects/foo.js 执行了 require('bar') ，这属于上面的第三种情况。Node 搜索路径如下。
```js
/home/ry/projects/node_modules/bar
/home/ry/node_modules/bar
/home/node_modules/bar
/node_modules/bar
```

## require的实现原理
`require()`这个神奇函数的实现原理都在Node的核心模块，`module.js`中。需要了解`module.require`，我们需要分析一下他的源头，`Module._load`。因为`module.require`就是`Module._load`简单包裹一下后的实现。结合我们前面分析的，让我们先简单形式化表示一下`Module._load`：
```js
Module._load = function(request, parent, isMain) {
  // 1\. 检查 Module._cache 是否有缓存
  // 2\. 如果没有缓存则创建一个新的模块实例
  // 3\. 将模块实例保存到缓存中
  // 4\. 通过给予的filename去调用module.load()，然后调用module.compile()去读取文件内容
  // 5\. 如果文件的载入和解析过程中发生错误，删除缓存中的该模块
  // 6\. 返回 module.exports
};
```
可以看出，`Module._load`是一个负责新模块的加载和管理模块缓存的函数。缓存所有加载过的模块可以减少文件的重复加载并且明显地加快你的应用。

如果一个模块不存在在缓存中，`Module._load `会为这个文件创建一个新的基础模块。`Module._load`会通知模块去读取新的文件的内容，然后把内容送到`module._compile`，`module._compile`的形式化表述如下：

```js
Module.prototype._compile = function(content, filename) {
  // 1\. 创建一个独立的require函数，该函数可以调用module.require。
  // 2\. 给require加上其他帮助性的函数Attach other helper methods to require.
  // 3\. 将代码包裹在一个函数中，并提供了require，module等变量在模块作用域中。
  // 4\. 运行这个函数
};
```

一旦require完成了，整个加载好的源码会被包裹在一个新的函数里面，同时传入require, module, exports和其对外的变量作为新函数的参数。这样就创造了一个新的函数作用域，这样可以避免污染Node的全局环境。

```js
(function (exports, require, module, __filename, __dirname) {
  // 你的代码会被放在这里
});

```

最后，这个包含了模块的函数会被运行。整个`Module._compile`方法的执行时同步的，所以`Module._load`会等待`Module._compile`执行完，然后会返回`module.exports`给用户。

##  AMD, CMD, CommonJS 三者的区别
- `AMD`用在浏览器端，是 `RequireJS`在推广过程中对模块定义的规范化产出。
- `CMD`用在浏览器端， 是 `SeaJS `在推广过程中对模块定义的规范化产出。
- `CommonJS`， Modules/2.0 规范，是服务器端模块的规范，Node.js采用了这个规范。


## 热更新的实现
>在 Node.js 中做热更新代码, 牵扯到的知识点可能主要是 require 会有一个 cache, 有这个 cache 在, 即使你更新了 .js 文件, 在代码中再次 require 还是会拿到之前的编译好缓存在 v8 内存 (code space) 中的的旧代码. 但是如果只是单纯的清除掉 require 中的 cache, 再次 require 确实能拿到新的代码, 但是这时候很容易碰到各地维持旧的引用依旧跑的旧的代码的问题. 如果还要继续推行这种热更新代码的话, 可能要推翻当前的架构, 从头开始从新设计一下目前的框架

有时间可以简单研究一下这个
[一个简单的热更新实现](https://github.com/rayosu/hot-require)

## 关于Promise
首先要清楚的是，Promise是一个对象。Promise对象只有三种状态：
-  异步操作“已完成”（pending）
-  异步操作”已完成“ （resolved）
-  异步操作”失败” （rejected）


这些状态只有两种变化：
- 异步操作成功，Promise对象传回一个值，状态变为resolved。
- 异步操作失败，Promise对象抛出一个错误，状态变为rejected。

Promise对象使用then方法添加回调函数。then方法可以接受两个回调函数，第一个是异步操作成功时（变为resolved状态）时的回调函数，第二个是异步操作失败（变为rejected）时的回调函数（可以省略）。一旦状态改变，就调用相应的回调函数。
除此之外，也可以用catch去捕获promise任何阶段发生的错误。
```js
// po是一个Promise对象
po.then(
  console.log,
  console.error
);

// catch返回
po.then(
  console.log
).catch(
  console.error
);
```

**那么then和catch的不同之处是什么？** 我们用下面这个例子来举例，
```js
//next函数只会处理getData中的reject时的异常情况。
auto.getData().then(function (results) {
     res.send(results);
}, next);
//catch会捕捉到在它之前的promise链上的代码抛出的异常,不仅getData，还包括then()里面
auto.getData().then(function (results) {
     res.send(results);
}).catch(next);
```

最后，用一个以promise实现的`AJAX`来再次巩固一下`promise`的用法。
```js

function getUrl(url) {
  const xhr = new XMLHttpRequest();
  let promise = new Promise((resolve, reject) => {
      xhr.open('GET',url, true);
      xhr.onload = (e) =>{
        if (this.status === 200) {
          const result = JSON.parse(this.responseText);
          resolve(result);
        }
      };
      xhr.onerror = (e) => reject(e);
      xhr.send();
  })
 return promise;
}

getUrl("www.baidu.com").then((data) =>{
  console.log('success',data);
}).catch( error => console.log('error',error))


```



### express框架中为什么要传递next？




## 引用：
- [Node Interview - Github](https://github.com/ElemeFE/node-interview)
- [requrie()工作原理-CSDN](http://blog.csdn.net/u012362458/article/details/57405141)
