Tags: String

很简单的一道题，
分析一下便知道去掉空格返回新数组的长度即可

直接上代码：
```js
/**
 * @param {string} s
 * @return {number}
 */
var countSegments = function(s) {
    var temp = s.split(' ');
    var result = temp.filter(function(item){
        return item !=='';
    })
    return result.length;
};
```
