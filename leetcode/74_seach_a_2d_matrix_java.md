## Solution 
Consider 2D matrix as a single array and use binary search

```java
public class Solution {
    public boolean searchMatrix(int[][] matrix, int target) {
        if (matrix == null || matrix.length == 0) return false;
        int m = matrix.length, n = matrix[0].length;
        int l = 0, r = m * n - 1;
        while (l <= r) {
            int mid = (l + r) / 2, i = mid / n, j = mid % n;
            if (target == matrix[i][j]) return true;
            if (target > matrix[i][j]) l = mid + 1;
            else r = mid - 1;
        }
        return false;
    }
}
```

Another solution not without binary search. This is not optimized one cause it does not fully make use of sorted feature.

```java
public class Solution {
    public boolean searchMatrix(int[][] matrix, int target) {
        if (matrix == null || matrix.length == 0) return false;
        int i = 0, j = matrix[0].length - 1;
        while (i < matrix.length && j >= 0) {
            if (target == matrix[i][j]) return true;
            if (target > matrix[i][j]) i++;
            else j--;
        } 
        return false;
    }
}
```

## Analysis 
A great feature in this matrix is that all elements in each row are sorted, and last element of a row is always smaller than the first element of the next row. Hence, we can consider this 2D matrix as a single array, and everything becomes straightforward when we use binary search. The questions is that how we get the corresponding indices of `i` and `j` by binary search indices in array `l` and `r`. Well, here are the formulas you should remember when converting matrix to array or vice versa (Notice that they are only valid for sorted matrix):
**matrix[i][j] = array[col*i + j]**
**array[i] = matrix[i/col][i%col]**

The second solution is using tradition way to search a target in 2D array. It is not a good choice but a good practice to understand the searching process.











