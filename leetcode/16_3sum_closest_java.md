## Solution 
```java
public class Solution {
    public int threeSumClosest(int[] nums, int target) {
        //Always check corner cases first  
        if (nums == null || nums.length == 0) return 0;
        int res = 0, len = nums.length;
        if (len <= 3) {
            for (int num : nums) res += num;
            return res; 
        }

        Arrays.sort(nums);
        res = nums[0] + nums[1] + nums[2];
        for (int i = 0; i < len - 2; i++) { //We need to make sure we have at least three numbers left 
            int left = i + 1, right = len - 1;
            while (left < right) {
                int sum = nums[i] + nums[left] + nums[right];
                if (Math.abs(sum - target) < Math.abs(res - target)) res = sum; //Update res with sum not the difference between target 
                if (sum < target) left++;
                else right--;
            }
        }

        return res;
    }
}
```

## Analysis 
The idea is loop through all possible sums and update the result if we find a closer sum to target  
We use **Binary Search** to optimize our algorithm   
We have the current number `nums[i]`, left-most number `nums[i+1]`, and right-most number `nums[len - 1]`  
Notice that we need to handle with some corner cases before we start the binary search  