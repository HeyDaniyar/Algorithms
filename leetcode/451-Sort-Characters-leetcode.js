/**
 * @param {string} s
 * @return {string}
 */
var frequencySort = function(s) {
  let strArr = s.split('');
  let dict = {};
  strArr.forEach((str) => {
    if (dict[str]) dict[str]++;
    else dict[str] = 1;
  });
  strArr.sort((a, b) => {
    let countDif = dict[b] - dict[a];
    if (!countDif) return a.charCodeAt(0) - b.charCodeAt(0);
    else return countDif;
  });
  return strArr.join('');
};
