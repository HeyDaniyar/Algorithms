## Solution
DP solution with O(n) spaces

```java
public class Solution {
    public int rob(int[] nums) {
        if (nums == null || nums.length == 0) return 0;
        int len = nums.length;
        if (len < 2) return nums[0];
        int[] dp = new int[len];
        dp[0] = nums[0];
        dp[1] = Math.max(nums[0], nums[1]);
        for (int i = 2; i < len; i++) {
            dp[i] = Math.max(dp[i-1], nums[i] + dp[i-2]);
        }
        return dp[len - 1];
    }
}
```

Iterative solution using the same idea as DP. O(1) space though. 

```java
public class Solution {
    public int rob(int[] nums) {
        int rob = 0, noRob = 0;
        for (int num : nums) {
            int temp = noRob;
            noRob = Math.max(rob, noRob);
            rob = num + temp;
        }
        return Math.max(rob, noRob);
    }
}
```

## Analysis 
This is the typical DP problem. 
For DP solution, we have `dp[i]` to record the max profit of `ith` home.  
Therefore, every time we update the `dp[i]`, we just need to get max of robbing or not robbing the `ith` house.   
If we decide to rob `ith` house, we know we cannot rob `i-1` house, hence `dp[i] = nums[i] + dp[i-2]`  
If we give up robbing the `ith` house, it is obvious that `dp[i] = dp[i-1]`  
At the end, we just return `dp[len - 1]`    

To optimize this solution, we can use O(1) space instead of O(n) spaces, and we don't have to check `nums == null || nums.length == 0`  
First we have `rob` and `noRob` variables to record current robbing situation  
Then in loop, we first get a reference of `noRob` and update it by setting the max of `rob` and `noRob`  
For `rob`, we simply add current `num` and reference of `noRob` (cause `noRob` has already changed, we must use original reference)  
At the end, we return the max of `rob` and `noRob`  
