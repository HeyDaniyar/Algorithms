## Description
Given a positive integer n, find the least number of perfect square numbers (for example, 1, 4, 9, 16, ...) which sum to n.

For example, given n = 12, return 3 because 12 = 4 + 4 + 4; given n = 13, return 2 because 13 = 4 + 9.


## Solution

首先，这是一道做了半天苦苦找不到答案但是看了答案能拍案叫绝的题目。
这道题考察的是动态规划的思想，如果把1到10数字perfer square number 列举出来，我们不难发现DP的
规律，即对于一个`i+j*j`的n，有着`dp[i+j*j] = 1 + dp[i]`。

怎么理解呢？`j*j`表示j是个square number，我们只需要知道当n=i时候最合适的square number，用它来加上当前的`square number（j*j）`即可。

比如对于`n = 14`，我们可以转换成 `n = 9 + 5`，9是square number 所以我们只需要需要求出dp[5]再次基础上加1，就是dp[14]的值。

然而`n = 14`,不仅可以换算成`n = 9+5`， 还能写成`n = 4 +10`, 所以我们得不断的获取dp[i]的最小值，实现的办法就是通过两个for循环，不断的取Math.min()的结果。

以上就是核心思想,代码的具体思路如下：

```js
/**
 * @param {number} n
 * @return {number}
 */
var numSquares = function(n) {
    let dp = [];
    //首先给 dp中设定初始值
    for(let i = 0; i<=n; i++) dp[i] = Number.MAX_VALUE;
    // 将n = squear number的dp统统设为1
    for(let i = 0; i*i <=n; i++) dp[i*i] = 1;
    // 开始上述提到的核心遍历思想
    for(let i = 0; i <= n; i++) {
        for(let j = 0; i + j*j <=n; j++) {
            dp[i + j*j] = Math.min(dp[i] + 1, dp[i+j*j]);
        }
    }
    return dp[n];
};

```
