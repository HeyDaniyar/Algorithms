不知道这样的题为什么会出现在medium里，
应该是为了寻找更多优秀的解法把。
总之题很简单，稍微要考虑的就是空格的情况。

```JavaScript
/**
 * @param {string} str
 * @returns {string}
 */
var reverseWords = function(str) {
    var arr = str.split(' '),result = [], len = arr.length;
    for(var i = len-1; i >= 0; i--) {
        //in case the 空格
        if(arr[i]) result.push(arr[i]);
    }
    return result.join(' ');
};

//看discuss发现trim是个神奇的内置方法
var reverseWords = function(str) {
  return str.trim().split(/\s+/).reverse().join(' ');
}


```  
