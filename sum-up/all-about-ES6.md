#关于ES6的一切

本篇主要用来介绍ES6的个人觉得比较常用的，但是自己没有完全彻底理解的新特性。

## const是否可以定义数组和对象

ES6给我们带来了新的变量声明方式，let和const，带来了块作用域的概念，我们不能再像使用`var`使用变量提升，或者重复声明，增加了我们代码的可读性。而另一方面，什么时候用const和什么时候用let有时又成了一个新的问题，虽然说const定义的是常量，let定义的是个变量，但是实际情况我们可能被这么几个问题困扰：

- 定义对象和数组应该用`let`还是`const`?
- 定义一些函数的时候用`let`还会`const`?

其实，这两个问题还是要看对象和数组的性质。const 声明创建一个只读的常量。这不意味着常量指向的值不可变，而是变量标识符的值只能赋值一次。从原理上来说，`const`一旦声明，常量的值不能改变。而当我们用`const`定义数组和对象的时候，我们其实赋值的是对象和数组的地址，所以我们只要不让对象和数组地址更改，我们是可以用const定义的。
```js
const foo = {};
foo.prop = 123;
foo.prop // 123
foo = {} // 地址改变，报错

//数组
const a = [];
a.push("Hello"); // 可执行
a.length = 0;    // 可执行
a = ["Dave"];    // 地址改变，报错
```

## for of 循环

`for of`循环前面也提到过，作为一种可以遍历iterate对象的方法，能完美的遍历Array，HTMLNodeList已经Map和Set。非常完美的弥补了`for ...in`遍历的几个坑。
关于`for of`和`for in`的区别， 可以看以下的代码：
```js
let iterable = [3, 5, 7];
iterable.foo = "hello";

for (let i in iterable) {
  console.log(i); // logs 0, 1, 2, "foo", "arrCustom", "objCustom"
}
console.log('=========')
for (let i of iterable) {
  console.log(i); // logs 3, 5, 7
}
```
`for in `的坑总的来说有一下几点：
1. 赋值给 i 的实际上得到的是"0", "1", "2" ，而不是数字
2. for in循环体不仅对数组对象本身循环， 而且会将赋值操作后的属性也进行循环
3. 在某些情况下，数组内的循环可能不会按顺序执行。

## Generate 生成器
什么是generate，先看如下代码：
```js
function* helloWorldGenerator() {
  yield 'hello';
  yield 'world';
  return 'ending';
}

var hw = helloWorldGenerator();
```
Generator 函数有多种理解角度。

首先，Generator函数的调用方法与普通函数一样，也是在函数名后面加上一对圆括号。不同的是，调用Generator函数后，该函数并不执行，返回的也不是函数运行结果，而是一个指向内部状态的指针对象，也就是遍历器对象`(Iterator Object)`

下一步，必须调用遍历器对象的next方法，使得指针移向下一个状态。也就是说，每次调用next方法，内部指针就从函数头部或上一次停下来的地方开始执行，直到遇到下一个yield语句（或return语句）为止。换言之，Generator函数是分段执行的，yield语句是暂停执行的标记，而next方法可以恢复执行。
```js
hw.next()
// { value: 'hello', done: false }

hw.next()
// { value: 'world', done: false }

hw.next()
// { value: 'ending', done: true }

hw.next()
// { value: undefined, done: true }
```

函数的`yield`和`return`有点像，但是不一样的是`yield`有记忆功能，下一次再从该位置向后执行。而且`yield`可以执行多次，而`return`只能返回一次。
#### Generate机制分析
如果仔细分析，为什么`generate`会有这样的神奇功能？因为js是单线程的，他不可能有多线程的概念，所以不会有**挂起**的概念。

我们都知道，函数是在堆栈上执行的，并且采取`后进先出`的原则。对于generate来说也是如此，但不一样的是每次 generator yields, 它会保存堆栈结构，包括局部变量，参数，临时变量，generator内部执行到的位置等，但generator主体被从堆栈中移除。可以说 Generator对象保留了(或者说是拷贝了一份)对该堆栈的引用， 好让后续的 .next() 调用知道如何恢复并执行。

#### Generate作用

