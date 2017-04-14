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
## `_proto_`和`prototye`的关系

首先，我们得了解这两个东西是什么。
- `prototye`:中文名是**显示原型**，每一个函数在创建之后都会拥有一个名为prototype的属性，这个属性指向函数的原型对象

  Note:通过Function.prototype.bind方法构造出来的函数是个例外，它没有prototype属性;

- `_proto_`:中文名是**隐式原型**，JavaScript中任意对象都有一个内置属性``[[prototype]]``，在ES5之前没有标准的方法访问这个内置属性，但是大多数浏览器都支持通过__proto__来访问。ES5中有了对于这个内置属性标准的Get方法`Object.getPrototypeOf()`

  Note:(`Object.prototype` 这个对象是个例外，它的__proto__值为null);

- 两者的关系： ****`_proto_`指向创建这个对象的函数(constructor)的prototype****

- 两者的作用：

  - 显式原型的作用：用来实现基于原型的继承与属性的共享。
  - 隐式原型的作用：构成原型链，同样用于实现基于原型的继承。举个例子，当我们访问obj这个对象中的x属性时，如果在obj中找不到，那么就会沿着__proto__依次查找。

如果仔细研究完上述的概念，那`_proto_`和`prototype`的概念可以说就很清楚了，我们需要抓住一些关键点，首先`prototype`是只有函数对象(构造函数)才有的属性，`_proto_`属性是除了null以外的对象都具备的一个属性。所以如果我们想简单的改变一个对象的原型，用以下的解法是不行的：
```js
var o = {
  a:1,
  add: function() {console.log('I am from o')}
}
var c  = {};
c.prototype = o;
c.add(); // c.add is not a function
```
正确的方法应该是用构造函数或者`Object.create()`来实现

```js
//构造函数
function o{
  this.a = 1;
}
o.prototype = {
  add: function() {console.log('I am from o')}
};

var c = new o();
c.add();// 'I am from o'

//Object.create()方法
var o = {
  a:1,
  add: function() {console.log('I am from o')}
}
var c  = Object.create(o);
c.add();// 'I am from o'
```

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

引用一句道格拉斯大叔的话：
>闭包是指在JavaScript中，内部函数总是可以访问其所在的外部函数中声明的参数和变量，即使在其外部函数被返回（寿命终结）了之后。

引用一下JavaScript花园的解释：
>闭包是 JavaScript 一个非常重要的特性，这意味着当前作用域总是能够访问外部作用域中的变量。 因为 函数 是 JavaScript 中唯一拥有自身作用域的结构，因此闭包的创建依赖于函数。

okay，如果说通过这两个你可以看出来闭包的作用是为了数据的私有性，那么问题来了：

- 闭包的应用场景？
- 闭包和ES6中其他使用数据私有的方式（Class，Symbol）比较？
- 闭包中的数据/私有化的数据的内存什么时候释放？


让我们依次来回答一下这些问题：

- 闭包的应用场景？
1. 因为js没有私有成员的概念，我们可以利用闭包来模拟私有成员，实现对私有成员的保护，从而达到约束和规范代码的作用。
2. 在函数柯里化中使用。
3. 在js中使用单例模式的时候使用闭包,如下：
```js
var singleton = function( fn ){
    var result;  
    return function(){
        return result || ( result = fn .apply( this, arguments ) );
    }
}

var createMask = singleton(
    function(){
        return document.body.appendChild( document.createElement('div') );
    }
)
```
4. 使用闭包来绑定this变量（已经不再流行）

## `setInterval`和`setTimeout`区别
`setInterval`和`setTimeout`区别不是很大，只是`setInterval`是每隔一段时间执行一次代码，而`setTimeout`是推迟一段时间后去执行（只执行一次），但是如果仔细分析`setInterval`和`setTimeout`的内部机理，有很多有意思的地方。

- 1，`setInterval`和`setTimeout`除了接受第一个参数为回调函数，第二个时间参数外，还可以接受更多的参数，这些多余的参数会传入第一个回调函数中。

