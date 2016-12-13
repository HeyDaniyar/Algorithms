如果熟练使用正则，估计五十秒内应该可以解决，逻辑完全不复杂。
然而对于正则白痴的我，再几番测试之后才能accept。
看来正则必须得好好花时间去学习了。

```JavaScript
/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function(s) {
    var re = /[\w]/gi;
    s = s.toLocaleLowerCase().match(re);
    if(!s) return true;
    for(var i = 0,j = s.length-1; i < s.length/2; i++,j--) {
        if(s[i] !== s[j]) return false
    }
    return true;
};
```