##### 1.改写异步操作
Generator函数的暂停执行的效果，意味着可以把异步操作写在yield语句里面，等到调用next方法时再往后执行。
```js
function* loadUI() {
  showLoadingScreen();
  yield loadUIDataAsynchronously();
  hideLoadingScreen();
}
var loader = loadUI();
// 加载UI
loader.next()

// 卸载UI
loader.next()
```
第一次调用loadUI函数时，该函数不会执行，仅返回一个遍历器。下一次对该遍历器调用next方法，则会显示Loading界面，并且异步加载数据。等到数据加载完成，再一次使用next方法，（**怎么知道数据加载完成？**）则会隐藏Loading界面。可以看到，这种写法的好处是所有Loading界面的逻辑，都被封装在一个函数，按部就班非常清晰。




## 拓展运算符...

ES6对函数参数提供了很多非常友好的新特性，使得 Javascript 更富有表达性。这里面首先要提一下我们很有用的拓展运算符。

如果让我们写一个`containsAll`函数来检测传递的第一个字符串是否包含其他子子字符串，例如： `containsAll(“banana”, “b”, “nan”)` 会返回 `true`， 而 `containsAll(“banana”, “c”, “nan”)` 返回 `false`。在以前我们可能这么实现：

```js
fucntion containsAll(str){
  for(let i = 1; i < argument.length; i++) {
    const  needle = arguments[i];
    if(str.indexOf(needle) === -1) return false
  }
  return true
}
```
而在ES6中，像这种情况我们就可以遇到ES6引入的一个新概念，函数扩展运算符:`...`.

扩展运算符的作用是将一个数组转为参数序列，主要用在函数参数中。所以，上面的代码我们就可以这么完成。
```js
function containsAll(str, ...needles) {
  for (var needle of needles) {
    if (str.indexOf(needle) === -1) return false;
  }
  return true;
}
```
如此以来，函数的作用更加明确。当我们执行`containsAll("banana", "b", "nan")`的时候，`str`被`banana`填充，其他参数则被塞到`needles`这个数组里。在函数里我们用`for...of`去遍历即可。



### `...`的其他用法
由于拓展运算符可以展开数组，所以也有了很多实用的功能。
1.  #### 合并数组

扩展运算符提供了数组合并的新写法。
```js
// ES5
[1, 2].concat(more)
// ES6
[1, 2, ...more]

var arr1 = ['a', 'b'];
var arr2 = ['c'];
var arr3 = ['d', 'e'];

// ES5的合并数组
arr1.concat(arr2, arr3);
// [ 'a', 'b', 'c', 'd', 'e' ]

// ES6的合并数组
[...arr1, ...arr2, ...arr3]
// [ 'a', 'b', 'c', 'd', 'e' ]
```

2. #### 替代数组的apply方法
```js
// ES5的写法
Math.max.apply(null, [14, 3, 77])

// ES6的写法
Math.max(...[14, 3, 77])

// 等同于
Math.max(14, 3, 77);
```

3. #### 字符串转为数组
```js
[...'hello']
// [ "h", "e", "l", "l", "o" ]
```

4. #### 实现了Iterator接口的对象

任何Iterator接口的对象，比如`map,set等`都可以用扩展运算符转为真正的数组。
```js
var nodeList = document.querySelectorAll('div');
var array = [...nodeList];
```

## 解构
什么是解构？解构不是一新的数据类型，而是ES6的一种新写法，解构(destructuring)赋值允许利用数组的语法给数组或者对象的属性赋值。以前，为变量赋值，只能直接指定值。而在ES6中，可以从数组或者对象中提取值，按照对应位置给变量赋值。 语法极致简洁，而且较原有属性赋值语法更清晰
也就是说，对于下面的传统赋值方法,我们有了新的表达方式：
```js
//old
let a = 1;
let b = 2;
let c = 3;
//new
let [a, b, c] = [1, 2, 3];

//old
const first = someArray[0];
const second = someArray[1];
const third = someArray[2];
//new
const [first, second, third] = someArray;

```
事实上，只要某种数据结构具有 Iterator 接口，都可以采用数组形式的解构赋值。但是，如果等号的右边不是可遍历的结构。那么将会报错。
```js
// 报错
let [foo] = 1;
let [foo] = false;
let [foo] = NaN;
let [foo] = undefined;
let [foo] = null;
let [foo] = {};
```

