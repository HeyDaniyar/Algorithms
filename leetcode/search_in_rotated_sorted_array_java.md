## Solution 
```java
public class Solution {
    public int search(int[] nums, int target) {
        if (nums == null || nums.length == 0) return -1;
        int len = nums.length, start = 0, end = len - 1;
        while (start < end) {
            int mid = (start + end) / 2;
            if (nums[mid] > nums[end]) start = mid + 1;
            else end = mid;
        }
        int smallestIndex = start;
        start = 0; 
        end = len - 1;
        while (start <= end) {
            int mid = (start + end) / 2;
            int realMid = (mid + smallestIndex) % len;
            if (target > nums[realMid]) start = mid + 1;
            else if (target < nums[realMid]) end = mid - 1;
            else return realMid;
        }
        return -1;
    }
}
```

## Analysis 
We need to find the target's index from a rotated sorted array  
Since it's an already sorted array, we need to first think about using **Binary Search**  
However, this is a rotated sorted array, so we need to find the `realMid` index to the binary search  
Therefore, we need to find the smallest index in the array (the index where it rotates)  
We use a `while` loop to get that index and record it  
Then we do another `while` loop to find our target's index using binary search  
The only difference between normal binary search is that we use the `realMid` index to compare with target  
We return `1` if we find the target. If not, we update, however, the regular `mid` we get from `start` and `end`  
Notice that the time complexity of this solution is that **O(logN)** (N is the length of array)  


