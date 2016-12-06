/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLastWord = function(s) {
  if (!s) return 0;
  var temp = s.split(' '),
    i = 1;
  while (i < temp.length + 1) {
    var current = temp.slice(-i)[0];
    if (current) return current.length;
    i++;
  }
  return 0;
};