- 2,  `setInterval`和`setTimeout`的作用机制都是在当前`evenl loop`之后再去运行。例如下面的程序：
  ```js
  setTimeout(function () {
      func1();
  }, 0)
  func2();
  ```
  要问到func1和func2哪个先执行，那必然是func2。每一轮Event Loop，``setTimeout``和``setInterval``都是把任务添加到“任务队列”的尾部。因此，它们实际上要等到当前脚本的所有同步任务执行完，然后再等到本次Event Loop的“任务队列”的所有任务执行完，才会开始执行。由于前面的任务到底需要多少时间执行完，是不确定的，所以没有办法保证，**`setTimeout`和`setInterval`指定的任务，一定会按照预定时间执行。**

  也就是说，对于一个很长时间的任务，只有在这个任务完成之后才会考虑到我们的``setTimeout``和``setInterval``,那如果这个长时间任务是1秒，我们的``setInterval``要求每隔两秒执行一次，我们的``setInterval``会在3秒之后执行吗？并不是。虽然是等eventloop执行完之后才开始执行，但是他还有一个检查机制。`setInterval`指定的是“开始执行”之间的间隔，并不考虑每次任务执行本身所消耗的事件。实际上，两次执行之间的间隔会小于指定的时间。比如，`setInterval`指定每100ms执行一次，每次执行需要5ms，那么第一次执行结束后95毫秒，第二次执行就会开始。如果某次执行耗时特别长，比如需要105毫秒，那么它结束后，下一次执行就会立即开始。为了确保两次执行之间有固定的间隔，可以不用`setInterval`，而是每次执行结束后，使用`setTimeout`指定下一次执行的具体时间。上面代码用`setTimeout`，可以改写如下。
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


## getter和setter到底是什么

首先来说说从ES5中新引入的get和set，这两个属性都是见过但是没有研究过的属性。如果我们在控制台实际演练一遍，我们就很清楚get和set的作用：
```js
var o = {
       a : 7,
       get b(){return this.a +1;},//通过 get,set的 b,c方法间接性修改 a 属性
       set c(x){this.a = x/2}
   };
   console.log(o.a);   // 7
   console.log(o.b);  //  8
   o.c  = 50;  
   console.log(o.a); //  25
```
- getter
使用get关键字为属性添加一个函数，函数名即为属性名，当对象访问此属性时，将自动调用定义的函数，并返回相应的值，相当于隐式的创建了一个访问此属性的函数。Getter的函数不传参数，在一个对象里不能对一个属性定义多个getter，此外，真实的属性不能与getter共存。

- setter
同getter一样，在对象设置属性值时，自动调用由set关键字定义的函数。函数需要传入一个value，value即为设置对象属性的值。

也就是说，结合getter与setter，可以给对象添加一个伪属性，这个属性是可以通过动态计算得来的，访问属性即调用了方法进行动态计算，免去了许多不必要的定义的各种访问函数。

## JS值传递还是引用传递最好的解释

这个问题是是测试是否掌握JS基础的很经典的一道题目。大家都会说，js在传递对象的时候是引用传递，在传递值类型数据的时候是引用传递。其实这种说法本身是不正确的，比如
```js
function changeStuff(a, b, c)
{
  a = a * 10;
  b.item = "changed";
  c = {item: "changed"};
}

var num = 10;
var obj1 = {item: "unchanged"};
var obj2 = {item: "unchanged"};

changeStuff(num, obj1, obj2);

console.log(num); //10
console.log(obj1.item); //changed   
console.log(obj2.item); //unchanged
```
前两个输出都能理解，那到了第三个输出的时候是不是就会有点犹豫不决呢？如果对象是按引用传递，那改变对象本身是否会改变原对象的值？事实是JS既不是值传递，也不是引用传递，而是共享传递（call by sharing）

该策略的重点是：调用函数传参时，函数接受对象实参引用的副本。它和按引用传递的不同在于：在共享传递中对函数形参的赋值，不会影响实参的值。即修改传递的对象本身(形参)是不会影响到原来的对象(实参)的。

所以，对于对象类型，由于对象是可变(mutable)的，修改对象属性会影响到共享这个对象的引用和引用副本。而对于基本类型，由于它们都是不可变的(immutable)，按共享传递与按值传递(call by value)没有任何区别，所以说JS基本类型既符合按值传递，也符合按共享传递。

如果再想深入练习，可以通过`如何编写一个对象的拷贝函数`来掌握。

虽然实现深复制的办法有很多种，最简单的：
```js
var cloneObj = JSON.parse(JSON.stringify(obj));
```
其实这只是一个投机取巧的办法，因为JS的对象的深度拷贝不是那么容易实现的。往往我们说对一个对象的深度拷贝时，我们的语义就不清。因为JS中万物皆对象，会有很多edge case，比如对象里有Regexp怎么办，对象里有函数怎么办，对象原型链怎么办，对象里有闭包怎么去复制，再比如对象里有`setInterval`函数那你怎么办？因为js的的弱类型，所以不应该去简单的考虑对象的深度拷贝，在实现对象拷贝之前，我们需要选择好范围。如果只是一个实现简单的关于数组和对象的拷贝，那完全可以用递归的方法去解决就行。
```js
var cloneObj = function(obj){
    var str, newobj = obj.constructor === Array ? [] : {};
    if(typeof obj !== 'object'){
        return;
    } else {
        for(var i in obj){
            newobj[i] = typeof obj[i] === 'object' ?
            cloneObj(obj[i]) : obj[i];
        }
    }
    return newobj;
};



```

## null和undefined的区别