除了数组之外，我们还可以给对象解构。

和数组按特定的属性赋值不同，对象的结构是按照属性名来确定的。也就是说，对象的解构赋值的内部机制，是先找到同名属性，然后再赋给对应的变量。真正被赋值的是后者，而不是前者。
```js
let { bar, foo } = { foo: "aaa", bar: "bbb" };
foo // "aaa"
bar // "bbb"

let { baz } = { foo: "aaa", bar: "bbb" };
baz // undefined

let { foo: baz } = { foo: "aaa", bar: "bbb" };
baz // "aaa"
foo // error: foo is not defined
```

如果要将一个已经声明的变量用于解构赋值，必须非常小心。下面代码的写法会报错，因为JavaScript引擎会将{x}理解成一个代码块，从而发生语法错误。只有不将大括号写在行首，避免JavaScript将其解释为代码块，才能解决这个问题。


```js
// 错误的写法
let x;
{x} = {x: 1};
// SyntaxError: syntax error
```

### 解构用途
变量的解构赋值可以给我们带来很多遍历：
#### 1.  从函数返回多个值

函数只能返回一个值，如果要返回多个值，只能将它们放在数组或对象里返回。有了解构赋值，取出这些值就非常方便。
```js
// 返回一个数组

function example() {
  return [1, 2, 3];
}
let [a, b, c] = example();

// 返回一个对象

function example() {
  return {
    foo: 1,
    bar: 2
  };
}
let { foo, bar } = example();

```
#### 2.  提取JSON数据
和函数返回多个值相同，我们也可以用解构来方便的获取JSON结构里的变量
```js
let jsonData = {
  id: 42,
  status: "OK",
  data: [867, 5309]
};
let { id, status, data: number } = jsonData;
```

#### 3.函数参数的默认值
通过用解构结构指定参数的默认值，我们就避免了以前经常使用`||`来表示的方法。
```js
jQuery.ajax = function (url, {
  async = true,
  beforeSend = function () {},
  cache = true,
  complete = function () {},
  crossDomain = false,
  global = true,
  // ... more config
}) {
  // ... do stuff
};
```
#### 4. 输入模块的指定方法
加载模块时，往往需要指定输入哪些方法。解构赋值使得输入语句非常清晰。
```js
const { SourceMapConsumer, SourceNode } = import ("source-map");
```

## 箭头函数

箭头函数恐怕是ES6最帅的功能之一了。有了箭头函数，我们再也不需要担心拼错`funciton`了😂

通过用箭头定义函数，我们可以似代码结构更加清晰明了。但是，箭头函数和一般的函数也并不是完全一样，下面就列出了箭头函数和一般函数的几点重要区别：

#### 1. this永远指向定义时的作用域
在ES6之前，this的神奇用法经常让我们有些措手不及。很重要的一点就是函数或者对象内的`this`指向是不确定的，只有在函数调用的时候才能确定，所以有了很多`call`,`apply`,`bind`等改变函数this指向的方法。而在箭头函数中，我们可以放心的使用this去指向函数或者对象定义时的作用。

this指向的固定化，并不是因为箭头函数内部有绑定this的机制，实际原因是箭头函数**根本没有自己的this**，导致内部的this就是外层代码块的this。正是因为它没有this，所以也就不能用作构造函数。所以，箭头函数转成ES5的代码如下。

```js
// ES6
function foo() {
  setTimeout(() => {
    console.log('id:', this.id);
  }, 100);
}

// ES5
function foo() {
  var _this = this;

  setTimeout(function () {
    console.log('id:', _this.id);
  }, 100);
}
```
所以，在定义对象字面量或者定义原型方法的时候，使用this可能不会达到我们想要的效果。
```js
const calculator = {
    array: [1, 2, 3],
    sum: () => {
        console.log(this === window); // => true
        return this.array.reduce((result, item) => result + item);
    }
};

console.log(this === window); // => true

// Throws "TypeError: Cannot read property 'reduce' of undefined"
calculator.sum();
```
#### 2.不可以使用arguments对象

在箭头函数中，不存在argument对象，如需要获取函数参数，可以利用rest来获取参数列表。

