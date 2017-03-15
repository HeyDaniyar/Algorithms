# Description

Given a string s, partition s such that every substring of the partition is a palindrome.

Return the minimum cuts needed for a palindrome partitioning of s.

For example, given s = "aab", Return 1 since the palindrome partitioning ["aa","b"] could be produced using 1 cut.

# Solution

印度哥的经典方法，但是似乎时间复杂度比较大，不能再leetcode顺利AC

```javascript
/**
 * @param {string} s
 * @return {number}
 */
var minCut = function(s) {
    const len = s.length;
    if(len < 1) return -1
    if(isPalindrom(s)) return 0
    let dp = [];

    s.split('').forEach((char,index) => {
        dp[index] = [];
        dp[index][index] = 0;
    });

    for(let l = 2; l <= len; l++) {
        for(let i = 0; i+l <= len; i++) {
            const current = s.substring(i,i+l);
            if( isPalindrom(current) ) {
                dp[i][i+l-1] = 0;
            }else{
                let min = Number.MAX_VALUE, k = 0;
                while(k < l-1) {
                    const temp = dp[i][i+k] + dp[i+k+1][i+l-1];
                    if(temp < min) min = temp;
                    k++;
                }
                dp[i][i+l-1] = min + 1;
            }
        }
    }
    return dp[0].slice(-1)[0]
};

function isPalindrom(s) {
    const currentLen = s.length;
    if(currentLen === 1) return true
    for(let i = 0; i < currentLen/2; i++) {
        if(s[i] !== s[currentLen-i-1]) return false
    }
    return true
}
```

#### 解法二：

这个解法太难想了😰😰😰😰😰😰
思路如下:

Calculate and maintain 2 DP states:
+  `pal[i][j`] , which is whether `s[i..j] `forms a pal
+  `d[i]`, which is the minCut for `s[i..n-1]`

Once we comes to a `pal[i][j]==true`:

- `if j==n-1`, the string `s[i..n-1]` is a Pal, minCut is` 0 `, `d[i]=0`;
- else: the current cut num (first cut `s[i..j]` and then cut the rest
`s[j+1...n-1])` is `1+d[j+1]`, compare it to the exisiting minCut num
d[i], repalce if smaller.


**d[0]** is the answer.


```javascript
/**
 * @param {string} s
 * @return {number}
 */
var minCut = function(s) {
    const len = s.length;
    if(len < 1) return -1
    let dp = [], pal = [];
    for(let i = 0; i< len; i++) {
        pal[i] = [];
    }
    for(let i = len-1; i >= 0; i--) {
        dp[i] = len-i-1;
        for(let j = i; j < len; j++) {
            if(s[i] === s[j] && (j-i<2 || pal[i+1][j-1])) {
                pal[i][j] = true;
                if(j === len-1) dp[i] = 0
                else if (dp[j+1] + 1 < dp[i])  dp[i] = dp[j+1] + 1
            }
        }
    }
    return dp[0]
};
```