`null == undefined`的结果是`true`也许是检验是否知道两者区别的开始。除去一些历史原因外，`null`和`undefined`基本是同义的，两者现在的一些区别如下：
- `null`表示“没有对象”，即该处不应该有值。典型用法是
  1.  作为函数的参数，表示该函数的参数不是对象
  2.  作为对象原型链的终点
- `undfined`表示”缺少值“，就是此处应该有一个值，但是还没有定义
  1.  变量被声明了，但没有赋值时，就等于`undefined`
  2.  调用函数时，应该提供的参数没有提供，该参数等于`undefined`。
  3.  对象没有赋值的属性，该属性的值为`undefined`。
  4.  函数没有返回值时，默认返回`undefined`。

```js
var i;
i // undefined

function f(x){console.log(x)}
f() // undefined

var  o = new Object();
o.p // undefined

var x = f();
x // undefined
```


## 关于js文件的加载顺序？
首先，需要了解的是`<script>`标签引入脚本的几种情况：

- 立即执行
> <script src = "a.js">
> <script src = "b.js">

顺序：保证先后顺序。解析：HTML 解析器遇到它们时，将阻塞（取停止解析），待脚本下载完成并执行后，继续解析标签之后的文档。这种就是我们最常见的一种方式，有时候我们也会把这样的执行放在body之下，这样就可以等页面加载完成后再去解析文档。

- 推迟执行
> <script defer src="a.js">
> <script defer src="b.js">

顺序：保证先后顺序。解析：HTML解析器遇到他们时，不阻塞（脚本将被异步下载），待文档解析完成后，执行脚本。

- 尽快执行
> <script async src="a.js">
> <script async src="b.js">

顺序：不保证先后顺序。解析：HTML 解析器遇到它们时，不阻塞（脚本将被异步下载，一旦下载完成，立即执行它），并继续解析之后的文档。

