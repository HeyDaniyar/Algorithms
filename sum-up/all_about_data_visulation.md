##svg渲染规则

svg文件全局有效的规则是“后来居上”，越后面的元素越可见。

## svg的坐标系
基本上和小时候学的是相反的，如图。

![svg坐标](https://developer.mozilla.org/@api/deki/files/78/=Canvas_default_grid.png)

## 熟练svg中path的使用
用svg的path如何画出一条抛物线？

![抛物线](https://developer.mozilla.org/@api/deki/files/363/=ShortCut_Cubic_Bezier.png)

首先直接上代码：
```html
<?xml version="1.0" standalone="no"?>
<svg width="190px" height="160px" version="1.1" xmlns="http://www.w3.org/2000/svg">
  <path d="M10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80" stroke="black" fill="transparent"/>
</svg>
```

path的d就是他的路劲属性，一般路径属性中必不可少的就是起点，一般我们用M表示（代表MoveTO），因为抛物的前半部分属于贝塞尔曲线，我们用
>C x1 y1, x2 y2, x y

来分别表示贝塞尔曲线的控制点坐标，也就是图中的红线部分，因为抛物线的第二个红线和第三个红线是对称关系，那我们就可以用S表示简写的贝塞尔曲线命令：
>S x2 y2, x y (or s dx2 dy2, dx dy)

所以就有了上述抛物path坐标。


## line中不知道的属性

- stroke： 关于线段的颜色

- stroke-dasharray： 用来画虚线
