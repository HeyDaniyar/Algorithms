#关于DOM操作
从接触前端开始，就对dom操作并不是十分熟悉，而且上次在线笔试时候也考到关于dom操作的问题，故借此机会将自己不熟悉的dom操作进行一次总结。


## DOM定义
首先，让我们明确一下DOM的定义。DOM的学名是文档对象模型，它是HTML和XML文档的编程接口，给这两个文档提供了一个结构化的表述并且通过定义一系列API使程序可以对结构树进行访问，以改变文档的结构，样式和内容。

也就是说，DOM是为了让文档与脚本script语言连接起来的一个接口。


## 关于选择器

要操作dom元素，我们首先得知道如何选择dom元素。js的原生dom选择方法比较简单，一般只包括以下几个方法：

- getElementById()

- getElementsByTagName()

- getElementsByName()

- querySelector()

- querySelectorAll()

- getElementsByClassName()

- element.childNodes

- element.parentNode

- element.nextSibling

- element.previousSibling

- element.firstChild

- element.lastChild
## 关于创建元素

- createElement()

- createTextNode()

- innerHTML()

## 关于元素插入

- appendChild()



#### 如何访问？

访问的DOM的方法很简单，只需要通过document或者window元素的API来进行操作即可。
下面是在web和XML页面脚本中使用DOM时，一些常用的API简要列表。
- #### document.getElementById(id)
- #### document.getElementsByTagName(name)
- #### document.getElementsByClassName(names);
`getElementById`返回唯一的element元素，id区分大小写,后两者返回一个包括所有给符合条件的的元素的HTML集合HTMLCollection（webkict内核返回NodeList）；

- #### document.createElement(tagName[, options]);`
- #### document.createTextNode(data);
前者是创建一个element对象，后者是创建一个新的文本节点

- #### parentNode.appendChild(node)
- #### element.innerHTML(data)
第一个方法是将一个节点添加到指定父节点的子节点列表末尾，第二个方法是直接重写进去一个html元素。一个是插入，一个是覆盖。从性能上说，innerHTML效率要高一些，因为直接解析字符串比创建html节点对象再生成html节点要快。但是innderHTML并不是标准的dom函数，所以并不推荐。

- #### element.style.left
修改element的css属性信息。

- #### element.setAttribute(name, value);
- #### element.getAttribute(name)
修改或者获取元素的属性信息。尽管我们也可以用这个方法来添加一个style属性，但是还是强烈推荐用style的方式。
- #### element.addEventListener(event-name, callback, use-capture);
表示在 element 这个对象上面添加一个事件监听器，当监听到有 <event-name> 事件发生的时候，调用 <callback> 这个回调函数。至于 <use-capture> 这个参数，表示该事件监听是在“捕获”阶段中监听（设置为 true）还是在“冒泡”阶段中监听（设置为 false）。
- #### element.onclick= function(e){}
用这个方法也可以很简单的给某个元素添加事件监听。但是和前面的方法相比，如果要在后面代码中element继续绑定其他回调函数，很容易覆盖这个旧的回调函数。

-  #### GlobalEventHandlers.onload
onload属性是一个事件处理程序用于一个Window, XMLHttpRequest, <img> 等元素的加载事件，当资源加载时触发。

- #### window.scrollTo(x-coord, y-coord)
滚动到document的某一个位置点


## 排序成绩
上次在线笔试的时候考察到需要实现单击一个table成绩表可以进行增序和逆序的功能。虽然题目中表明可以使用jquery，但是我们完全可以用原生来实现。下面我们就写出用上述的一些DOM方法完成的这个功能：

```html
<table>
  <tr><th>名称</th><th>成绩</th></tr>
  <tr><td>Avici<td><td>99</td></tr>
  <tr><td>Armin<td><td>91</td></tr>
  <tr><td>Matin<td><td>89</td></tr>
  <tr><td>David<td><td>9</td></tr>
</table>
```

```js
const tableHead = document.getElementsByTagName('tr')[0];
const button = tableHead.lastChild;
button.addEventListener('click', sortScore, false);


function sortScore() {
	// 0 means use ascending sort, 1 means sort descending
	let sortWay = parseInt(tableHead.getAttribute('sortWay'))||0;
  const allRows = document.getElementsByTagName('tr');
  let scoreList = [];
  //获取所有的成绩列表
  for (let i = 1; i < allRows.length; ++i) {
    scoreList.push(parseInt(allRows[i].lastChild.innerHTML))
  }
  //排序成绩
  scoreList.sort(function(a, b) {
    if (sortWay) return a > b
    else return a < b
  });
  //将成绩重新写入dom
  for (let i = 0; i < scoreList.length; i++) {
    allRows[i+1].lastChild.innerHTML = scoreList[i];
  }
  sortWay = sortWay ? 0: 1;
  tableHead.setAttribute('sortWay', sortWay);
}
```


