## JavaScript到底有几个类型？

js的类型划分有些混乱，但从常规来说，js有八种类型，前提是特殊的对象如函数和数组算作是Object类型，Error当做单独的类型。

- Number  
- String
- Boolean
- Symbol( Es6 )
- Object
  - Function
  - Array
  - Date
  - RegExp
- Null
- Undefined
- Error

要注意的是，Number和String还有Booolean等基本类型也可以通过“包装类”的方式变成对象类型数据来处理。可以说，`JavaScript`中的绝大部分数据都是对象，而且每个对象都继承于一个根对象，这个根对象就是`Object.prototype`。

```js
console.log( Object.getPrototypeOf( obj1 ) === Object.prototype ); // 输出：true
console.log( Object.getPrototypeOf( obj2 ) === Object.prototype ); // 输出：true
```
----------------

## 对象里的_proto_属性和constructor都有哪些作用？

`_proto_`是JavaScript给对象提供的一个隐藏属性，某个对象的`_proto_`会默认指向他`construction`的原型对象,即`{construction}.prototype`。

所以说， `_proto_`起到一个纽带的作用，可以清楚的让我们知道这个对象有哪些继承，或者说还指向哪些对象。因为我们前面说过，`JavaScript`的对象最初都是由`Object.prototype`对象克隆而来的，那该怎么做到原型链的结构呢？答案就是通过改变对象构造器的原型指向，即`{construction}.prototype`，除了指向`Object.prototype`以外，还可以动态的指向其他对象。


------------

## 将string转为数字有几种方法，有什么不同？
首先最常用的方法是`parseInt()`，该内置函数可以接收一个字符串并把它转为整数，而且parseInt还接收第二个参数，可以规定以什么进制去看待这个字符数。

还有一个不太常用的方法是`parseFloat()`,作用是将字符串解析为浮点数并返回。这个函数没有第二个参数。

除此之外，还有一个比较常用的方法就是在字符串前用`+`，即可将字符串中转为number类型数字。

需要注意的一点是，对于用`+`来转换字符串时，字符串如果是一个不可转换的值，则直接返回`NaN`,而`parseInt()` 和 `parseFloat()`是将字符串一个个拆分成字符后进行转换，如果分解的字符串里有可以转化的部分，那就会返回可分解的部分。

既然说到`NaN`，必须记住`NaN`与认识数相加都是`NaN`，对于数字或者字符串，我们可以用`isNaN()`函数来判断当前或者转换后是否是一个数字。


## 什么类型会被转换成false，什么类型是true？

- false、0、空字符串("")、NaN、null 和 undefined 被转换为 false
所有其他值被转换为 true

- 所有其他值被转换为 true


## 到底什么是多态？

多态其实是一种思想，是面向对象编程思想的一个重要表现。简单来说，多态就是对于不同的对象，同一个函数或者方法可以产生不同的解释和执行效果。形象化来说，就是“做什么”和”谁去做“，”怎么做”完全分离开。所以多态的作用显然易见，就是去除代码的耦合性。这一点在强类型语言例如java可以通过父类或者超类的继承来实现，但是在js中，因为没有类型检测，一个对象可以表示多个类型对象，所以说js的多态性与生俱来。下面这个例子就很好的诠释了多态。

> 在电影的拍摄现场，当导演喊出“action”时，主角开始背台词，照明师负责打灯 光，后面的群众演员假装中枪倒地，道具师往镜头里撒上雪花。在得到同一个消息时， 每个对象都知道自己应该做什么。如果不利用对象的多态性，而是用面向过程的方式来 编写这一段代码，那么相当于在电影开始拍摄之后，导演每次都要走到每个人的面前， 确认它们的职业分工（类型），然后告诉他们要做什么。如果映射到程序中，那么程序 中将充斥着条件分支语句。


## 用最精炼的语言去解释this？

在`JavaScript`中，**this永远指向一个对象，但是具体指向哪个对象是由函数运行的时候基于函数的执行环境去绑定，而不是在函数声明时候的环境。**


## call 和 apply 的用途 ？
首先要回答的是，call和apply都是干的一个事情，他们两的区别只在于传入参数的形式不同，apply传入的第二个参数可以使数组或者类数组，call传入的参数数量不固定。

- #### 改变this指向
最常见的用途之一，可以从如下的例子中看出
```js
var obj1 = { name: 'sven' };
var obj2 = { name: 'anne' };
window.name = 'window';
var getName = function(){
  alert ( this.name );
};
getName(); // 输出: window
getName.call( obj1 ); // 输出: sven
getName.call( obj2 ); // 输出: anne
```

- #### 借用其他对象的方法

  借用方法的第一种场景是借用构造函数，通过这种技术，可以实现类似继承的效果
```js
var A = function( name ){
  this.name = name;
};
var B = function(){
  A.apply( this, arguments );
};
B.prototype.getName = function(){
  return this.name;
};
var b = new B( 'sven' );
console.log( b.getName() ); // 输出： 'sven'

```
   借用方法的第二章是借用一些内置函数的内置方法。

  比如说函数的参数列表 `arguments` 是一个类数组对象，虽然它也有“下标”，但它并非真正的数组， 所以也不能像数组一样，进行排序操作或者往集合里添加一个新的元素。这种情况下，我们常常 会借用` Array.prototype`对象上的方法。比如想往 arguments 中添加一个新的元素，通常会借用 `Array.prototype.push`：

