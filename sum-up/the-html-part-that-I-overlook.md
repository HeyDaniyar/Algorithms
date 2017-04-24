### doctype的具体意义

DTD（文档类型定义）是一组机器可读的规则，他们定义 XML 或 HTML 的特定版本中允许有什么，不允许有什么。在解析网页时，浏览器将使用这些规则检查页面的有效性并且采取相应的措施。浏览器通过分析页面的 DOCTYPE 声明来了解要使用哪个 DTD ，由此知道要使用 HTML 的哪个版本。
DOCTYPE 当前有两种风格，严格（ strict ）和过渡（ transitional ）。
如果发送具有正确的 MIME 类型的 XHTML 文档，理解 XML 的浏览器将不显示无效的页面。

浏览器模式

 浏览器有两种呈现模式：

 - 标准模式：在标准模式中，浏览器根据规范呈现页面；
 - 混杂模式：在混杂模式中，页面以一种比较宽松的向后兼容的方式显示。

DOCTYPE 切换
对于 HTML 4.01 文档，
包含严格 DTD 的 DOCTYPE 常常导致页面以标准模式呈现。
包含过度 DTD 和 URI 的 DOCTYPE 也导致页面以标准模式呈现。
但是有过度 DTD 而没有 URI 会导致页面以混杂模式呈现。
DOCTYPE 不存在或形式不正确会导致 HTML 和 XHTML 文档以混杂模式呈现。



## 易忽视的meta
meta是用来定义html元属性的一个标签
![meta](http://upload-images.jianshu.io/upload_images/5059091-cc84f01b07a579f0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

可以看出，meta中有很多有用的特性，下面来从大类分别解剖一下meta。

### meta属性
meta属性有四种，分别是http-equiv， name， scheme， content。具体用法是
```html
＜meta name=”参数” content=”具体的参数值”＞
```
其中每个属性的作用如下：
#### http-equiv： 把 content 属性关联到 HTTP 头部
- content-type/content-language： 设定页面使用的字符集，用以说明主页制作使用的文字语言，浏览器会根据此来调用相应的字符集显示page内容

-  expire: 指定网页在缓存中的过期时间，一旦网页过期，必须到服务器上重新调阅，时间格式必须是GMT

- refresh: 让网页多长时间(秒)刷新自己，或在多长时间后让网页自动链接到其他网页

- set-cookie: 缓存cookie,时间格式必须使用GMT

- pragma: 禁止浏览器从本地机的缓存中调阅页面内容

#### name：把content属性关联到一个名称

name属性可以定义的有很多，除了便于seo优化的几个tdk以外，比较重要的就是viewport这个字段，主要用于移动设备的控制。例如如下字段：
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
```
让我们来分别解释一下：

- width：设置展示区域宽度，为一个正数或"width-device"

- initial-scale:设置页面的初始缩放值，为一个数字，可以带小数

- minimum-scale:允许用户的最小缩放值，为一个数字，可以带小数

- maximum-scale:允许用户的最大缩放值，为一个数字，可以带小数

- user-scalable:是否允许用户进行缩放，值为"no"或"yes", no 代表不允许，yes代表允许

#### scheme：定义content属性值的格式

如下面的例子：
```html
<meta name="revised" content="2006-11-03" scheme="YYYY-MM-DD" >
```

#### content: 定义与`http-equiv`或`name` 属性相关的元信息

## HTML 语义化

语义化的含义就是用正确的标签做正确的事情，html语义化就是让页面的内容结构化，便于对浏览器、搜索引擎解析；在没有样式CCS情况下也以一种文档格式显示，并且是容易阅读的。搜索引擎的爬虫依赖于标记来确定上下文和各个关键字的权重，利于 SEO。使阅读源代码的人对网站更容易将网站分块，便于阅读维护理解。


## SEO 优化

对于SEO优化其实我并没有任何经验，下面只是引用整理关于`imweb`的[SEO优化实战](http://imweb.io/topic/5682938b57d7a6c47914fc00)，推荐阅读原内容来获取更完善知识。

SEO本身设计范围比较广，如果是从前端重构领域来看的话主要包括以下几点：

### TDK优化
TDK为title,description,keywords三个的统称。当然title是最有用的，是非常值得优化的；而keywords因为以前被seo人员过度使用，所以现在对这个进行优化对搜索引擎是没用的，这里就不说了；description的描述会直接显示在搜索的介绍中，所以对用户的判断是否点击还是非常有效的。


### 页面内容优化

  - 使用html5结构，让html更加语义化
  - 唯一的H1标题
  - img设置alt属性
  - 谨慎设置nofollow

### URL优化

对于url设计原则，我们应该遵循以下几点：

- 越短越好
- 避免太多参数
- 目录层次尽量少
- 文件及目录名具描述性
- URL中包括关键词(中文除外)
- 字母全部小写
- 连词符使用-而不是_
- 目录形式而非文件形式

### robots优化

搜索引擎蜘蛛访问网站时会第一个访问robots.txt文件，robots.txt用于指导搜索引擎蜘蛛禁止抓取网站某些内容或只允许抓取那些内容，放在站点根目录。所以，需要利用好`robtos.txt`的各个语法规则。
