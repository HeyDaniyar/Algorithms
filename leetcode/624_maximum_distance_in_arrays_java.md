# [Maximum Distance in Arrays](https://leetcode.com/problems/maximum-distance-in-arrays/#/description)

## Problem 
Given m arrays, and each array is sorted in ascending order. Now you can pick up two integers from two different arrays (each array picks one) and calculate the distance. We define the distance between two integers a and b to be their absolute difference |a-b|. Your task is to find the maximum distance.

**Example:**

```
Input: 
[[1,2,3],
 [4,5],
 [1,2,3]]
Output: 4
Explanation: 
One way to reach the maximum distance 4 is to pick 1 in the first or third array and pick 5 in the second array.
```

## Solution 

```java
public class Solution {
    public int maxDistance(List<List<Integer>> arrays) {
        if (arrays == null || arrays.size() < 2) return 0;
        int min = arrays.get(0).get(0), max = arrays.get(0).get(arrays.get(0).size() - 1);
        int res = Integer.MIN_VALUE;
        for (int i = 1; i < arrays.size(); i++) {
            int curMin = arrays.get(i).get(0), curMax = arrays.get(i).get(arrays.get(i).size() - 1);
            res = Math.max(res, Math.abs(min - curMax));
            res = Math.max(res, Math.abs(max - curMin));
            max = Math.max(max, curMax);
            min = Math.min(min, curMin);
        }
        return res;
    }
}
```

## Analysis 
The array inside given `arrays` is already sorted  
Therefore, we know the `min` and `max` in each array is the first one and last one  
To get the maximum absolute distance between two arrays  
We record the max and min so far in each array as `curMax` and `curMin`  
Then, we compare the distance to our `max` and `min` and update the `res`  
After that, we also update `max` and `min` at the end of the loop  
