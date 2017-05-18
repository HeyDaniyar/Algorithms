
## 关于css盒模型的理解
css盒模型必定为最重要的css概念之一。css盒模型的示意图如下：
![盒模型示意图](https://leohxj.gitbooks.io/front-end-database/html-and-css-basic/assets/box-model.svg)

首先需要了解的是css3新增了盒模型的计算方式，`box-sizing`，默认值是`content-box`，另外还有`border-box`和`padding-box`。
### Content box
- `Width = width + padding-left + padding-right + border-left + border-right`
- `Height = height + padding-top + padding-bottom + border-top + border-bottom`

布局所占的高度`Height`和宽度`Width`即包括`padding`和`border`的值

### border-box
- `Width =  width(包含padding-left + padding-right + border-left + border-right)`
- `Height =  height(包含padding-top + padding-bottom + border-top + border-bottom)`


 布局所占的高度就是元素自身的高度和宽度，因为自身的高度和宽度就包括了上述三值。


## 关于margin的了解
margin是在传统css定位中我们经常会用的到的一个属性，虽然从字面上看margin就是指元素的外边距，但如果我们深入观察，其实能看到许多margin的奇异特性。下面分别从以下几个问题来剖析一下margin。如果对这些问题不熟悉，建议去观看慕课网张鑫旭的[CSS深入理解之margin](http://www.imooc.com/learn/680),基本上都可以找到答案。

#### 关于margin定位
- ##### 什么是元素的可视尺寸和占据尺寸？
- ##### 如何用margin来改变元素的大小？
- ##### 修改的元素各自都有什么限制条件？
#### 关于margin的百分比
- ##### 普通元素的margin百分比根据什么定位？
- ##### 绝对定位元素的margin百分比又是相对什么定位？

#### 关于margin重叠
- ##### 发生margin重叠的元素属性条件？

  元素必须是block水平元素，且不包括float和absolute元素;
  不考虑writing-mode的话，只发生在垂直方向

-  ##### margin重叠和writing-mode有什么关系？
-  #####  margin重叠的三种情况？每种情况的条件限制？

    相邻的兄弟元素；bock元素

    父级的第一个/最后一个子元素：父元素没有设置overflow；border或者padding，margin-bottom还需要考虑是否设置height

    空的block元素：元素没有border，padding设置；里面没有inline元素；没有height或者min-height

-  ##### margin重叠的计算规则？

    正正取大值，正负值相加，负负最负值

#### 关于margin的auto机制
- ##### `margin`的`auto`在什么情况下才会生效

  auto的生效机制是对本来应该填满空间的元素还有剩余空间的情况下分配的，如block元素本来是占据全行，但是设置了宽度后就会有剩余空间，此时就可以用`margin：auto`定位

- ##### 为什么明明容器定高，元素定高，`margin：auto`无法垂直居中？

  同理，如果不设置`margin：auto`，本来就不会填满整个竖直空间，所以没有剩余空间分配的问题。

- ##### 那该怎么样实现`margin`的垂直居中？

  可是通过改变`writing-mode：vertical-lr`来进行改变


- ##### 绝对定位元素如何实现`margin`垂直水平居中？

  设置`top`和`right`和`bottom`还有`left`为0，绝对定位元素就会拉伸占据整个父元素，再设置长宽就会有剩余空间，再进行`margin：auto 0`即可。

#### margin 无效情况
- 内联元素垂直`margin`无效
- `display：table-cell`/`display:table-row`
- 绝对定位的非方向定位的`margin`“无效”


#### margin-start和margin-end
- `margin-start`和`margin-left`的区别？
- `webkit`下的`margin-collaose`作用？



## 关于z-index属性

可能很多人都会觉得z-index这个属性非常简单，只是设置一下数值和auto即可，但实际上z-index是一个很有深度学问的属性。

z-index中很重要的概念就是**层叠上下文**和层叠顺序的概念。

- **层叠上下文(stacking context)** : 是html元素中的一个三维概念，作用对象是某个元素，表明该元素在z轴上“高人一等”

- **层叠水平(stacking level)** : 层叠上下文中的每个元素都一个层叠水平，决定了同一个层叠上下文中元素在z轴上的显示顺序，遵循“后来居上”和”谁打谁上“的层叠准则。

- **层叠顺序（stacking order)** : 表示元素发生层叠时候有着特定的垂直显示顺序，注意，这里跟上面两个不一样，上面的层叠上下文和层叠水平是概念，而这里的层叠顺序是规则。

  这个层叠顺序规则就是如下的这张图：

![层叠顺序](http://upload-images.jianshu.io/upload_images/1679823-8ba113809d817072.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


如果抽象的概念比较难理解，那我们可以尝试将这个概念抽象化：
> 暂时让我们想象一张桌子，上面有一堆物品。 这张桌子就代表着一个层叠上下文。 如果在第一张桌子旁还有第二张桌子，那第二张桌子就代表着另一个层叠上下文。
>
> 现在想象在第一张桌子上有四个小方块，他们都直接放在桌子上。 在这四个小方块之上有一片玻璃，而在玻璃片上有一盘水果。 这些方块、玻璃片、水果盘，各自都代表着层叠上下文中一个不同的层叠层，而这个层叠上下文就是桌子。
>
>每一个网页都有一个默认的层叠上下文。 这个层叠上下文（桌子）的根源就是html元素。 html标签中的一切都被置于这个默认的层叠上下文的一个层叠层上（物品放在桌子上）。 当你给一个元素赋予了除 auto (自动) 外的z-index值时，你就创建了一个新的层叠上下文，其中有着独立于页面上其他层叠上下文和层叠层的层叠层。 这就相当于你把最近的已定位祖先元素 另一张桌子带到了房间里。

深入了理解了这些概念，只要再记住下面这些关于层叠上下文的机制就可以让我们很好的去判断页面元素的层叠顺序:
##### 1.  定位元素默认z-index:auto可以看成是z-index：0；
##### 2. z-index不为auto的定位元素会创建层叠上下文；
##### 3. z-index层叠顺序的比较止步于父级层叠上下文；

让我们来看几个例子消化一下：
对于如下的html结构来说，如果我们做这样的设置：
```html
<div class="box">
  <img>
</div>
```
```css
.box{ position: absolute; background:blue;}
.img{ position: relative; margin-left: -100px;}
```
根据后来居上，`img`会覆盖`box；okay`, 如果给`img`加上`z-index`呢？
```css
.box{ position: absolute; background:blue;}
.img{ position: relative; margin-left: -100px; z-index:-1}
```
此时，按照上面的规则，`box`的`z-index`为默认值`auto`，`img`的层叠上下文就是根元素，因为按照层叠顺序`z-index：auto`的定位元素高于`z-index`负值，所以`box`的背景色会覆盖图片。

而此时如果我给box也加上z-index，
```css
.box{ position: absolute; background:blue; z-index：0}
.img{ position: relative; margin-left: -100px; z-index:-1}
```
因为`box`为`img`创建了一个新的`context`，在这个`context`中，`box`的背景色是最底层的，所以即使`box`的`z-index`值大于`img`，`img`还是会覆盖在`box`之上。

除此之外，还需要了解到一些css3属性也会创建层叠上下文：

- 一个 `z-index` 值不为 "auto"的 flex 项目 (flex item)，即：父元素 `display: flex|inline-flex`，
- `opacity` 属性值小于 1 的元素
- `transform` 属性值不为 "none"的元素
- `mix-blend-mode` 属性值不为 "normal"的元素
- `filter` 值不为“`none`”的元素
- `perspective`值不为“`none`”的元素
- `isolation` 属性被设置为 "isolate"的元素
- `position`: `fixed`
- 在 `will-change` 中指定了任意 CSS 属性，即便你没有直接指定这些属性的值（参考 这篇文章）
- `-webkit-overflow-scrolling` 属性被设置 `"touch"`的元素

## 浮动的原理，引起的问题及解决办法

### 工作原理
浮动元素脱离文档流，不占据空间(但会占据文字空间，产生文字环绕的效果)，浮动元素碰到包含他的边框或者浮动元素的边框停留。

### 浮动的一些特性
设想一个场景，现在想要给一段文字环绕一个图片，这时候想给文字加上margin，让其远里图片，margin会有用吗？
答案是否定的，如果我们给整个p设定一个border，我们可以看出为什么没有用。
![img](http://pic002.cnblogs.com/images/2012/315658/2012050812363738.jpg)

可以看到，其实图片是位于<p>盒模型内部。这就是为什么p的margin无用的原因。

再设想一个场景，如果给几个图片列表都设为float:left，当图片列表的大小一样时，他们会按顺序一个接一个排列。
![li排列1](http://pic002.cnblogs.com/images/2012/315658/2012050813423497.jpg)

那如果每个li大小不同呢？如有一些是100px，另外一些是150px，那结果可能会有点措手不及。
![li排列2](http://pic002.cnblogs.com/images/2012/315658/2012050813484195.jpg)

为什么浮动会产生这个效果？

这需要时刻注意关于浮动元素位置的以下特性：

关于水平方向的位置：

- 向左浮动的元素不会出现在向右浮动的元素的右侧

关于垂直方向的位置：
- 浮动元素不会比容器的顶部还高

- 浮动元素不会比前一个块级元素或浮动元素更高

-  浮动元素不会比前一个行内元素更高

也就是说，在上图的例子中，因为图片2撑高了该行高度，所以在图片3放完后，仍然有足够的垂直空间放置图片4。

所以，我们需要记住的是，当你有一个浮动元素(不位于尾行)时，它后面的浮动元素占用的垂直空间必须大于或等于它才会触发换行。

### 清除浮动

- 使用clear
  - 添加一个空元素，和浮动元素同级，设置clear：both
  - 使用after伪元素创建一些不浮动的元素
- 父元素设置overflow属性，为hidden或auto


## BFC原理及其应用

BFC，英文是Block Formating Contexts，翻译过来很难懂，怎么理解呢？我们可以理解成BFC是一个容器属性，具有BFC属性的元素可以看做是割断了的独立空间，容器里面的元素不会在布局上影响到外面的元素，通俗一点来讲，可以把 BFC 理解为一个封闭的大箱子，箱子内部的元素无论如何翻江倒海，都不会影响到外部。

### 触发BFC
什么情况会触发BFC呢？只要元素马努在下面任一条件即可触发BFC特性(按常用性排名)：
- `overflow`除了visible以外的值(hidden, auto, scroll);
- `display`设置`inline-block`,`table-ceslls`,`flex`;
- 绝对定位元素，即`position:absolute | fixed`;
- 浮动元素：float除none以外的值
- `body`根元素

### BFC特性


因为BFC是一个让容器成为独立空间的特性，所以我们可以利用BFC许多巧妙特性。

#### 1. 通过将元素放在不同BFC容器，避免外边距重叠

```html
<div class="container">
    <p></p>
</div>
<div class="container">
    <p></p>
</div>
```

```css
.container {
    overflow: hidden;
}
p {
    width: 100px;
    height: 100px;
    background: lightblue;
    margin: 100px;
}

```

#### 2.利用BFC可以包含浮动的元素来清除浮动
```html
<div style="border: 1px solid #000;">
    <div style="width: 100px;height: 100px;background: #eee;float: left;"></div>
</div>
```
![BFC](https://pic4.zhimg.com/v2-371eb702274af831df909b2c55d6a14b_b.png)

由于容器内元素浮动，脱离了文档流，所以容器只剩下 2px 的边距高度。如果给父级Div设置`overflow：hidden`使触发容器的 BFC，那么容器将会包裹着浮动元素。

![new BFC](https://pic4.zhimg.com/v2-cc8365db5c9cc5ca003ce9afe88592e7_b.png)

#### 3. 利用BFC可以阻止元素被浮动元素覆盖

```html
<div style="height: 100px;width: 100px;float: left;background: lightblue">我是一个左浮动的元素</div>
<div style="width: 200px; height: 200px;background: #eee">我是一个没有设置浮动,
也没有触发 BFC 元素, width: 200px; height:200px; background: #eee;</div>
```
![BFC](https://pic4.zhimg.com/v2-dd3e636d73682140bf4a781bcd6f576b_b.png)

同样通过给第二个div添加`overflow:hidden`来去除浮动影响。

![BF](https://pic3.zhimg.com/v2-5ebd48f09fac875f0bd25823c76ba7fa_b.png)
##关于display
首先你要了解的是 display有几种常见形式？`inline`,`block`,`inline-block`,这三个的区别必须谨记于心。除此之外，如果还能说出额外的`table`,`table-cell`,`list-item`那更好。

这里有一个需要经常记忆的就是关于常见的`inline`元素和常见的`block`元素。
- 常见的block元素有这些：`div`, `h1-h6`, `ul`, `li`, `ol`, `dl`, `dd`, `dt`
- 常见的inline属性元素有: `span`, `a`, `em`
- 是inlne但是有着`inline-block`的元素：`<img>`和`<input>`

说到inline-block就再多说一点。以前经常用inline-block来代替float进行布局或者实现元素居中效果。因为空白字符压缩的原因，使用inline-box的元素之间总是会存在怪异的一些空白，有什么好的办法去除呢？
##### 1.  `CSS trick`: 设font-size/line-height为0。
##### 2. 特殊的html结构或者不写标签结束符: 削足适履，同样不是好写法
```html
<ul
  ><li>1</li
  ><li>2</li
  ><li>3</li
></ul>
```
##### 3.使用不产生空白节点的模板语言，如jade(比较推荐)


## 关于position
具体的`static`,`relative`,`absolute`,`fixed`的概念必须谨记于心。我们可以用下面的网页元素的层叠关系图来加深记忆。

![层叠关系](http://7b1evr.com1.z0.glb.clouddn.com/illustration%5Cthree_core_concepts_of_css2012-08-14-59d1deed94-70c5-48bb-b2ff-8421d516a981.gif)

position 设置为 relative 的时候，元素依然在普通流中，位置是正常位置，你可以通过 left right 等移动元素。会影响其他元素的位置。

而当一个元素的 position 值为 absolute 或 fixed 的时候，会发生三件事：
- 把该元素往 Z 轴方向移了一层，元素脱离了普通流，所以不再占据原来那层的空间，还会覆盖下层的元素。
- 该元素将变为块级元素，相当于给该元素设置了 display: block;（给一个内联元素，如 <span> ，设置 absolute 之后发现它可以设置宽高了）。
- 如果该元素是块级元素，元素的宽度由原来的 width: 100%（占据一行），变为了 auto。

那`absolute`是相对什么定位？ 答案是根据父元素中最近的设置定位的元素，即position不等于static。元素的左右移动不会影响到其他元素的位置，因为它已经在不在文档流中。

## 列举css实现水平垂直居中的几种方式

了解了这么多关于CSS定位，我们可以通过练习这道面试必考题来让我们加深练习：

```html
<div class="parent">
  <div class="child">居中</child>
</div>
```
```css
.parent{
    background-color: tomato;
    height:500px;
    width: 100vw;
}
.child{
  background-color: pink;
  height:100px;
  width:100px;
  display:inline-block;
}
```
对于如上的css结构，你有多少种不同的方法实现各类居中呢？
### 实现水平垂直居中的方法：
```css
/*flex*/
.parent{
  display: flex;
  justify-content: center;
  align-items: center;
}
```

```css
/*利用margin和paosition：absolute*/
.parent{
}
.child{
  position: absolute;
  top:0;
  right:0;
  left:0;
  bottom:0;
  margin:auto;
}
```

```css
.parent{
    position: relative;
}
.child{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
}
```
```css
/*使用margin-left和margin-top，前提需要知道长和宽*/
.parent{
    position: relative;
}
.child{
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -50px;
    margin-top: -50px;
}
```


## link和import区别

本质上，这两种方式都是为了加载CSS文件，但还是存在着细微的差别

- 老祖宗的差别。link属于XHTML标签，而@import完全是CSS提供的一种方式。

link标签除了可以加载CSS外，还可以做很多其它的事情，比如定义RSS，定义rel连接属性等，@import就只能加载CSS了。

- 加载顺序的差别。当一个页面被加载的时候（就是被浏览者浏览的时候），link引用的CSS会同时被加载，而@import引用的CSS会等到页面全部被下载完再被加载。所以有时候浏览@import加载CSS的页面时开始会没有样式（就是闪烁），网速慢的时候还挺明显（梦之都加载CSS的方式就是使用@import，我一边下载一边浏览梦之都网页时，就会出现上述问题）。

- 兼容性的差别。由于@import是CSS2.1提出的所以老的浏览器不支持，@import只有在IE5以上的才能识别，而link标签无此问题。

- 使用dom控制样式时的差别。当使用javascript控制dom去改变样式的时候，只能使用link标签，因为@import不是dom可以控制的。

大致就这几种差别了（如果还有什么差别，大家告诉我，我再补充上去），其它的都一样，从上面的分析来看，还是使用link标签比较好。

标准网页制作加载CSS文件时，还应该选定要加载的媒体（media），比如screen，print，或者全部all等。这个我到CSS高级教程中再给大家介绍



## css选择器的优先级

>##### 对于单一选择器，可以通过如下的优先级查看：

- important 声明  0
- html内联元素  1
- ID选择器  2
- 类选择器 3
- 伪类选择器 3   `:hover{}`
- 属性选择器 3   `a[href="segmentfault.com"]{}`
- 标签选择器 4    `span{}`
- 伪元素选择器 4   `::before{}`
- 通配符选择器 5

>##### 对于多重选择器，可以按如下的方式计算：

- 计算选择符中ID 选择器的个数 a
- 计算选择符中类选择器、属性选择器以及伪类选择器的个数之和 b，
- 计算选择符中标签选择器和伪元素选择器的个数之和 c。

按 a、b、c 的顺序依次比较大小，大的则优先级高，相等则比较下一个。若最后两个的选择符中 a、b、c 都相等，则按照“就近原则”来判断。

## 伪类选择器和伪元素选择器

## 伪类种类总结
![伪类](http://segmentfault.com/img/bVcccn)

## 伪元素种类(css3后用两个冒号)
![伪元素类](http://segmentfault.com/img/bVccco)

总结来说，伪类的效果可以通过添加一个实际的类来达到，而伪元素的效果则需要通过添加一个实际的元素才能达到，这也是为什么他们一个称为伪类，一个称为伪元素的原因。

## CSS中`resetting`和`normalizing`指的都是什么？

这个以前还真忘了关注，一般来说`resetting`就是将各个标签的原来的默认固有属性全部去除，而`normalizing`更多的不完全去掉他们

## 关于CSS的浮动
虽然说float已经是CSS快要退出历史舞台的元素，还是来回顾下float的几个特性：
- 只有左右浮动，没有上下浮动

- 浮动的元素脱离文档流，不再占据原来的空间。 有一个很重要的一点是，如果浮动元素上一个元素是一个标准流元素，则浮动元素的垂直位置不会改变。如果上一个元素是浮动元素，则会紧跟其后

- 浮动元素的下一个兄弟元素中如果有内联元素（通常是文字），则会围绕该元素显示，形成类似「文字围绕图片」的效果。

- 清楚浮动clear作用于使用清楚的元素本身，意为不允许此元素左/右有浮动元素。

清楚浮动的方式：
- 添加`clear:both`的空标签
- BFC,父元素设置`overflow:hidden`,`overflow:auto`
- 父元素也设置浮动
- 使用:after 伪元素

## 关于css的FLEX

flex布局解决了传统BOX布局很多不能解决的问题，可以说彻底能让我们彻底抛弃了原来的position和float布局模式。可无奈的是，对于flex的这些属性，每次使用的时候都略显陌生。总有一些特性记不住。下面就分别从flex-container和flex-item分别来总结下：

### 关于flex-container(第一个属性为默认值)


-  决定主轴方向，不用多说
```
flex-direction: row | row-reverse | column | column-reverse;
```

- 决定如果一条轴线排不下容器，该如何换行
``` csss
flex-wrap:nowrap | wrap | wrap | wrap-reverse;
```

- 是`flex-direction`和`flex-wrap`的合体，默认值为`row nowrap`
```
flex-flow: <flex-direction> && <flex-wrap>
```

```
 justify-content: flex-start | flex-end | center| space-betwwen | space-around
```
- 定义项目如何对齐，默认是stretch，如果项目未设置高度或设为auto，将占满整个容器的高度。如果设置高度则按原来的高度。baseline是基于item的第一行文字的基线对齐。
```
 align-item: stretch | flex-start | flex-end | center | baseline ;
```
- 如果项目多多跟轴线，即有多行item的话，定义其对其方式。
```
align-content: stretch | flex-start | flex-end | center | space-between | space-around;
```





### 关于item

- `order: <integer>` :默认为0，定义项目的排列顺序

- `flex-basis：<length> | auto`: 默认为auto，定义项目在分配多余空间之前，占据的容器的空间。默认值为auto，即项目本来的大小。


- `flex-shrink:<number>` : 定义在空间不够的情况下的项目的缩小比例，默认为1

- `flex-grow: <number>` : 定义在出现多余空间的情况下，项目的放大比例，默认为0，即有多空空间也不放大



- `flex: [ <flex-grow> || <flex-shrink> || <flex-basis> ]` : 组合模式，默认值为 ` 0 1 auto`,后两个属性可选。


- `align-self: auto | flex-start | flex-end | center | baseline | stretch` : 定义某个项目有不同于container设置的对其方式，可覆盖align-items，默认值为auto，表示继承父元素的align-items属性


## 关于rem，em和px

- px 在缩放页面时无法调整那些使用它作为单位的字体、按钮等的大小；
- em 的值并不是固定的，会继承父级元素的字体大小，代表倍数；
- rem 的值并不是固定的，始终是基于根元素 <html> 的，也代表倍数。


## 关于css reset是否需要
css reset就重置浏览器的默认样式。
```css
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p,
blockquote, pre, a, abbr, acronym, address, big,
cite, code, del, dfn, em, font, img,
ins, kbd, q, s, samp, small, strike,
strong, sub, sup, tt, var, dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
center, u, b, i {
    margin: 0;
    padding: 0;
    border: 0;
    outline: 0;
    font-weight: normal;
    font-style: normal;
    font-size: 100%;
    font-family: inherit;
    vertical-align: baseline
}
body {
    line-height: 1
}
:focus {
    outline: 0
}
ol, ul {
    list-style: none
}
table {
    border-collapse: collapse;
    border-spacing: 0
}
blockquote:before, blockquote:after, q:before, q:after {
    content: “”
}
blockquote, q {
    quotes: “” “”
}
input, textarea {
    margin: 0;
    padding: 0
}
hr {
    margin: 0;
    padding: 0;
    border: 0;
    color: #000;
    background-color: #000;
    height: 1px
}}
```
## css性能提升

总的来说，css性能优化主要是以下四个方面：
### 加载性能

主要是从减少文件体积，减少则色加载，提高并发方面入手

### 选择器性能

一般selector对整体性能影响已经可以忽略不计了，selector更多考虑规范化和可维护性

### 渲染性能

这一块是css优化很重要的关注对象，应该避免出现类似太多text-shadow，css动画的优化，合理利用gpu加速等

### 可维护性，可健壮性

## css预处理器sass的一些常用功能

#### 提供变量
以`$`开头，如果需要在字符串中使用，则需要卸载#{}之中
```js
$side : left;
.rounded {
　　　　border-#{$side}-radius: 5px;
}
```

#### 计算功能
允许在代码中使用算式
#### 嵌套功能

除了在选择器上进行嵌套，属性也可以嵌套，比如下面的border-color
```cs
p {
　border: {color: red;}
　}
```
在嵌套的傣妹，可以使用&引用父元素，比如a:hover伪类
```
a{
  &:hover{color:#ffb3ff}
}
```

#### 允许继承
SASS允许一个选择器，使用@extend来继承另一个选择器。

#### mixin
Mixin是可以重用的代码块，可以通过mixin来编写需要复用的css类
```cs
@mixin left {
　float: left;
　margin-left: 10px;
}
```
使用@include来调用这个mixin
```
div {
　@include left;
}
```
除此之外，mixin可以指定参数值，这样就可以像函数一样调用。
```cs
@mixin left($value: 10px) {
  float: left;
　margin-right: $value;
}
div {
　@include left(20px);
}
```

#### if条件语句，while语句，for循环，自定义函数


## 参考资料
- [10 分钟理解 BFC 原理](https://zhuanlan.zhihu.com/p/25321647)
- [关于z-index 那些你不知道的事](https://webdesign.tutsplus.com/zh-hans/articles/what-you-may-not-know-about-the-z-index-property--webdesign-16892)
- [CSS核心概念](http://geekplux.com/2014/04/25/several_core_concepts_of_css.html)

- [前端工程师手册-盒模型](https://leohxj.gitbooks.io/front-end-database/html-and-css-basic/box-module.html)
