## Solution 
```java
public class Solution {
    public int numIslands(char[][] grid) {
        if (grid == null || grid.length == 0) return 0;
        int m = grid.length, n = grid[0].length, count = 0;
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == '1') {
                    count++;
                    dfs(grid, i, j, m, n);
                }
            }
        }
        return count;
    }

    //O(m*n), can be optimized by making m and n static
    private void dfs(char[][] grid, int i, int j, int m, int n) {
        if (i < 0 || j < 0 || i >= m || j >= n || grid[i][j] == '0') return;
        grid[i][j] = '0';
        dfs(grid, i+1, j, m, n);
        dfs(grid, i, j+1, m, n);
        dfs(grid, i-1, j, m, n);
        dfs(grid, i, j-1, m, n);

    }
}
```

## Analysis 
This is a typical problem of DFS  
We need to increment `count` by one when we find '1' and then replace all its neighbors to '0'  
At first I was thinking if we replace a neighbor, the final result will be influenced  
For example, we changed a second row grid to '0' because of first row having '1'  
Then the third row '1' becomes a new island which should not   
DFS in this situation, perfectly solve the problem because it will replace all the neighbors one time  
