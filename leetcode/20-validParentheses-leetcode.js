/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
  var len = s.length,
    tmp = [];
  if (len < 1 || len % 2 !== 0) return false;

  var map = {
    '[': ']',
    '{': '}',
    '(': ')',
    ']': false,
    '}': false,
    ')': false,
  };

  for (var i = 0; i < len; i++) {
    if (map[s[i]]) tmp.push(s[i])
    else if (map[tmp.pop()] !== s[i]) return false
  }

  if (tmp.length > 0) return false;
  return true;
};

//根本没有想到hashmnap和入站出站的方法
