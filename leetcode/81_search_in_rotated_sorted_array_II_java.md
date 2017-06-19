## Solution 
```java
public class Solution {
    public boolean search(int[] nums, int target) {
        if (nums == null || nums.length == 0) return false;
        int start = 0, end = nums.length - 1;
        while (start <= end) {
            int mid = (start + end) / 2;
            if (target == nums[mid]) return true;
            //If left part is sorted
            if (nums[start] < nums[mid]) {
                if (target > nums[mid] || target < nums[start]) start = mid + 1;
                else end = mid - 1;
            } 
            //Else if left part is rotated
            else if (nums[start] > nums[mid]) {
                if (target < nums[mid] || target > nums[end]) end = mid - 1;
                else start = mid + 1;
            }
            //Encounter duplicated elements 
            else start++;
        }
        return false;
    }
}
```

## Analysis 
Even though this problems is the second version of *Search in Rotated Sorted Array* Problem, the solution has kind of different idea  
We still use binary search, however, we don't have to calculate the `realMid` as we did in the previous problem  
We instead, has `if() else if() else ` three different statements to handle  
First of all, is the `nums[start] < nums[mid]`, which means the left part from `start` to `mid` is sorted  
We then compare the `target` to `nums[mid]` as we usually do in binary search  
However, we also need to add one more situation, which is `target` to `nums[start]` and `target` to `nums[end]` because of rotation  
The last `else` statement is when we have duplicated elements, we simply just increment the `start` by one  
That's it.  