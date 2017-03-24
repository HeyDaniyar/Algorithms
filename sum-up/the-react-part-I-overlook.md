### 用最简单的语言去解释Virtual DOM？

简而言之，Virtual DOM就是在浏览器端用Javascript实现了一套DOM API。基于React进行开发时所有的DOM构造都是通过虚拟DOM进行，每当数据变化时，React都会重新构建整个DOM树，然后React将当前整个DOM树和上一次的DOM树进行对比，得到DOM结构的区别，然后仅仅将需要变化的部分进行实际的浏览器DOM更新。而且React能够批处理虚拟DOM的刷新，在一个事件循环（Event Loop）内的两次数据变化会被合并，例如你连续的先将节点内容从A变成B，然后又从B变成A，React会认为UI不发生任何变化，而如果通过手动控制，这种逻辑通常是极其复杂的。尽管每一次都需要构造完整的虚拟DOM树，但是因为虚拟DOM是内存数据，性能是极高的，而对实际DOM进行操作的仅仅是Diff部分，因而能达到提高性能的目的。这样，在保证性能的同时，开发者将不再需要关注某个数据的变化如何更新到一个或多个具体的DOM元素，而只需要关心在任意一个数据状态下，整个界面是如何Render的。


### React的生命周期

组件都是有生命周期的，生命周期内，props和state改变会导致React自动用Diff算法重新渲染页面。那么生命周期到底都有哪些呢？

大体上分为三类：

- 挂载： 组件被插入到DOM中。
- 更新： 组件被重新渲染，查明DOM是否应该刷新。
- 移除： 组件从DOM中移除。
从流程上讲，是这样的：

#### 挂载：
- **componentWillMount()**： 在初次渲染之前执行一次，最早的执行点

- **componentDidMount()**： 在初次渲染之后执行，比较常用，比如持续执行某事件

#### 更新：

- **componentWillReceiveProps()**： 在组件接收到新的`props`的时候调用。在初始化渲染的时候，该方法不会调用。

- **shouldComponentUpdate()：**  在接收到新 的`props`或者`state`，将要渲染之前调用。

- **componentWillUpdate()：** 在接收到新的`props`或者`state`之前立刻调用。

- **componentDidUpdate()：** 在组件的更新已经同步到`DOM`中之后立刻被调用。

#### 移除:
- **componentWillUnmount()：** 在组件从`DOM`中移除的时候立刻被调用。

![img](http://cdn3.infoqstatic.com/statics_s2_20170323-0336/resource/articles/react-jsx-and-component/zh/resources/0702001.png)
