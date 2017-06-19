## Solution 
```java
public class Solution {
    public int minSubArrayLen(int s, int[] nums) {
        if (nums == null || nums.length == 0) return 0;
        int sum = 0, start = 0, res = Integer.MAX_VALUE;
        for (int i = 0; i < nums.length; i++) {
            sum += nums[i];
            while (sum >= s) {
                res = Math.min(res, i - start + 1);
                sum -= nums[start++];
            }
        }
        return res == Integer.MAX_VALUE ? 0 : res; // Do not forget to check whether we find any valid subarray  
    }
}
```

## Analysis 
This problem needs to find out the minimal contiguous subarray with sum >= given `s`   
Therefore, we cannot sort the given input `nums`   
In this solution, we use the idea of `two pointers`   
We first have a pointer `start` and two other integer vars `sum` and `res`, res init to `MAX_VALUE`  
Then we loop through the entire `nums` and every time increment `sum` by current number   
If our `sum` >= `s` we compare `res` with `i - start + 1`, and update `res` with minimal value  
Then we decrease the `sum` with `nums[start++]` and continue this procedure until our `sum`  < `s`  
At the end, we check if we have any valid subarray and return the correct result  