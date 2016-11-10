/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function(s, numRows) {
  let text = Array(numRows).fill('');
  let line = 0;
  const keyLoop = 2 * numRows - 2;

  if (keyLoop === 0 || s.length <= numRows) {
    return s;
  }

  for (let i = 0; i < s.length; i++) {
    line = i % keyLoop;
    line = line > (numRows - 1) ? (keyLoop - line) : line;

    text[line] += s[i];
  }

  return text.join("");

};