#### 3. 不可以使用yield命令，因此箭头函数不能用作Generator函数。

#### 4. 箭头函数的return
如果箭头函数只有一行，即没有大括号，就可以省略括号。如下：
```js
//one
var filtered = [12, 5, 8, 130, 44].filter(value => value>=10)
// same as
var filtered = [12, 5, 8, 130, 44].filter((value) => {
	return value>=10
})
```

## Class类
`Class`作为ES6引入的一个语法糖，对习惯了接触面向对象语言的开发者来说，无疑是摆脱`prototype`的一大好事。但是，像我这样以前完全没有面向对象语言开发经验的人来说🐶，许多概念都需要重新理解和熟悉。虽然写完后发现确实好用，代码逻辑性更强，不过也经常有调试时摸不着头绪的经历。下面就来梳理一下我在使用`Class`时经常疑惑的问题。

### 1.  `constructor`的本质
首先，我们来看看类的本质。如果我们想检测一下一个类的typeof，我们会得到什么？对，是一个函数。类的数据类型其实就是函数，个类都是指向的他原型里的构造函数。下面代码中的Point1类和Point2函数没有太大的区别：
```js
class Point{
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  add() {
    return this.x + this.y
  }
  // ...
}
function Point2(x, y) {
  this.x = x;
  this.y = y;
}
Point2.prototype = {
  add:{
    return this.x + this.y;
  }
}
typeof Point1 // "function
Point1 === Point1.prototype.constructor // true
let one = new Point();
one.constructor === B.prototype.constructor // true
```
constructor作为类的构造方法，运行在这个类被new的时候，其中的this就代表着实例对象。这一点和以前的用Point构造函数生成实例的方法是差不多一样的。为什么说差不多是因为用Class定义的方法是不可枚举的（non-enumerable），而传统构造函数的方法是可以的。除此之外，类的构造函数，不使用new是没法调用的，会报错。这是它跟普通构造函数的一个主要区别，后者不用new也可以执行。还是刚才的例子：
```js
// 对于class方法
Object.keys(Point.prototype)
// []
Object.getOwnPropertyNames(Point.prototype)
// ["constructor","add"]
// TypeError: Class constructor Foo cannot be invoked without 'new'

//对于传统构造函数的方法
Object.keys(Point2.prototype)
// ["toString"]
Object.getOwnPropertyNames(Point2.prototype)
// ["constructor","toString"]

// 报错
var point = Point(2, 3);
// 正确
var point = new Point(2, 3);
// TypeError: Class constructor Foo cannot be invoked without 'new'

```
所以，constructor是类的默认方法，就算我们忘了写，在代码运行的时候一一个空的constructor方法会被默认添加。

### 2. `class`里`this`的指向
类的方法内部如果含有this，它默认指向类的实例。但是，必须非常小心，一旦单独使用该方法，很可能报错。
```js
class Logger {
  printName(name = 'there') {
    this.print(`Hello ${name}`);
  }

  print(text) {
    console.log(text);
  }
}

const logger = new Logger();
const { printName } = logger;
printName(); // TypeError: Cannot read property 'print' of undefined
```
对于这样的方法，有多种方法去解决，我们可以在构造方法中绑定this，也可以使用箭头函数去解决。事实上，在react中，我们在jsx中如果要绑定事件的时候就会用经常使用bind方法，这就是因为在类中的方法如果单独使用，会出现找不到作用域的情况。
```js
class LikeButton extends React.Component {
  constructor() {
    super();
    this.state = {
      liked: false
    };
  }
  handleClick() {
    this.setState({liked: !this.state.liked});
  }
  render() {
    const text = this.state.liked ? 'liked' : 'haven\'t liked';
    return (
      <div onClick={this.handleClick.bind(this);}>
        You {text} this. Click to toggle.
      </div>
    );
  }
}

ReactDOM.render(
  <LikeButton />,
  document.getElementById('example')
);
```

### 3. `class`的私有函数
私有方法是常见需求，但 ES6 不提供，只能通过变通方法模拟实现。

一种做法是在命名上加以区别。

```js
class Widget {
  // 公有方法
  foo (baz) {
    this._bar(baz);
  }
  // 私有方法
  _bar(baz) {
    return this.snaf = baz;
  }
}
```

