/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
  var length = strs.length;
  if (length === 0) return '';
  if (length === 1) return strs[0];

  var prefix = '';
  var first = strs[0];
  for (var i = 0; i < first.length; i++) {
    for (j = 1; j < length; j++) {
      var temp = strs[j];
      if (!temp || temp[i] !== first[i]) return prefix;
    }
    prefix += first[i];
  }
  return prefix;

};


//better solution
var longestCommonPrefix = function(strs) {
  'use strict';
  if (strs === undefined || strs.length === 0) {
    return '';
  }

  return strs.reduce((prev, next) => {
    let i = 0;
    while (prev[i] && next[i] && prev[i] === next[i]) i++;
    return prev.slice(0, i);
  });
};

//遇到累加问题需第一个想到js的reduce方法！！！！