遍历DOM节点，并记录深度和节点数量
```js
//使用stack的方法来遍历整个dom节点树，并把需要输出的结果记录在result中
const traverse = (ndRoot) => {
  const result = {
    totalElementsCount: 0,
    maxDOMTreeDepth: 0,
    maxChildrenCount: 0
  };
  const stack = [{
    current: ndRoot,
    deep: 1
  }];
  while (stack.length) {
    result.totalElementsCount++;
    const node = stack.shift();
    // 记录当前节点的子节点数量
    const childLength = node.current.children.length;
    const curDeep = node.deep;
    // 如果当前节点没有子节点，跳过
    if (!childLength) {
      continue;
    }
    result.maxChildrenCount = Math.max(childLength, result.maxChildrenCount);
    result.maxDOMTreeDepth = Math.max(curDeep, result.maxDOMTreeDepth);
    //遍历当前节点的子元素，并加入到stack中
    Array.from(node.current.children).forEach(x => {
      stack.push({
        current: x,
        deep: node.deep + 1
      });
    });
  };
  return result;
};

console.log(traverse(document.body));
```

## 如何动态插入大量元素？

动态插入节点，这似乎对于js来说是一个很简单的问题。但是，当我们把条件限定为`大量`元素的时候，我们就要更加小心了。

还是简简单单的写一个for循环，一直循环插入元素吗？答案肯定不是。首先，让我们来介绍几个关于html的比较小众的一些特性，在了解完这些后我们可能就会轻松找到解决办法。

### requestAnimationFrame

在研究requestAnimationFrame之前，我们先来想想一个需求。如果需要写个函数，按照屏幕刷新率去重绘一个页面或动画，你应该怎么实现呢？

在浏览器动画程序中，我们通常使用一个定时器来循环每隔几毫秒移动目标物体一次，来让它动起来。熟悉setInterval和屏幕刷新率的你可能马上就可以得出答案：
```js
/**
 * 1s = 1000ms (remember that setInterval and setTimeout run on milliseconds)
 * 1000ms / 60(fps) = 16.7ms (we'll round this to 17)
 */

// Lights, camera…function!
setInterval(function() {
    drawAnything();
}, 17);
```

是的,这个代码看起来简洁明了，然而如果结合现实去分析一下，我们就会发现这种写法其实处处都是性能危机。

首先，setInterval会一直不停的去重画这个页面，即使你已经换到了其他了标签页，或者你已经把页面拖到了底部，这让你的CPU基本上无时不刻都在工作，对于移动端来说这就是意味着耗电！

如果你还有一个地方需要绘制，事情会变得更加复杂。

为了解决重绘的性能问题，window就有了一个叫`requestAnimationFrame()`的函数，去优化你的动画操作。上一个需求就可以使用`requestAnimationFrame`来完成：
```js
function draw() {
    requestAnimationFrame(draw);
    // Drawing code goes here
}
draw();
```

使用了requestAnimationFrame之后，我们就可以不再考虑设备的刷新率，因为它会自动计算设备的刷新率，并且在需要停止的时候会自动停止，比如已经不在当前页面的。这就避免了出现用
setInterval可能出现的性能耗费。

### DocumentFragment

一般情况下，我们会在操作DOM时候会用类似node.appendChild()这中方式来完成。但是这个方法是无缓冲的，也就是说我们每次调用appendChild方法的时候，浏览器都会重新渲染页面。

而对于大量接口，我们一般使用DocumentFragment，它可以提供一个缓冲的机制，将DOM节点先放到内存中，当节点都构造完成后，再将DocumentFragment对象添加到页面中，这时所有的节点都会一次渲染出来，这样就能减少浏览器很多的负担，明显的提高页面渲染速度。


了解了这两个特性，那我们就可以利用他们来完成动态插入大量元素的需求，现在假如需要在页面中插入三万个li节点，我们的函数实现就可以这么完成：

```js
const ndContainer = document.getElementById('js-list');
const total = 30000;
const batchSize = 4; // 每批插入的节点次数，越大越卡
const batchCount = total / batchSize; // 需要批量处理多少次
let batchDone = 0;  // 已经完成的批处理个数

function appendItems() {
   const fragment = document.createDocumentFragment();
   for (let i = 0; i < batchSize; i++) {
       const ndItem = document.createElement('li');
       ndItem.innerText = (batchDone * batchSize) + i + 1;
       fragment.appendChild(ndItem);
   }
   // 每次批处理只修改 1 次 DOM
   ndContainer.appendChild(fragment);
   batchDone += 1;
   doBatchAppend();
}

function doBatchAppend() {
   if (batchDone < batchCount) {
       window.requestAnimationFrame(appendItems);
   }
}

doBatchAppend();
```


参考：
- [破解前端面试（80% 应聘者不及格系列）：从 DOM 说起](https://zhuanlan.zhihu.com/p/26420034)