上面代码中，`_bar`方法前面的下划线，表示这是一个只限于内部使用的私有方法。但是，这种命名是不保险的，在类的外部，还是可以调用到这个方法.

另一种方法就是索性将私有方法移出模块，因为模块内部的所有方法都是对外可见的。

```js
class Widget {
  foo (baz) {
    bar.call(this, baz);
  }
}

function bar(baz) {
  return this.snaf = baz;
}
```

### 4. `super` 和 `extends`的用法
既然都有了类的概念，那子类就很容易理解了，子类说到底就是一个继承关系，JS是通过原型链来实现继承的，而在我们的语法糖Class中，ES6给我们提供了一种比较简便的接口来实现继承，那就是通过`extend`和`super`
```js
class ColorPoint extends Point {
  constructor(x, y, color) {
    super(x, y); // 调用父类的constructor(x, y)
    this.color = color;
  }

  toString() {
    return this.color + ' ' + super.toString(); // 调用父类的toString()
  }
}
```
通过简单的`extends Point`语句，我们可以很清晰的看到`ColorPoint`作为子类，继承了`Point`的所有方法和属性。那为什么又需要`super()`呢？

`super()`在这里是来表示父类的构造函数，用来新建父类的`this`对象。听着有点生涩，其实说的简单直观点，就是他调用了父类的`constructor()`方法。可以说，子类完全没有`this`对象，他是继承父类的`this`，然后对其进行加工。如果不调用super方法，子类就得不到this对象。这个和ES5的实现有点不同，ES5的继承，实质是先创造子类的实例对象this，然后再将父类的方法添加到this上面（`Parent.apply(this)`）。而ES6这里我们通过`super()`来先创造父类的实例对象`this`（所以`super`方法必须得有），然后再用子类的构造函数修改`this`。

因为创建子类的方法不同，所以ES5和ES6的子类还有一个区别是，在ES5中，子类是不能继承原生数据结构的，比如，不能自己定义一个Array的子类。而ES6允许继承原生构造函数定义子类，因为ES6是先新建父类的实例对象this，然后再用子类的构造函数修饰this，使得父类的所有行为都可以继承。

### 5. 子类的`prototype`属性和`__proto__`属性
子类的_proto_指向父类，从定义上来说，`_proto_`指向的创建这个对象的的constructor的prototype，而因为子类是通过调用父类的`constructor()`来创建的，所以子类的_prototype_就会是父类。

### 6.  Class里的静态方法 `Static`
ES6中引入了用static来定义静态方法的机制，所谓静态方法，就是在不能被类的实例(可以直接被类调用)给调用的方法，只能在类内部使用。需要知道的是，父类的静态方法可以被子类给继承。


父类`Foo`有一个静态方法，子类`Bar`可以调用这个方法。静态方法也是可以从`super`对象上调用，但不能用this调用。

```js
class Foo {
  static classMethod() {
    return 'hello';
  }
  Another() {
    return this.classMethod();
  }
}

class Bar extends Foo {
}

class Car extends Foo {
  static classMethod() {
    return super.classMethod() + ', too';
  }
}

Bar.classMethod(); // 'hello'
```

## Module机制

个人觉得ES6带来的第二大亮点特性，就是重新定义了模块的概念。因为历史上JavaScript 一直没有模块（module）体系，其他语言都有这项功能，比如 Ruby 的require、Python 的import，甚至就连 CSS 都有@import。为了解决这个困境，社区出现了CommJS和AMD规范，前者用于服务器，后者用于浏览器。而ES6在语法层面上实现了模块功能，而且非常简单易懂。

ES6的模块化思想是从静态出发，即让模块变得可以提前编译优化。而CommJS和AMD模块都是运行时候才能确定，并且当你写下
```js
// CommonJS模块
let { stat, exists, readFile } = require('fs');
```

他实质上就是加载了fs所有的方法，生成一个对象（`_fs`），然后再从这个对象上面读取3个方法。这种加载称为“运行时加载”.
而ES6的模块加载方式有些不同：
```js
// ES6模块
import { stat, exists, readFile } from 'fs';
```
上面代码的实质是从fs模块加载3个方法，其他方法不加载。这让ES6可以在编译时就完成模块加载，效率要比CommonJS模块的加载方式高。当然，这也导致了没法引用 ES6 模块本身，因为它不是对象。

