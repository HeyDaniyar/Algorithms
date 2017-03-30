#关于DOM操作
从接触前端开始，就对dom操作并不是十分熟悉，而且上次在线笔试时候也考到关于dom操作的问题，故借此机会将自己不熟悉的dom操作进行一次总结。


## DOM定义
首先，让我们明确一下DOM的定义。DOM的学名是文档对象模型，它是HTML和XML文档的编程接口，给这两个文档提供了一个结构化的表述并且通过定义一系列API使程序可以对结构树进行访问，以改变文档的结构，样式和内容。

也就是说，DOM是为了让文档与脚本script语言连接起来的一个接口。

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
