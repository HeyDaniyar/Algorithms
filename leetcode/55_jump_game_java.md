# [Jump Game](https://leetcode.com/problems/jump-game/#/description)

## Problem 
Given an array of non-negative integers, you are initially positioned at the first index of the array.

Each element in the array represents your maximum jump length at that position.

Determine if you are able to reach the last index.

For example:
A = `[2,3,1,1,4]`, return `true`.

A = `[3,2,1,0,4]`, return `false`.

## Solution 
Concise greedy solution with O(n) time complexity:

```java
public class Solution {
    public boolean canJump(int[] nums) {
        if (nums == null || nums.length < 2) return true;
        int maxLocation = 0;
        for (int i = 0; i < nums.length; i++) {
            if (maxLocation < i) return false;
            maxLocation = Math.max(maxLocation, nums[i] + i);
        }
        return true;
    }
}
```

My original thought, it got Accepted but not optimal (using nested loop):

```java
public boolean canJump(int[] nums) {
        if (nums == null || nums.length <= 1) return true;
        outer:
        for (int i = 0; i < nums.length - 1; i++) { //Do not need to check the last index cause problem requires to jump to the last index not jump out the array 
            if (nums[i] != 0) continue;
            int jump = 1;
            for (int j = i - 1; j >= 0; j--) {
                if (nums[j] > jump++) continue outer;
            }
            return false;
        }
        return true;
    }
```

## Analysis 
The idea of my original solution is that we go directly to the `0` and then check if we can jump over it from previous positions  

The idea of greedy solution is that we update `maxLocation` from each position   
If we have a location beyond `maxLocation`, we cannot jump over it and hence return `false`  
Otherwise we just update the `maxLocation` and continue the loop   
At the end, we return true, because we can get to the last position  