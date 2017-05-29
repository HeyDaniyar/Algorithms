## Solution 
```java
public class Solution {
    public int wiggleMaxLength(int[] nums) {
        int len = nums.length;
        if (len < 2) return len;
        int k = 1;
        while ( k < len && nums[k] == num[k-1]) k++;
        if (k == len) return 1; //All elements are same in nums 
        int result = 2;
        boolean needSmall = nums[k] > nums[k-1];
        for (int i = k; i < len - 1; i++) {
            if (needSmall && nums[i+1] < nums[i] || !needSmall && nums[i+1] > nums[i]) {
                nums[result++] = nums[i+1];
                needSmall = !needSmall;
            }  
        }
        return result;
    }
}
```

## Analysis 
The basic idea of this solution is that we assume the longest wiggle subsequence is from the first index. Then we compare the second one to first one to get the value of `needSmall`. We update the `num[result++]` if if follows wiggle pattern, otherwise, we just skip that number and continue the loop. The first if and while statement are to avoid some special cases (like they are all same). 