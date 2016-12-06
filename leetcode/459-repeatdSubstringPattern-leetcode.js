/**
 * @param {string} str
 * @return {boolean}
 */

/*这是我第一个解法，因为初步的判断只要前缀和后缀有相等情况，就说明这个循环单词肯定是前缀或者后缀；
  基于这个理论变着急的开始写代码，并没有去好好验证；
  然后实际上，例如：aababaab"这个例子就是最好的打脸；
\*/
var repeatedSubstringPattern = function(str) {
  var prefix = '',
    suffix = '',
    len = str.length;
  if (len < 2) return false;
  for (var i = 0; i < len / 2; i++) {
    prefix += str[i], suffix = str[len - 1 - i] + suffix;
    if (prefix === suffix) {
      var l = suffix.length,
        n = len / l,
        result = '';
      if (len % l === 0) {
        for (var j = 0; j < n; j++) result += suffix;
        if (result === str) return true
      }
      return false;
    }
  }
  return false;
};


//看了discuss之后摸索出来的第二条解法：
/**
 * @param {string} str
 * @return {boolean}
 */
var repeatedSubstringPattern = function(str) {
  var len = str.length;
  for (var i = parseInt(len / 2); i > 0; i--) {
    if (len % i === 0) {
      var n = len / i,
        prefix = str.substring(0, i),
        temp = '';
      for (var j = 0; j < n; j++) {
        temp += prefix;
      }
      if (temp === str) return true
    }
  }
  return false;
};

//可是这种解法好像效率有点慢；尤其是在第二个for循环中，我们不需要一直等待最后temp的结果；
//只要发现temp和str的相同位数不一样，我们就可以认为返回false
//所以再做一点改动

var repeatedSubstringPattern = function(str) {
  var len = str.length;
  for (var i = parseInt(len / 2); i > 0; i--) {
    if (len % i === 0) {
      var n = len / i,
        prefix = str.substring(0, i),
        temp = '';
      for (var j = 1; j < n; j++) {
        //让perfix分别和str的部分片段比较；
        //如果不同则变跳出循环改变i继续比较；
        if (prefix !== str.substing(j * i, i + j * i)) break;
      }
      if (j === m) return true
    }
  }
  return false;
};
