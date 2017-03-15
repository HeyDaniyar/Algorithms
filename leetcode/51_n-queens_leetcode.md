## Description

The n-queens puzzle is the problem of placing n queens on an n×n chessboard such that no two queens attack each other.

Given an integer n, return all distinct solutions to the n-queens puzzle.

[N-queens]("http://articles.leetcode.com/wp-content/uploads/2012/03/8-queens.png")

Each solution contains a distinct board configuration of the n-queens' placement, where 'Q' and '.' both indicate a queen and an empty space respectively.

For example,
There exist two distinct solutions to the 4-queens puzzle:
```
[
 [".Q..",  // Solution 1
  "...Q",
  "Q...",
  "..Q."],

 ["..Q.",  // Solution 2
  "Q...",
  "...Q",
  ".Q.."]
]
```

## Solution

```js
/**
 * @param {number} n
 * @return {string[][]}
 */

var solveNQueens = function(n) {
    let positions = [], result = [];
    for(let i = 0; i < n; i++) {
        const position = new Position();
        positions.push(position);
    }
    solvNQuennsHelper(n, 0, positions, result);
    return result
}

function Position(row, col) {
     this.row = row;
     this.col = col;
}

function solvNQuennsHelper (n, row, positions, result) {
    if(n === row) {
        const curResult = [];
        for(let i = 0; i < positions.length; i++) {
            let str = '', position = positions[i];
            for(let j = 0; j < n; j++) {
                str += position.col === j ? 'Q' : '.'
            }
            curResult.push(str);
        }
        result.push(curResult);
    }

    for(let col = 0; col < n; col++) {
        if(isQueenSafe(col, row, positions)) {
            positions[row] = new Position(row,col)
            solvNQuennsHelper(n,row + 1,positions, result);
        }
    }
    return false
}

function isQueenSafe(col,row,positions) {
    for(let queen = 0; queen < row; queen++) {
        if(positions[queen].col === col || positions[queen].row - positions[queen].col === row - col
            || positions[queen].row + positions[queen].col === row + col) {
            return false
        }
    }
    return true
}
```
