一道很简单的字符串翻转的问题,10秒写完代码。
但是看了discuss才知道，人家原来不是比速度，是比写出了几个方法。

既然如此，那就来总结一下字符串翻转的方法：

### stack pop solution

``` JavaScript
var reverseString = function(s) {
    if(!s) return '';
    var stack = s.split(''), result = [], len = s.length;
    for(var i = 0; i < len; i++)  result.push(stack.pop());
    return result.join('');
};
```

### simplest solution
```JavaScript
var reverseString = function(s) {
  var result = '', len = s.length;
  for(var i = len - 1; i >= 0; i-- ) result += s.charAt(i);
  return result;
}
```

### build-in solution
``` JavaScript
var reverseString = function(s) {
  return s.split('').reverse().join('');
}
```