下面让我们分别看看实现这种加载方式的两个重要关键字。

### export 命令

我们要了解的是，一个模块就是一个独立的文件，文件内部的所有变量，外部无法获取。如果你希望外部能够读取模块内部的某个变量，就必须使用export关键字输出该变量。下面是一个 JS 文件，里面使用export命令输出变量。输出的变量类型可以是变量，可以是函数，可以是对象，输出方法也有多种，可以在每个变量单独输出，也可以整体输出。一般把export统一写在文件底部，整体进行输出。
```js
// profile.js
var firstName = 'Michael';
var lastName = 'Jackson';
var year = 1958;
export {firstName, lastName, year};
```
除此之外，我们可以用as改变输出模块的名字。
```js
//用as改变输出名
function v1() { ... }
function v2() { ... }

export {
  v1 as streamV1,
  v2 as streamV2,
  v2 as streamLatestVersion
};
```

### import命令
使用export命令定义了模块的对外接口以后，其他 JS 文件就可以通过import命令加载这个模块。一般来说，import有这些特性：

- 如果想为输入的变量重新取一个名字，import命令要使用as关键字，将输入的变量重命名。
- import后面的from指定模块文件的位置，可以是相对路径，也可以是绝对路径，`.js`路径可以省略。
- 由于import是静态执行，所以不能使用表达式和变量，这些只有在运行时才能得到结果的语法结构。
- import会有变量提升，所以写在其他地方也是可行的（但不推荐）
- 如果多次重复执行同一句import语句，那么只会执行一次，而不会执行多次。

```js
import { lastName as surname } from './profile';
import {myMethod} from 'util';

// 报错
if (x === 1) {
  import { foo } from 'module1';
} else {
  import { foo } from 'module2';
}
```

### export default输出
因为export的接口变必须和import的接口一致，而多数开发者不会去先读module里的export再写程序，所以一般会设置一个export的默认值来方法输入。
``` js
// export-default.js
export default function () {
  console.log('foo');
}

// import-default.js
import customName from './export-default';
customName(); // 'foo'
```
面代码的import命令，可以用任意名称指向export-default.js输出的方法，这时就不需要知道原模块输出的函数名。需要注意的是，这时import命令后面，不使用大括号。如果使用大括号，就是对具体针对某个变量进行的输出，意义完全不同，可以比较一下。
```js
/ 第一组
export default function crc32() {}
import crc32 from 'crc32';

// 第二组
export function crc32() {};
import {crc32} from 'crc32'; // 输入
```
有了export default命令，输入模块时就非常直观了，以输入 lodash 模块为例。如果想在一条import语句中，同时输入默认方法和其他变量，可以写成下面这样
```js
import _, { each } from 'lodash';

//对应的export
export default function (obj) {
  // ···
}

export function each(obj, iterator, context) {
  // ···
}

export { each as forEach };
```

上面的比较神奇一点我在`import loadsh`后，each和forEach会指向同一个方法，也许这就是loadsh兼容大部分unders的方法的原因。

## ES7 await/async

即将来临

## Symbol

Symbol是ES6提出的一种新的基本数据类型，是为了解决让一个对象的属性或者方法名能够独一无二，从根本上防止属性名冲突。

Symbol的用法很简单，只需要通过`Symbol`函数生成即可。需要注意的是，无论是否传入参数，或者传入相同的参数，因为每一个Symbol的值都是不相等的。
```js
// 没有参数的情况
var s1 = Symbol();
var s2 = Symbol();

s1 === s2 // false

// 有参数的情况
var s1 = Symbol('foo');
var s2 = Symbol('foo');

s1 === s2 // false
```
然而，如果我们希望使用同一个Symbol值，我们可以用`Symbol.for`方法来做到这一点，它接受一个字符串作为参数，然后搜索有没有以该参数作为名称的Symbol值。如果有，就返回这个Symbol值，否则就新建并返回一个以该字符串为名称的Symbol值。
```js
var s1 = Symbol.for('foo');
var s2 = Symbol.for('foo');

s1 === s2 // true
```
### Symbol的使用场景
