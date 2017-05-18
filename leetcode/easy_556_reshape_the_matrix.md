### My brute force solution, what a mess...
```java
public class Solution {
    public int[][] matrixReshape(int[][] nums, int r, int c) {
        
        if(nums == null || nums.length == 0) return nums;
        int m = nums.length, n = nums[0].length, index = 0;
        if(r * c != m * n) return nums;
        int[][] res = new int[r][c];
        int[] numbers = new int[m * n];
        for(int[] rows : nums) 
            for(int num : rows) 
                numbers[index++] = num; 
        index = 0;
        for(int i = 0; i < r; i++) 
            for(int j = 0; j < c; j++) 
                res[i][j] = numbers[index++];
            
        return res;
    }
}
```

### Best one with just one loop. 
Idea here is that we get the correct indices by using **/ n (column length) and % n**
        
```java
public class Solution {
    public int[][] matrixReshape(int[][] nums, int r, int c) {
        
        if(nums == null || nums.length == 0) return nums;
        int m = nums.length, n = nums[0].length, index = 0;
        if(r * c != m * n) return nums;
        int[][] res = new int[r][c];
        for(int i = 0; i < r * c; i++) {
            res[i/c][i%c] = nums[i/n][i%n];
        }
        return res;
    }
}
```


