###Description
Given a string which consists of lowercase or uppercase letters, find the length of the longest palindromes that can be built with those letters.

This is case sensitive, for example "Aa" is not considered a palindrome here.

####note
Assume the length of given string will not exceed 1,010.

#### Example
```
input:
"abccccdd"
Output:7
Explanation:
One longest palindrome that can be built is "dccaccd", whose length is 7.
```

### Solution
很基础的一道hash题目，要注意的是最大长度不仅仅是每个letter出现的偶数次数加1;还要考虑完全没有奇数的情况。比如说`bb`,最大长度就是2;

```js
/**
 * @param {string} s
 * @return {number}
 */
var longestPalindrome = function(s) {
    const map = {};
    let result = 0, hasOdd = 0;
    s.split('').forEach((item) => {
        map[item] ? map[item] ++ : map[item]=1
    })
    Object.values(map).forEach((item) =>{
        if(item % 2 == 0) result += item
        else {
            hasOdd = 1;
            result += item - 1
        }
    })
    return result + hasOdd;
};
```