- #### 实现`Funtion.prototype.bind()`


## 通俗的解释闭包

从本质上来说，闭包是一个特殊的对象，他有两部分组成，函数和创建该函数的作用域。从简单来说，闭包就是一个可以访问父函数具备变量的函数。（未完待续）


## setInterval和setTimeout区别
setInterval和setTimeout区别不是很大，只是setInterval是每隔一段时间执行一次代码，而setTimeout是推迟一段时间后去执行（只执行一次），但是如果仔细分析setInterval和setTimeout的内部机理，有很多有意思的地方。

- 1，setInterval和setTimeout除了接受第一个参数为回调函数，第二个时间参数外，还可以接受更多的参数，这些多余的参数会传入第一个回调函数中。

- 2,  setInterval和setTimeout的作用机制都是在当前evenl loop之后再去运行。例如下面的程序：
  ```js
  setTimeout(function () {
      func1();
  }, 0)
  func2();
  ```
  要问到func1和func2哪个先执行，那必然是func2。每一轮Event Loop，`setTimeout`和`setInterval`都是把任务添加到“任务队列”的尾部。因此，它们实际上要等到当前脚本的所有同步任务执行完，然后再等到本次Event Loop的“任务队列”的所有任务执行完，才会开始执行。由于前面的任务到底需要多少时间执行完，是不确定的，所以没有办法保证，**setTimeout和setInterval指定的任务，一定会按照预定时间执行。**

  也就是说，对于一个很长时间的任务，只有在这个任务完成之后才会考虑到我们的`setTimeout`和`setInterval`,那如果这个长时间任务是1秒，我们的`setInterval`要求每隔两秒执行一次，我们的`setInterval`会在3秒之后执行吗？并不是。虽然是等eventloop执行完之后才开始执行，但是他还有一个检查机制。setInterval指定的是“开始执行”之间的间隔，并不考虑每次任务执行本身所消耗的事件。实际上，两次执行之间的间隔会小于指定的时间。比如，setInterval指定每100ms执行一次，每次执行需要5ms，那么第一次执行结束后95毫秒，第二次执行就会开始。如果某次执行耗时特别长，比如需要105毫秒，那么它结束后，下一次执行就会立即开始。为了确保两次执行之间有固定的间隔，可以不用setInterval，而是每次执行结束后，使用setTimeout指定下一次执行的具体时间。上面代码用setTimeout，可以改写如下。
  ```js
  var i = 1;
  var timer = setTimeout(function() {
    alert(i++);
    timer = setTimeout(arguments.callee, 2000);
  }, 2000);
  ```




## 总结一下js里的各种遍历方式


| 遍历方式 | 概念 | 可以遍历的类型 | 不能遍历的类型 | 其他 |
|---| ----- | -------- | ---------- | --- |
|`for()`,`while()`|最常规的循环遍历方式|`Array`,`String`|`Object`,`Map`，`Set`|可以遍历map和set，但是无意义,因为取不到值|
|`for... in...`|以**任意顺序**遍历一个对象的**可枚举属性**。对于每个不同的属性，语句都会被执行。|`Array`,`String`,`Array`,`Object`|`Map`,`Set`|遍历时不是按特定顺序|
|`for...of...`|在**可迭代对象**上创建一个迭代循环，对每个不同属性的属性值,调用一个自定义的有执行语句的迭代挂钩.| `Array`, `Map`, `Set`, `String`, `arguments`|`Object`|

## ajax的核心思想
ajax思想的核心在不重新加载页面的情况下，利用js发送http请求，从而达到与服务器通信的目的。那实现过程是什么呢？是通过师兄XMLHttpRequest对象，通过这个xhr对象，可以发送以及接受各种格式的信息，包括json，xml，html，甚至文本文件，而且还可以选择是异步还是同步实现。那如果让我去写一个js的原生ajax请求，也是一个很简单的事情。

```js
const xhr  = new XMLHttpRequest();
xhr.open('GET', url);
xhr.onreadystatechange = handleRequest;
xhr.send(null);


function handleRequest() {
 try {
   if(xhr.readyState === XMLHttpRequest.DONE) {
     if(xhr.status === 200) {
       const data = xhr.responseText;
       console.log('successfully get the data',data);
     }
     else{
        console.log('There was a problem with the request.');
     }
   }
 }
 catch(err) {
   console.log('the error message is ': err);
 }
}

```
上面只是一个最简单的XMLHttpRequest的使用方式，其实现在xhr标准分为level1和level2，在level2中多了很多新的特性，比如支持发送跨域请求，支持发送和接收二进制，发送和获取数据时，可以获取进度信息等。

## 跨域

## 关于各种类型转换的方法

## 构造函数 成员函数这些都是什么

## iframe的使用场景

- 1：典型系统结构，左侧是功能树，右侧就是一些常见的table或者表单之类的。为了每一个功能，单独分离出来，采用iframe。
- 2：ajax上传文件。
- 3：加载别的网站内容，例如google广告，网站流量分析。
- 4： 在上传图片时，不用flash实现无刷新。
- 5： 跨域访问的时候可以用到iframe，使用iframe请求不同域名下的资源。
