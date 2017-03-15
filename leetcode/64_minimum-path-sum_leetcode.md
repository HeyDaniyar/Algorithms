## Description
Given a m x n grid filled with non-negative numbers, find a path from top left to bottom right which minimizes the sum of all numbers along its path.

Note: You can only move either down or right at any point in time.



## Solution

很简单的一道动态规划题，只需要找到公式`dp[i][j] = Math.min(dp[i-1][j],dp[i][j-1]])`就可以轻易求解，不过要注意一些边界值，比如说到达第一行和第一列的时候，需要单独判断。


```js
/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function(grid) {
   const row = grid.length;
   if(row < 1 ) return 0

   let dp = [], i , j;
   for(i = 0; i < grid.length; i++) {
       const row = grid[i];
       dp[i] = [];
       for(j = 0; j < row.length; j++) {
         const current = grid[i][j];
         if(i === 0 && j === 0) dp[i][j] = current
         else if(j === 0) dp[i][j] = dp[i-1][j] + current
         else if (i === 0) dp[i][j] = dp[i][j-1] + current
         else if(i > 0 && j > 0) dp[i][j] = Math.min(dp[i-1][j],dp[i][j-1]) + current;
        }
   }
   console.log('dp',dp)
   return dp[i-1][j-1]

};
```
