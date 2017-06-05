## Solution
```java
public class Solution {
    public int rob(int[] nums) {
        if (nums == null) return 0; //No need to check nums.length == 0, cause the method will return 0
        if (nums.length == 1) return nums[0]; //This corner case need to be checked, cause the method cannot return correct result
        return Math.max(rob(nums, 0, nums.length - 2), rob(nums, 1, nums.length - 1));
    }

    private int rob(int[] nums, int s, int e) {
        int rob = 0, noRob = 0;
        for (int i = s; i <= e; i++) {
            int temp = noRob;
            noRob = Math.max(rob, noRob);
            rob = nums[i] + temp;
        }
        return Math.max(rob, noRob);
    }
}
```

## Analysis 
We divide this robbing circular houses problem to robbing regular houses.  
We first modify our regular `rob` method and add `s` (start) and `e`(end) parameters.  
Then in main method, we return the max value of robbing first house or robbing second house.  
Those two cases will cover all situations, hence we can guarantee our algorithm works.  