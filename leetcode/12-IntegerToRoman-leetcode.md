>这是一个测试。感觉用这个鞋文章会更方便的样子。

首先，有一个比较简便的方法是列举所有的特殊组合，再根据每位数字上的大小再用map的方法一一对应。 但是我觉得这个有点不方便，所以我就决定用最简便的罗马组合，加上每个罗马字符的前一位和后一位，从而达到具体的进位。

```javascript
/**
 * @param {number} num
 * @return {string}
 */
var intToRoman = function(num) {
    let numArr = num.toString().split(''), result = [];
    const len = numArr.length;
    const romanObj = {
        0:{value:'V',before:'I',after:'X'},
        1:{value:'L',before:'X',after:'C'},
        2:{value:'D',before:'C',after:'M'},
        3:{value:'',before:'M',after:''},
    };

    for(let i = 0; i < len; i++) {
        let times = len - i - 1, currentNum = numArr[i]*1;
        if(currentNum === 4) result.push(romanObj[times].before + romanObj[times].value);
        if(currentNum === 5 ) result.push(romanObj[times].value);
        if(currentNum === 9 ) result.push(romanObj[times].before + romanObj[times].after);
        if(currentNum < 4) {
            while(currentNum > 0) {
                result.push(romanObj[times].before);
                currentNum --;
            }
        }
        if(currentNum > 5 && currentNum < 9) {
            result.push(romanObj[times].value);
            while(currentNum - 5 > 0) {
                result.push(romanObj[times].before);
                currentNum --;
            }
        }
    }
    result = result.join('');
    return result;
};
```
整体略显麻烦，尤其是for循环内部，不过实现了用最基本的罗马数字组合来表示进位。
翻看了一下答案，基本上都是用引用"IV，CD"等特殊组合。
但这个解法让我眼前一亮：
```javascript
/**
 * @param {number} num
 * @return {string}
 */
// var intToRoman = function(num) {
//    const M = ["", "M", "MM", "MMM"];
//    const C = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"];
//    const X = ["", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"];
//    const I = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];
//    return M[num/1000] + C[(num%1000)/100] + X[(num%100)/10] + I[num%10];
// };
```
