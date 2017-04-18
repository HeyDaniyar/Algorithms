### doctype的具体意义

DTD（文档类型定义）是一组机器可读的规则，他们定义 XML 或 HTML 的特定版本中允许有什么，不允许有什么。在解析网页时，浏览器将使用这些规则检查页面的有效性并且采取相应的措施。浏览器通过分析页面的 DOCTYPE 声明来了解要使用哪个 DTD ，由此知道要使用 HTML 的哪个版本。
DOCTYPE 当前有两种风格，严格（ strict ）和过渡（ transitional ）。过渡 DOCTYPE 的目的是帮助开发人员从老版本迁移到新版本。
如果发送具有正确的 MIME 类型的 XHTML 文档，理解 XML 的浏览器将不显示无效的页面。
浏览器模式
 浏览器有两种呈现模式：标准模式和混杂模式（quirks mode）。在标准模式中，浏览器根据规范呈现页面；在混杂模式中，页面以一种比较宽松的向后兼容的方式显示。
DOCTYPE 切换
对于 HTML 4.01 文档，
包含严格 DTD 的 DOCTYPE 常常导致页面以标准模式呈现。
包含过度 DTD 和 URI 的 DOCTYPE 也导致页面以标准模式呈现。
但是有过度 DTD 而没有 URI 会导致页面以混杂模式呈现。
DOCTYPE 不存在或形式不正确会导致 HTML 和 XHTML 文档以混杂模式呈现。


## HTML 语义化

语义化的含义就是用正确的标签做正确的事情，html语义化就是让页面的内容结构化，便于对浏览器、搜索引擎解析；在没有样式CCS情况下也以一种文档格式显示，并且是容易阅读的。搜索引擎的爬虫依赖于标记来确定上下文和各个关键字的权重，利于 SEO。使阅读源代码的人对网站更容易将网站分块，便于阅读维护理解。