有一张图可以帮助理解：
[script解析顺序](https://pic4.zhimg.com/284aec5bb7f16b3ef4e7482110c5ddbb_b.jpg)



## 对前端模块化的理解？
> 推荐去直接浏览黄玄的`JavaScript模块化七日谈`

在说到前端模块化之前，让我们想一想为什么前端需要模块化。在以前的js代码中，我们可能是这么写的；
```js
function foo(){
    //...
}
function bar(){
    //...
}
```
因为这样很容易造成变量名冲突，我们又改成了这样：
```js
var MYAPP = {
    foo: function(){},
    bar: function(){}
}

MYAPP.foo();
```
可是，这样还是不安全，因为你无法定义私有变量，所以我们又了IIFE模式：

```js
var Module = (function(){
    var _private = "safe now";
    var foo = function(){
        console.log(_private)
    }

    return {
        foo: foo
    }
})()
Module.foo();
Module._private; // undefined
```
这种写法，就是现代依赖的基石。
然而上面的只是执行段，在加载端，我们的代码很有可能是一堆的script标签，而且必须要考虑顺序，不仅难以维护，而且依赖模糊，最重要的是请求过多。
直到有一天，CommonJS诞生，我们可以轻松的进行依赖引用：

```js
// math.js
exports.add = function(a, b){
    return a + b;
}
// main.js
var math = require('math')      // ./math in node
console.log(math.add(1, 2));    // 3
```

所以以CommonJS为主的Node让我们在服务器端也可以用js来加载各种模块，然而问题是，CommonJS的require是同步的，这在本地环境或者服务器上没有问题，但是浏览器环境，那就是各种阻塞！

所以我们又有了以RequireJS为代表的AMD规范，以SeaJS为主的CMD规范。AMD和CommJS还有CMD的书写风格和执行时间如下：
```js
// Module/1.0
var a = require("./a");  // 依赖就近， 执行到此时，a.js 同步下载并执行
a.doSomething();

var b = require("./b")
b.doSomething();

// AMD recommended style
define(["a", "b"], function(a, b){ // 依赖前置
    a.doSomething();
    b.doSomething();
})

// AMD with CommonJS sugar
define(["require"], function(require){
    // 在这里， a.js 已经下载并且执行好了
    var a = require("./a")
})

// CMD recommanded
define(function(require, exports, module){
    var a = require("a");
    a.doSomething();
    var b = require("b");
    b.doSomething();    // 依赖就近，延迟执行
})
```

其实seajs/requirejs作为在线“编译”模块的方案，相当于在页面即浏览器端加载一个CMD/AMD解释器。这样浏览器就认识了define，exports，module这些东西。

不久之后，另一类模块化方案横空出世，即预编译模块化方案，就是把所有的js组件bundling up，编译成一个`bundle.js`文件，最先出现的是`browserify`,通过`auto-recompile`,加入`source map`这些特性使模块化变得更加方便
```shell
$ npm install -g browserify
# magic just happened!
$ browserify main.js -o bundle.js
# install watch
$ npm install -g watchify
$ watchify app.js -o bundle.js -v
# debug mode
$ browserify main.js -o bundle.js --debug
```

但是新问题又来了，因为现在app的功能正在越来越丰富，browserify很有可能打包出来一个庞大的`bundle.js`文件，真是的app里，`bundle`文件可能有10M到15M，这样很有可能使应用一直处于加载中状态。这时候`webpack`就横空出世了，它采用了许多新的特性：
  - Strong Compatibility： 对CommonJS, AMD, ES6都有着完美支持
  - Loaders & Plugins：使用各种功能强大的Loader和来加载所有静态文件
  - Code Spliting：分割代码成许多chunk从而实现异步按需加载
  - Development Tools： 用DevServer来实现热加载，alias等

最后的最后，就是我们的王者归来，ES6的`import`。通过语言层面上的规定，js可以说真正实现了模块化机制。关于import的更多机制，可以参考我的[all-about-ES6](,/all-about-ES6.md)


[关于js模块化方案](http://upload-images.jianshu.io/upload_images/4971047-7f34b4f50e232341.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



## 关于网站性能优化

>网站性能优化是一个工程问题。

在网站性能优化方面，我们一般可以分为服务器端的优化和页面优化。下面首先先说一下页面优化。

我认为任何抛开了性能瓶颈去谈优化都是不现实的，我们首先需要了解的是一个网页的生成过程。通常来说，网页的生成过程，大致可以发为五步：
1. HTML代码转化成DOM
2. CSS代码转化成CSSOM（CSS Object Model）
3. 结合DOM和CSSOM，生成一棵渲染树（包含每个节点的视觉信息）
4. 生成布局（layout），即将所有渲染树的所有节点进行平面合成
5. 将布局绘制（paint）在屏幕上

这五步中，前三步都比较快，主要是后两步，我们合并成为渲染。网页生成的时候，至少会渲染一次。用户访问的过程中，还会不断重新渲染。但是如果我们进行`修改DOM`，`修改样式表`，或者添加`用户时间`，就会触发重新生成布局和重新绘制。我们可以用chrome的Timeline面板来很全面的分析各个阶段的耗时，包括loading，scripting，rendering，和painting
[TimeLine面板](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015091515.png)

通过这个还有chromeDeVTool的Profile我们就可以试着去寻找到底应该优化的是什么方向。

根据一般经验，我们可以把优化方向聚在这几个范围：

#### 减少loading阶段的耗时

loading阶段的耗时估计是一些不成熟的网站最容易优化的点，我们可以从多个方面入手：

- 请求数量和带宽

在这个阶段我们可以充分利用webpack/browserify等打包工具,将js打包成一个bundle的js文件，从而达到合并压缩文件的特性。除此之外，我们还可以开启GZIp，移除重复脚本，图像优化等方面竟尽可能的减少请求贷款、

- 利用缓存

另外一个优化loading的手段估计就是充分利用缓存。可以使用各种cdn来加载一些必要组件，比如使用font-awesome来加载常用的icon，达到减少dns查找的目的。

- 使用HTTP2
还不太了解，不多说

- 按需加载

这一点也可以有webpack等打包工作做到。除此之外还能用一些滚屏加载，通过media query来加载不同css等各种方式。


#### 关于脚本执行和渲染的优化

优化脚本执行的过程就是严格提高我们的代码质量，如果使用框架尽量遵循每个框架的最佳实践等。通常来看，我们可以避免这些不必要的点：

- 避免图片和ifram等的空src
- 在使用 DOM 操作库时用上 array-ids （如angular使用trackby，减少重绘制）
- 给图片加上正确的宽高值避免重设图片大小
- 避免css表达式，移除空的css规则
- 正确使用display的属性
  1.display: inline 后不应该再使用 width、height、margin、padding 以及 float
  2.display: inline-block 后不应该再使用 float
  3.display: block 后不应该再使用 vertical-align
  4.display: table-* 后不应该再使用 margin 或者 float
- 不滥用float
- 不声明过多的font-size
- 值为0时候不需要任何单位
- 尽量使用CSS3动画




## 参考链接：
- [移动 H5（PC Web）前端性能优化指南](https://zhuanlan.zhihu.com/p/25176904)
- [JavaScript 模块化七日谈](https://huangxuan.me/js-module-7day/)
- [Webpack,broserify和gulp三者之间到底是怎样的关系](https://www.zhihu.com/question/37020798/answer/71621266)
- [js中__proto__和prototype的区别和关系？](https://www.zhihu.com/question/34183746)
- [JavaScript里的Getter与Setter](http://www.jianshu.com/p/dd83cb399b81)
- [undefined和null区别-阮一峰](http://www.ruanyifeng.com/blog/2014/03/undefined-vs-null.html)
