## Description

Given a string s, find the longest palindromic substring in s. You may assume that the maximum length of s is 1000.

### Example:

```Input: "babad"

Output: "bab"

Note: "aba" is also a valid answer.

Example:

Input: "cbbd"

Output: "bb"

```

## Solution

这道题也不同的几个解法，因为在专供DP，所以最先开始的就是DP的思路，复杂度是`O(N^2)`,但是不知道为什么，这个解法不能成功被leetcode AC，对于特别大的相同数字无法通过。

```js
/**
 * @param {string}
 * @return {string}
 */
var longestPalindrome = function(s) {
    const len = s.length;
    if(len <= 1) return s

    let dp = [], maxStart = 0, maxEnd= 0;
    for(let i = 0; i < len; i++) {
        dp[i]  = [];
        dp[i][i] = 1;
    }
    for(let l = 1; l < len; l++) {
        for(let i = 0; i + l < len; i++) {
            const j = i + l;
            if( (dp[i+1][j-1] ===1 || l === 1) && s[i] === s[j]){
                dp[i][j] = 1;
                maxEnd = j;
                maxStart = i;
            }
            else {
                dp[i][j] = 0;
            }
        }
    }
    return s.substring(maxStart,maxEnd+1)
};
```
#### dp的单数组解法

```js
var longestPalindrome = function(s) {
  if(!s) return ''
   if(s.length === 1) return s
   let len = s.length, dp = [];
   for(let size = len ; size >= 1; size--) {
       for(let i = 0; i + size <= s.length; i++) {
          const current = s.substr(i,size);
          if(isPalindrome(current)) {
              return current
          }else{
              dp[size] = -1;
          }
       }
   }
  return s[0];
};

function isPalindrome(s) {
    if(s.length === 1) return true
    let i = 0, j = s.length -1;
    for(let i=0,j=line.length-1; i<j; i++,j--){  
       if(line.charAt(i) !== line.charAt(j)){  
           return false;  
       }  
     }  
    return true;   
}
```
还有一种解法前面没想到，后面看了discuss后发现这个解法思想更简单，就是以s中的某一个char为中心，向两边扩散，如果发现不符合满足条件即返回当前最大长度、
