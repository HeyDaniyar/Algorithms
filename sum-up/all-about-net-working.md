## OSI，TCP/IP，五层协议的体系结构，以及各层协议

![图片表示](https://uploadfiles.nowcoder.com/images/20161208/907563_1481180597500_52B08235FB035A85109427E9743E1BF3)
```java
OSI分层 （7层）：
物理层、数据链路层、网络层、传输层、会话层、表示层、应用层。

TCP/IP分层（4层）：网络接口层、 网际层、运输层、 应用层。

五层协议 （5层）：物理层、数据链路层、网络层、运输层、 应用层。
每一层的协议如下：
物理层：RJ45、CLOCK、IEEE802.3 （中继器，集线器）
数据链路：PPP、FR、HDLC、VLAN、MAC （网桥，交换机）
网络层：IP、ICMP、ARP、RARP、OSPF、IPX、RIP、IGRP、 （路由器）
传输层：TCP、UDP、SPX
会话层：NFS、SQL、NETBIOS、RPC
表示层：JPEG、MPEG、ASII
应用层：FTP、DNS、Telnet、SMTP、HTTP、WWW、NFS

每一层的作用如下：
物理层：通过媒介传输比特,确定机械及电气规范（比特Bit）
数据链路层：将比特组装成帧和点到点的传递（帧Frame）
网络层：负责数据包从源到宿的传递和网际互连（包PackeT）
传输层：提供端到端的可靠报文传递和错误恢复（段Segment）
会话层：建立、管理和终止会话（会话协议数据单元SPDU）
表示层：对数据进行翻译、加密和压缩（表示协议数据单元PPDU）
应用层：允许访问OSI环境的手段（应用协议数据单元APDU）
```

## http和https的区别
https和http相比多了一个s，这个s就是security。在http中，数据接受和发送都是明文的，也就是有人如果用抓包工具去分析的你发送的包，是可以分析出来你的具体信息的。而https是在tcp协议的基础上增加了TLS和SSL安全协议, 具体来说，在完成了TCP三次握手之后，他增加了以下几个步骤：

-  客户端会验证服务器的数字证书，也就是CA，通过后再进入下一步
-  协商对称加密算法的密钥，hash算法密钥
-  SSL安全加密隧道协商完成
- 网页有以加密的方式进行传输，用刚才协商堆成加密算法和密钥加密来保证数据机密性，用协商的hash算法保证数据完整性


## http2的一些新特性


##  TCP和UDP的区别？
```java
TCP提供面向连接的、可靠的数据流传输，而UDP提供的是非面向连接的、不可靠的数据流传输。
TCP传输单位称为TCP报文段，UDP传输单位称为用户数据报。
TCP注重数据安全性，UDP数据传输快，因为不需要连接等待，少了许多操作，但是其安全性却一般。
TCP对应的协议和UDP对应的协议
TCP对应的协议：
（1） FTP：定义了文件传输协议，使用21端口。
（2） Telnet：一种用于远程登陆的端口，使用23端口，用户可以以自己的身份远程连接到计算机上，可提供基于DOS模式下的通信服务。
（3） SMTP：邮件传送协议，用于发送邮件。服务器开放的是25号端口。
（4） POP3：它是和SMTP对应，POP3用于接收邮件。POP3协议所用的是110端口。
（5）HTTP：是从Web服务器传输超文本到本地浏览器的传送协议。
UDP对应的协议：
（1） DNS：用于域名解析服务，将域名地址转换为IP地址。DNS用的是53号端口。
（2） SNMP：简单网络管理协议，使用161号端口，是用来管理网络设备的。由于网络设备很多，无连接的服务就体现出其优势。
（3） TFTP(Trival File Tran敏感词er Protocal)，简单文件传输协议，该协议在熟知端口69上使用UDP服务。
```

## HTTP状态码

- **1XX (临时响应)表示临时响应并需要请求者继续执行操作的状态代码.**
  - 100 (继续) 请求者应当继续提出请求。 服务器返回此代码表示已收到请求的第一部分，正在等待其余部分。
  - 101 (切换协议) 请求者已要求服务器切换协议，服务器已确认并准备切换。

- **2XX (成功)表示成功处理了请求的状态代码**
  - 200 (成功) 服务器已成功处理了请求。 通常，这表示服务器提供了请求的网页。

  - 201 (已创建) 请求成功并且服务器创建了新的资源。

- **3xx (重定向) 表示要完成请求，需要进一步操作。 通常，这些状态代码用来重定向**
  - 300 (多种选择) 针对请求，服务器可执行多种操作。 服务器可根据请求者 (user agent) 选择一项操作，或提供操作列表供请求者选择。

  - 301 (永久移动) 请求的网页已永久移动到新位置。 服务器返回此响应(对 GET 或 HEAD 请求的响应)时，会自动将请求者转到新位置

  - 302 (临时移动) 服务器目前从不同位置的网页响应请求，但请求者应继续使用原有位置来进行以后的请求。

  - 305 (使用代理) 请求者只能使用代理访问请求的网页。 如果服务器返回此响应，还表示请求者应使用代理。

- **4xx(请求错误) 这些状态代码表示请求可能出错，妨碍了服务器的处理**
  - 400 (错误请求) 服务器不理解请求的语法。

  - 401 (未授权) 请求要求身份验证。 对于需要登录的网页，服务器可能返回此响应。

  - 403 (禁止) 服务器拒绝请求。

  - 404 (未找到) 服务器找不到请求的网页。

- **5xx(服务器错误)这些状态代码表示服务器在尝试处理请求时发生内部错误。 这些错误可能是服务器本身的错误，而不是请求出错**
  - 500 (服务器内部错误) 服务器遇到错误，无法完成请求。

  - 501 (尚未实施) 服务器不具备完成请求的功能。 例如，服务器无法识别请求方法时可能会返回此代码。

  - 502 (错误网关) 服务器作为网关或代理，从上游服务器收到无效响应。

  - 503 (服务不可用) 服务器目前无法使用(由于超载或停机维护)。 通常，这只是暂时状态。

  - 504 (网关超时) 服务器作为网关或代理，但是没有及时从上游服务器收到请求。

  - 505 (HTTP 版本不受支持) 服务器不支持请求中所用的 HTTP 协议版本。



## https和http的区别
- https和http相比，多了一个s,这个s就是security。两者虽然建立在TCP或者UDP协议，但是http是在TCP 80端口工作，所封装的信息都是明文的，通过抓包工具可以分析出其内容。而https是工作在TCP 443端口，并且是建立在SSL/TLS之上的，所有的传输内容都经过加密。


## 如何实现的session的跟踪
- 隐藏表单域

隐藏表单域一般是在表单提交时在JSP中声明一个隐藏域，可携带数据到表单提交后的页面。如下：
   <input type="hidden" name="token"
  value="<%=session.getAttribute("token")
  %>">
- 保存cookies

Http是无状态协议，cookie是客户端保存用户会话数据，用于保存用户会话记录。
- url重写

当客户端浏览器禁用cookie时，只有采用URL复写的方式将sessionId携带在URL的末尾来保存会话记录。
- session机制

session是服务端保存用户数据，生成Session时会默认设置一个cookie值为sessionId的cookie保存到客户端

## 三次挥手和四次挥手的状态改变
需要彻底了解三次挥手，我们需要首先对TCP报文研究透彻。

![TCP协议说明](https://nmap.org/book/images/hdr/MJB-TCP-Header-800x564.png)


满满的当年计算机网络课程回忆啊，怪自己当时没有好好理解，如今又得再来一遍。好了，废话不多说，让我们来好好分析一个这个图：

- **Source Port和 Destination Port**  表示源端口号和目标端口号，分别占用16位，用去区别主机中不同进程。

- **Subsequence Number:** 就是我们后面要用到SEQ，表示发送端到收送端的数据字节流，表示在这个报文段中的的第一个数据字节在数据流中的序号；主要用来解决网络报乱序的问题；

- **Acknowledgment Number:** 即后面我们用到的ACK，32位确认序列号。这个ack应该是上次收到的seq+1。不过有个很重要的点是当前的ACK序列号必须在标志位中ACK标志为1时才有效。主要用来解决数据不丢包的问题。

- **Offset**：给出首部中32 bit字的数目。需要这个值是因为任选字段的长度是可变的。这个字段占4bit（最多能表示15个32bit的的字，即4*15=60个字节的首部长度），因此TCP最多有60字节的首部。然而，没有任选字段，正常的长度是20字节；

- **TCP Flags:** TCP首部中有6个标志比特，它们中的多个可同时被设置为1，主要是用于操控TCP的状态机，依次为URG，ACK，PSH，RST，SYN，FIN

  - URG: 表示TCP包的紧急指针域有效，用来保证TCP连接不被中断
  - ACK：表示前面的ACK数据有效
  - PSH：表示PUSH操作，指在数据包到达接收端以后，立即传送给应用程序，而不是在缓冲区中排队；
  - RST：表示连接复位请求。用来复位那些产生错误的连接
  - SYN：表示同步序号，用来建立连接。SYN标志位和ACK标志位搭配使用，当连接请求的时候，SYN=1，ACK=0；连接被响应的时候，SYN=1，ACK=1；
  - FIN： 表示发送端已经达到数据末尾，也就是说双方的数据传送完成，没有数据可以传送了，发送FIN标志位的TCP数据包后，连接将被断开。


### 三次握手

好了，有了以上的基础，看懂下面的三次握手示意图并真正理解就不是什么难事了。

![三次握手](http://shp.qpic.cn/gqop/20000/LabImage_8720bd64871a5452df583fdab8207d64.jpg/0)

- 第一次握手： Client发起建立连接，tcp进程运行connect()，发送SYN标志位1，seq=x的报文段，client状态变成SYN_SENT
- 第二次握手： Server收到连接请求，检查端口是否可用，如果可用就去分配进程，并将自己的SYN置为1，另ack=x+1,seq=y的报文段发送出去，server的状态变成SYN_RCVD
- 第三次握手： Client收到服务器响应，并设置ACK为y+1的TCP包再次发送给server，发送后server和client改变自己的状态为Established，此时三次握手完毕，连接建立。

### 四次挥手

让我们再根据上一个图来看看四次挥手的过程。
- 第一次挥手：主机h1(可以是client端也可以是server端)，运行close(),发起关闭请求，设置FIN为1，发送一个seq = x+2，ack = y+1的FIN报文段，然后主机进入FIN_WAIT_1阶段，表示没有数据再发送。

- 第二次挥手：主机h2收到了关闭请求，设置ack = x+3，表示我同意的你关闭请求，然后主机1收到进入FIN_WAIT_2阶段。
- 第三次挥手：主机2向主机1发送FIN报文段，请求关闭连接，同时主机2进入LAST_ACK状态；
- 第四次挥手：主机1收到主机2发送的FIN报文段，向主机2发送ACK报文段，然后主机1进入TIME_WAIT状态；主机2收到主机1的ACK报文段以后，就关闭连接；此时，主机1等待2MSL后依然没有收到回复，则证明Server端已正常关闭，那好，主机1也可以关闭连接了。

### 为什么？

三次握手很好理解，就是为了不让服务器浪费资源，假设只有两次握手，在第二次握手的时候就建立了连接，可是客户端却一直没有发送数据，那服务器不是一直只能干等吗？简而言之，就是防止资源浪费。

四次握手也许稍微会多想。其实也很简单，TCP是面向连接的，而且是双分工的，就是说服务器和主机都可以发送和接受数据。这就意味着，当主机1发出FIN报文段时，只是表示主机1已经没有数据要发送了，主机1告诉主机2，它的数据已经全部发送完毕了；

但是，这个时候主机1还是可以接受来自主机2的数据；当主机2返回ACK报文段时，表示它已经知道主机1没有数据发送了，但是主机2还是可以发送数据到主机1的；

当主机2也发送了FIN报文段时，这个时候就表示主机2也没有数据要发送了，就会告诉主机1，我也没有数据要发送了，之后彼此就会愉快的中断这次TCP连接。如果要正确的理解四次分手的原理，就需要了解四次分手过程中的状态变化。

## 怎么理解RESTful架构？

简单的说, RESTful 是把每个 URI 当做资源 (Resources), 通过 method 作为动词来对资源做不同的动作, 然后服务器返回 status 来得知资源状态的变化 (State Transfer);

## 不同HTTP方法的比较

> #### get和post的区别

虽然有些时候get能做的事情或许post也能做，但是从HTTP规范来说，GET用于信息获取，POST表示可能修改变服务器上的资源的请求。除此之外，如果从一些细节考虑，两者还有如下区别：
  1. 两个传输数据的方式不同
GET请求的数据会附在URL之后（就是把数据放置在HTTP协议头中），**以`?`分割URL和传输数据，参数之间以`&`相连**。如果数据是英文字母或者数字，原样发送，如果是空格，转换为+，如果是中文/其他字符，则直接把字符串用BASE64加密。POST把提交的数据则放置在是HTTP包的包体中。

2. GET方式提交的数据最多只能是1024字节（因为有些操作系统或浏览器对URL长度的限制），理论上POST没有限制（后端可调节）。

3. POST的安全性要比GET的安全性高(如果通过GET提交数据，用户名和密码将明文出现在URL上)

> #### put和post的区别

POST 是新建 (create) 资源, 非幂等, 同一个请求如果重复 POST 会新建多个资源. PUT 是 Update/Replace, 幂等, 同一个 PUT 请求重复操作会得到同样的结果.


## 谈谈浏览器的同源策略

首先来解释一下同源，同源需同时满足下面三个条件，缺一不可：

- 同域名
- 同端口
- 同协议

因为`www.baidu.com`和`baidu.com`属于不同的域名，所以两者可以判定为不同源。

同源策略本是为了保护用户信息安全来设定，但在开发中，也造成了一定的不便。具体的影响在下面的三个方面：

1. Cookie、LocalStorage 和 IndexDB 无法读取。

2.  DOM 无法获得。

3.  AJAX 请求不能发送。

这里面发生情况比较多的可能是第三点，但是前两点我们也不能忽视。

对于上面的影响，我们分别来谈谈解决对策。

### 共享cookie

对于域名完全不同的两个网站，共享cookie是绝对不行的。但如果我们两个网页一级域名相同，二级域名不同，该如何引用cookie呢？

其实浏览器在这里帮我们了一个大忙，对于这种情况，我们可以通过`document.domain`共享 Cookie。
举例来说，A网页是`http://w1.example.com/a.html`，B网页是`http://w2.example.com/b.html`，那么只要设置相同的document.domain，两个网页就可以共享Cookie。
```js
document.domain = 'example.com';
```
除此之外，服务器也可以在设置Cookie的时候，指定Cookie的所属域名为一级域名，比如.example.com。

```js
Set-Cookie: key=value; domain=.example.com; path=/
```

那对于最常用Ajax请求，不用多说，我们可以如下的办法：

### JSONP

虽然说浏览器里有着同源策略，但是聪明的你一定发现也有特殊情况。是的，在带有src属性的html标签中，如`script`,`link`,`img`，是不遵循同源限制的。所以JSONP就是巧妙的利用js在DOM中动态生成scritp元素，并将数据以回调函数的形式发送出去，来实现了不同源的ajax请求发送。具体的代码如图；

```js
function jsonpHandler(req) {
  var element = document.createElement('script');
  element.setAttribute("type","text/javascript");
  element.setAttribute("src",req.url + '?callback=' + req.callback));
  document.body.appendChild(element);
}

function hello(res){
    alert('hello ' + res.data);
}

//use jsonpHandler
jsonpHandler({
  url：'www.baidu.com',
  callback: hello,
})
```
通过这个简单的示例，也应该可以看出来jsonp有一个明显的不足，那就是只能用于get请求。为了满足各类http方法，W3C协议又出了个新的规范

### CORS协议

首先要明确一点就是，CORS需要浏览器和服务器同时支持。整个CORS通信过程，都是浏览器自动完成，不需要用户参与。此，实现CORS通信的关键是服务器。只要服务器实现了CORS接口，就可以跨源通信。

CORS协议把请求分为了两类，一类是简单请求，一类的是非简单请求，两者的处理方式是不同的，一般来说，简单请求需要同时满足以下两大条件：
- 请求方法是以下三种： HEAD，GET， POST
- 头信息不超出以下几种字段：
    - Accept
    - Accept-Language
    - Content-Language
    - Last-Event-ID
    - Content-Type

#### 简单请求
对于简单请求的处理，就是浏览器会自动在头信息之中增加一个`Origin`字段，然后发送出去。
然后如果`Origin`指定的源不在许可范围内，服务器会返回一个正常的HTTP回应。浏览器发现回应的信息里没有包含`Access-Control-Allow-Origin`字段，就会配出一个错误，然后被`XMLHttpRequest`的`onerror`回调函数捕获。一般来说，这样的错误无法通过状态码识别。

如果`Origin`指定的域名在许可范围内，服务器返回的响应会多出几个头信息字段
```json
Access-Control-Allow-Origin: http://api.bob.com
Access-Control-Allow-Credentials: true
Access-Control-Expose-Headers: FooBar
Content-Type: text/html; charset=utf-8
```

这几个以Access开头的字段都是什么意思呢？
- `Access-Control-Allow-Origin`: 必须字段，要么是请求的`Origin`字段值，要么是一个`*`
- `Access-Control-Allow-Credentials`:可选字段，表面是否允许发送Cookie，默认为false，即不能发送。为了允许发送，这个值需为`true`,同时开发者在浏览器中Ajax请求中设置`xhr.withCredentials = true;`
- `Access-Control-Expose-Headers`:可选字段，因为CROS简单请求只能拿到6个基本字段，想拿到其他字段就必须在这里指定，上面的例子就是可以返货`FooBar`字段

#### 非简单请求

非简单请求是那种对服务器有特殊要求的请求，比如请求方法是PUT或DELETE，或者Content-Type字段的类型是application/json。

非简单请求的CORS请求，会在正式通信之前，浏览器会增加一次HTTP查询请求，称为"预检"请求（preflight）。
浏览器先询问服务器，当前网页所在的域名是否在服务器的许可名单之中，以及可以使用哪些HTTP动词和头信息字段。只有得到肯定答复，浏览器才会发出正式的XMLHttpRequest请求，否则就报错。

下面是一个浏览器发现是非简单请求后自动发出`预检`头信息
```js
OPTIONS /cors HTTP/1.1
Origin: http://api.bob.com
Access-Control-Request-Method: PUT
Access-Control-Request-Headers: X-Custom-Header
Host: api.alice.com
Accept-Language: en-US
Connection: keep-alive
User-Agent: Mozilla/5.0...
```
服务器收到"预检"请求以后，检查了Origin、Access-Control-Request-Method和Access-Control-Request-Headers字段以后，确认允许跨源请求，就可以做出回应。

```js

HTTP/1.1 200 OK
Date: Mon, 01 Dec 2008 01:15:39 GMT
Server: Apache/2.0.61 (Unix)
Access-Control-Allow-Origin: http://api.bob.com
Access-Control-Allow-Methods: GET, POST, PUT
Access-Control-Allow-Headers: X-Custom-Header
Content-Type: text/html; charset=utf-8
Content-Encoding: gzip
Content-Length: 0
Keep-Alive: timeout=2, max=100
Connection: Keep-Alive
Content-Type: text/plain
```

如果浏览器否定了"预检"请求，会返回一个正常的HTTP回应，但是没有任何`CORS`相关的头信息字段。这时，浏览器就会认定，服务器不同意预检请求，因此触发一个错误，被XMLHttpRequest对象的`onerror`回调函数捕获。控制台会打印出如下的报错信息。
```
XMLHttpRequest cannot load http://api.alice.com.
Origin http://api.bob.com is not allowed by Access-Control-Allow-Origin.
```

一旦服务器通过了"预检"请求，以后每次浏览器正常的CORS请求，就都跟简单请求一样，会有一个Origin头信息字段。服务器的回应，也都会有一个Access-Control-Allow-Origin头信息字段

## ajax的核心思想
ajax思想的核心在不重新加载页面的情况下，利用js发送http请求，从而达到与服务器通信的目的。那实现过程是什么呢？是通过师兄XMLHttpRequest对象，通过这个xhr对象，可以发送以及接受各种格式的信息，包括json，xml，html，甚至文本文件，而且还可以选择是异步还是同步实现。那如果让我去写一个js的原生ajax请求，也是一个很简单的事情。

如果需要将ajax和promise合并使用，只需要一些轻微的改变就可以

```js
ajax({method:'get',url:'http://localhost:3000'}).then((data) =>{
  console.log('success get data',data);
}).catch((err) => {
  console.log('failed to get data',err);
})

function ajax(data) {
  const url = data.url, method = data.method;
  let promise = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.onreadystatechange = function() {
      if(xhr.readyState === 4) {
        if(xhr.status === 200) {
        resolve(xhr.responseText);
        }
        else{
          reject(new Error(xhr.statusText));
        }
      }
    };
  })
  return promise
}

```
上次被问到的关于XMLHttpRequest的状态，从0到4发生的变化：
- 0 请求未初始化
- 1 服务器连接已建立
- 2 请求已接受
- 3 请求处理中
- 4 请求已完成，且响应已经就绪

## Cookie和Session区别？


首先来说说cookie和session，cookie是存储在浏览器上的一小段数据，用来记录某些当页面关闭或者刷新后仍然需要记录的信息。在控制台用 「document.cookie」查看你当前正在浏览的网站的cookie。每次网络请求 Request headers 中都会带上cookie。所以如果 cookie 太多太大对传输效率会有影响。

而session是一个服务器端的概念，用来记录一些用户的状态。当一个用户打开淘宝登录后，刷新浏览器仍然展示登录状态。服务器如何分辨这次发起请求的用户是刚才登录过的用户呢？这里就使用了session保存状态。
- 用户在输入用户名密码提交给服务端，服务端验证通过后会创建一个session用于记录用户的相关信息，这个 session 可保存在服务器内存中，也可保存在数据库中。
- 创建session后，会把关联的session_id 通过setCookie 添加到http响应头部中。
浏览器在加载页面时发现响应头部有 set-cookie字段，就把这个cookie 种到浏览器指定域名下。
- 当下次刷新页面时，发送的请求会带上这条cookie， 服务端在接收到后根据这个session_id来识别用户。

所以说，cookie 是存储在浏览器里的一小段「数据」，而session是一种让服务器能识别某个用户的「机制」，session 在实现的过程中需要使用cookie。 二者不是同一维度的东西。

既然提到了cookie，我们不妨再去多说几句cookie的常见坑。

- 一个set-cookie只能设置一个cookie， 当想要设置多个cookie的时候，需要添加同样多的set-Cookie字段
-  用js设置cookie时，只需用`document.cookie = "name = John"`,如果需要设置多个，不能写在一起
- 修改cookie：要想修改一个cookie，只需要重新赋值就行，旧的值会被新的值覆盖。但要注意一点，在设置新cookie时，path/domain这几个选项一定要旧cookie保持一样。否则不会修改旧值，而是添加了一个新的 cookie。

## HTTP报文分析
HTTP报文分为HTTP请求报文和HTTP响应报文。通常来说，报文由三部分组成：报文首部 + 空行 + 报文主体。
报文首部中，根据报文类型分为两个版本。
- 请求报文： 请求行 + 请求首部字段 + 通用首部字段 + 实体首部字段
- 响应报文： 状态行 + 响应首部字段 + 通用首部字段 + 实体首部字段

下面让我们分别来看看基本的字段名：
### 通用首部字段：
- ##### Cache-Control 指定缓存的工作机制
  - public：其他用户也可以利用缓存
  - private：只以特定的用户作为对象
  - no-cache：防止从缓存中返回过期的资源
  - no-store：不缓存请求或相应的任何内容
  - max-age = [秒]：相应的最大缓存时间
  - max-stale=[秒]：可指缓存资源即使过期也照常接受
  - min-frame=[秒]：要求缓存服务返回至少还未过指定时间的缓存
  - only-if-cached： 从缓存获取资源

- ##### Connection： 逐条首部，连接的管理
  - keep-alive 持久连接（http1.1默认）
  - close 断开链接
- ##### Trailer：事先说明在报文主题后记录了哪些首部字段
- ##### Transfer-Encoding：规定传输报文主体的编码方式
- ##### Via：代理服务器相关信息
- ##### Warning：错误通知
- ##### Pragma：只用在客户端放松的请求中，求所有的中间服务不返回缓存的资源，和cache-control配合使用

### 请求首部字段：
- ##### Accept: 用户处理可处理的媒体信息
- ##### Accept-Charset：优先的字符集
- ##### Accept-Encoding：优先的内容编码
- ##### Accept-Language：优先自然语言
- ##### Authorization： Web认证信息
- ##### Expect：期待服务器的特定行为
- ##### Host：请求资源所在服务器
- ##### If-Match：比较实体标记（ETag）
- ##### If-Node-Match： If-None-Match字段值与ETag值不一样时，可处理该请求
- ##### If-Range：
- ##### If-Modified-Sience：比较资源的更新时间
- ##### Referer：对请求中URI的原始获取方
- ##### User-Agent：HTTP客户端程序的信息
- ##### cookie：客户端的cookie信息

### 响应首部字段：

- ##### Accept-Ranges：是否接受字节范围请求
- ##### Age：能告知客户端，源服务器在多久前创建了相应
- ##### ETag：资源的匹配信息
- ##### Location：令客户端重定向至指定URI，和3XX状态码使用
- ##### Set-Cookie：
    - NAME=VALUE 赋予cookie的名称和其值
    - expires = DATE Cookie的有效期
    - path=PATH 将服务器上的文件目录作为Cookie的使用对象
    - domain=域名   作为Cookie使用对象的域名
    - Secure  尽在HTTPS安全通信时才会发送Cookie
    - HTTPOnly 加以限制, 使Cookie不能被Javascript脚本访问

### 实体首部字段
- ##### Allow 通知客户端能支持的所有HTTP方法
- ##### Content-Langu 告知客户端实体主图使用的自然原因
- ##### Content-Length 表明实体主体部分的大小

## 浏览器缓存

上面的几个字段中列出了不少和缓存有关的知识，我们再来仔细分析一下浏览器中的缓存。

服务器通过在响应中插入指定的头部来告诉浏览器需要做的缓存操作，这些头部包括：Expires，Cache-Control,Last-Modified.If-Modified-Since,Etag。

### Expires
该头部字段会制定一定绝对的过期时间，再这个时间之前，浏览器都不会向服务器去请求。但是因为服务器端时间浏览器时间经常出现不一致的情况，我们基本上不使用这个头部。

### Cache-Control
它定义了一个文档从第一次生成开始到不再新鲜、无法使用为止的最长使用期，并且以秒为单位。用法如下所示：
```
Cache-Control: max-age=484200
```
这个响应头告诉了浏览器，在第一次响应后的484200秒里，如果再次请求资源时，不需要再次向服务器发起请求，而是直接使用缓存。


### Last-Modified
该头部配合cache-control使用，它标志了资源的最后修改时间，即服务器在响应中回带有一个Last-Modified的头部，告诉浏览器该资源的最后修改时间。

我们知道，在第一次请求页面时，会通过cache-control的指示缓存资源，同时会设置资源的Last-Modified时间。
当再一次请求页面的资源时，根据max-age指定的时间，在这个时间期间，每次向服务器获取资源时，会直接获取缓存内容，并且响应码为200 OK(from cache)。

若资源已经过期，则会向服务器发起请求，此时请求中会带上If-Modified-Since请求头，值为Last-Modified的值。

服务器收到If-Modified-Since的请求头，此时服务器将根据该字段的值进行一定的逻辑判断。
如果资源没有变更，则返回304告知浏览器直接使用缓存。
如果资源已经变更，则返回最新的资源，并且响应码为200，还会发送最新的Last-Modified字段。
若响应包中Cache-Control:max-age 或 Expires 字段，则会重新设置缓存的过期时间，于是，浏览器又可以不需要向服务器发起请求了。

## Etag

该头部和Last-Modified的作用类似，区别我们待会再说。先来看看它的使用方式。

同样的，在第一次请求页面资源，会缓存页面，设置缓存时间，此时若服务器返回了Etag字段，浏览器则会保存Etag的字段和值。这个值是个特殊串，大概是像这样的值，“x123cef”。
Apache中，ETag的值，默认是对文件的索引节（INode），大小（Size）和最后修改时间（MTime）进行Hash后得到的。当然我们可以更改这种算法，例如使用MD5。

当资源过期时，在对服务器发起的请求头中会带有一个If-None-Match的请求头，值为Etag的值。

服务器收到If-None-Match的值，同样的会将本地资源的校验值和If-None-Match的值进行比对。
相同，说明资源没有更改，返回304。
不同，说明资源已经更改，返回最新资源，响应码为200，并带有最新的Etag值。

若同时使用了Last-Modified和Etag，只要有一方认为资源没有变动，就会进行304响应

Last-Modifed 和 Etag 的区别
1. 首先Last-Modified只能精确到秒，有些时候，文件会在1秒内被更改很多次，使用Last-Modified则无法准确的标志文件的更改时间。
2. 有时会定时生成一些文件，但是内容是不变的，或者仅仅修改变动的时间，此时我们并希望浏览器还是使用缓存的资源，Last-Modified则无法满足我们了。
3. Etag是服务器或者开发者生成的一个唯一特殊标志值，可以更加有效的控制缓存。资源变更则更新该值，没有变更则不更新该值，简洁粗暴



## 引用
[浏览器缓存解析](https://github.com/zhengweikeng/blog/issues/5)
[跨域资源共享 CORS 详解](跨域资源共享 CORS 详解)
[简析TCP的三次握手与四次分手](http://www.jellythink.com/archives/705)
