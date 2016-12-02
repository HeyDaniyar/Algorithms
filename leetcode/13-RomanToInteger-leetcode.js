/**
 * @param {string} s
 * @return {number}
 */

//mine solution
//which didn't consider some special format can also be added into convert function
var romanToInt = function(s) {
  var result = 0,
    arr = s.split(''),
    len = arr.length;
  for (var i = 0; i < len; i++) {
    var num = convert(arr[i]);
    if (i < len - 1) {
      var numNext = convert(arr[i + 1]);
      if (numNext > num) num = -num;
    }
    result += num;
  }
  console.log(result)
  return result;
};

function convert(str) {
  switch (str) {
    case 'I':
      return 1;
    case 'V':
      return 5;
    case 'X':
      return 10;
    case 'L':
      return 50;
    case 'C':
      return 100;
    case 'D':
      return 500;
    case 'M':
      return 1000;
  }
}
//better solution
var romanToInt = function(s) {
  // I(1), V(5), X(10), L(50), C(100), D(500), M(1000)
  // IV(4), IX(9), XL(40), XC(90), CD(400), CM(900)
  let ans = 0;
  for (let i = 0; i < s.length; i++) {
    //check special rules that require lookahead
    switch (s[i] + s[i + 1]) {
      case 'IV':
        ans += 4;
        i++;
        break;
      case 'IX':
        ans += 9;
        i++;
        break;
      case 'XL':
        ans += 40;
        i++;
        break;
      case 'XC':
        ans += 90;
        i++;
        break;
      case 'CD':
        ans += 400;
        i++;
        break;
      case 'CM':
        ans += 900;
        i++;
        break;
        // by default, switch over current ith char
      default:
        switch (s[i]) {
          case 'I':
            ans += 1;
            break;
          case 'V':
            ans += 5;
            break;
          case 'X':
            ans += 10;
            break;
          case 'L':
            ans += 50;
            break;
          case 'C':
            ans += 100;
            break;
          case 'D':
            ans += 500;
            break;
          case 'M':
            ans += 1000;
            break;
        }
    }
  }
  return ans;
};
