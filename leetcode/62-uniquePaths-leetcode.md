## Description

A robot is located at the top-left corner of a m x n grid (marked 'Start' in the diagram below).

The robot can only move either down or right at any point in time. The robot is trying to reach the bottom-right corner of the grid (marked 'Finish' in the diagram below).

How many possible unique paths are there?


## Solution

### 第一个解法：

很明显是一道动态规划的题目。

通过题目分析，我们可以得出对于m*n型的棋盘，有多少种路线到达【m,n】其实就等于有多种路线到达【m-1,n】加上有多少种路线到达【m, n-1】;
所以如果设D(m,n)为到达【m,n】点的所有线路，那动态方程即
$$ D(m,n) = D(m-1,n) + D(m,n-1) $$

虽然把动态方程写出来了，我们还需要用一个较好的方法用代码去实现。其实这个方法的突破口就是构造一个二维数组。
仔细观察，是不是在一个棋盘上，只有第一行和第一列的每格只有一种路线到达？因为机器人只能往下走或者往右走，所以我们可以先构造出一个第一行和第一列全为1的二维数组，然后在求其他格子的最短路线时，直接用我们上面的动态方程得出。

具体代码如下：

```js
/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function(m, n) {
    let map = [];
    for(let i = 0; i < m; i++) {
        map[i] = [];
        map[i][0] = 1;
    }
     for(let j = 0; j < n; j++) {
        map[0][j] = 1;
    }
    for(let i = 1; i <m; i++) {
        for(let j = 1; j <n; j++) {
           map[i][j] = map[i-1][j]+map[i][j-1];
        }
    }
    return map[m-1][n-1];
};
```
### 第二个解法
在看程序员面试白皮书的时候，又看到这个题，才发现自己原来的解法是多么繁琐。仔细观察可以发现这道题完全不需要维护一个二维数组结构，因为对于每一个格，我们每次的map[i][j]其实就是就是他这一列的上方和左边的列，所以我们完全可以去维护两个列的array就可以达到同样的效果。
```js
var uniquePaths = function(m, n) {
    let cur = [],pre = [];
    for(let i = 0; i < m; i++) {
        cur[i] = 1;
        pre[i] = 1;
    }
    for(let i = 1; i <n; i++) {
        for(let j = 1; j <m; j++) {
          // cur[i-1]表示同一列的上方元素, pre[i]表示左一列
           cur[j] = cur[j-1] + pre[j];
           pre[j] = cur[j];
        }
    }
    return pre[m-1]
};
```

再继续优化，其实pre都不需要，因为他起到的作用就是表示左一列，我们完全可以用cur来代替。

```js
var uniquePaths = function(m, n) {
    if (m > n) return uniquePaths(n, m);
    let cur = [];
    for(let i = 0; i < m; i++) {
        cur[i] = 1;
    }
    for(let i = 1; i < n; i++) {
        for(let j = 1; j < m; j++) {
          // cur[i-1]表示同一列的上方元素, pre[i]表示左一列
           cur[j] += cur[j-1];
        }
    }
    return cur[m-1]
};
```
