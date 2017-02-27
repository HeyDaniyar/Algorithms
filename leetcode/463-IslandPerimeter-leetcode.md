>You are given a map in form of a two-dimensional integer grid where 1 represents land and 0 represents water. Grid cells are connected horizontally/vertically (not diagonally). The grid is completely surrounded by water, and there is exactly one island (i.e., one or more connected land cells). The island doesn't have "lakes" (water inside that isn't connected to the water around the island). One cell is a square with side length 1. The grid is rectangular, width and height don't exceed 100. Determine the perimeter of the island.

>Example:
[[0,1,0,0],
 [1,1,1,0],
 [0,1,0,0],
 [1,1,0,0]]
Answer: 16

虽然分类是在hashtable中，但是这道题根本没有用到hashtable的解法(也许是我的方法太低级😅)
两次循环，在第二次循环判断出四种每个方格上下左右的临界条件即可：

```js
/**
 * @param {number[][]} grid
 * @return {number}
 */
var islandPerimeter = function(grid) {
    let result = 0; 
    for(let i = 0; i < grid.length; i++) {
        for(let j = 0; j < grid[i].length; j++) {
            if(grid[i][j] ===1) {
                grid[i][j-1] ? result: result ++;
                grid[i][j+1] ? result: result ++;
                (grid[i-1] && grid[i-1][j]) ? result: result ++;
                (grid[i+1] && grid[i+1][j]) ? result: result ++;
            }
        }
    }
    return result;
};
```