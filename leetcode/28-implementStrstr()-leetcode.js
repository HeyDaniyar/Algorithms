/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function(haystack, needle) {
  if (!needle) return 0;
  var len = needle.length;
  for (var i = 0; i < haystack.length; i++) {
    var temp = haystack.slice(i, i + len);
    if (temp === needle) return i
  }
  return -1;
};

// 看到discuss里很多人有用很复杂的问题去解题，
// 没有很明白为什么这道题会需要那么复杂的解法？是我误解了题本意吗？

//后来经过查找资料发现 原来这道题就是大名鼎鼎的kmp算法实现的；
//特此恶补了一下关于Kmp的知识，深深的觉得自己too yough too simple

var strStr = function(haystack, needle) {
  var m = haystack.length,
    n = needle.length;
  if (!n) return 0;
  var lps = kmpProcess(needle);
  console.log('lps', lps)
  for (var i = 0, j = 0; i < m;) {
    if (haystack[i] == needle[j]) {
      i++, j++;
    }
    if (j == n) return i - j;
    if (i < m && haystack[i] != needle[j]) {
      if (j) j = lps[j - 1];
      else i++;
    }

  }
  return -1;
};

var kmpProcess = function(needle) {
  var n = needle.length;
  var lps = new Array(n).fill(0);
  for (var i = 1, length = 0; i < n;) {
    if (needle[i] === needle[length]) {
      length++;
      lps[i] = length;
      i++;
    } else if (length) length = lps[length - 1];
    else {
      lps[i] = 0;
      i++;
    }
  }
  return lps;
}
