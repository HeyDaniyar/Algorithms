## Solution 
DP original solution with 2D array 

```java
public class Solution {
    public int minPathSum(int[][] grid) {
        int m = grid.length, n = grid[0].length;
        int[][] dp = new int[m][n];
        for(int i = 0; i < m; i++) {
            for(int j = 0; j < n; j++) {
                if(i == 0 && j == 0) dp[i][j] = grid[i][j]; //Set up initial state 
                else if(i == 0) dp[i][j] = dp[i][j-1] + grid[i][j]; //Set up boundary state, just columns
                else if(j == 0) dp[i][j] = dp[i-1][j] + grid[i][j]; //Set up boundary state, just rows
                else dp[i][j] = Math.min(dp[i-1][j], dp[i][j-1]) + grid[i][j]; //Update state equation 
            }
        }
        return dp[i-1][j-1];
    }
}
```
----
Optimized DP solution using 1D array 

```java
public class Solution {
    public int minPathSum(int[][] grid) {
        int m = grid.length, n = grid[0].length;
        int[] dp = new int[m];
        dp[0] = grid[0][0];
        for(int i = 1; i < m; i++) dp[i] = dp[i-1] + grid[i][0];
        for(int j = 1; j < n; j++) {
            dp[0] += grid[0][j];
            for(int i = 1; i < m; i++) dp[i] = Math.min(dp[i], dp[i-1]) + grid[i][j];
        }
        return dp[m-1];
    }
}
```

## Analysis 
*DP solution is really a pain in my ass. However, after doing this problem, I kind of feel that there is some regular pattern in DP solutions.*

In the first solution, we use typical idea in DP problems. To find out the minimum path from given `grid`, we need to create a matrix `dp`, where `dp[i][j]` represents the minimum path sum at the point `grid[i][j]`. The most important step in DP solution is to figure out the **state equation**. To do that, let's think of how we get `dp[i][j]` each time exactly. Since the problem requires the path can be only moved left or right at a time, we know that `dp[i][j]` can be either getting from left or top (whichever is smaller) and adding the current num `grid[i][j]`. Hence the equation should be `dp[i][j] = min(dp[i][j-1], dp[i-1][j]) + grid[i][j]`. Secondly,we need to consider about boundary state. It's clear that `i` and `j` from above equation cannot be 0. Just imagine how to update the matrix if there is only rows (j==0) or columns (i==0). Therefore, the first three `if else` statements are for setting up the boundary state, including the initial state `dp[0][0]`. At the end, we just need to return the last entry from matrix, and boom, we solved this problem in DP! Yay~ 😎

When it comes to optimize the solution, just thinking what we need in each step while updating the matrix. We only check the left and top positions from given `grid`. As a result, there is no need to maintain the whole matrix. We create a 1D array, with length of `m`. Just imagine the array is a moving column(not real column from the grid). We first init the array in the same way as we did in solution 1 when `j==0`. After that, we loop starting from the column. Each time we update `dp[0]` by adding `grid[0][j]`, because of moving to a new column. Then we we loop the rows, we won't update `dp[i]` if the number below is bigger, where `dp[i] < dp[i-1]`. Since every time we update the `dp[0]` after we finish the inner loop, we are good to go. At the end, just return the last number in the array as usual. 


