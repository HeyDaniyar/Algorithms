这道题虽然是个medium题，但是我觉得并没有考察太多逻辑上的点，
而是在测试你的正则使用能力，如果正则使用到位，那ipv4和v6的特点很容易表示，
然后我们只需要判断每个以‘.’或者‘:’split分割的item是不是满足你所写的正则匹配。

一旦出现不满足的情况，那就立即return ‘Neither’；

直接上代码：

```javaScript
/**
 * @param {string} IP
 * @return {string}
 */
var validIPAddress = function(IP) {
     var v4 = IP.split('.');
    var v6 = IP.split(':');

    if(v4.length === 4){
        var result = v4.every(function(item){
          //匹配单独的0 或者 从非0开头的数字；
            var re =/^0$|^[1-9][0-9]*$/;
            return  re.test(item) && parseInt(item) <= 255;
        });
        if(result) return 'IPv4';
    }

    if(v6.length === 8){
      var result = v6.every(function(item){
        //匹配A-F的大小写字母和数字
          var re = /^[A-Fa-f0-9]+$/;
          return re.test(item) && item.length <= 4;
      });
      if(result) return 'IPv6';
    }

    return 'Neither';
};
```
