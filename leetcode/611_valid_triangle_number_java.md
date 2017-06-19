## Solution 
First thought using backtracking, got Time Limit Exception from Leetcode 

```java
public class Solution {
    public int triangleNumber(int[] nums) {
        if (nums == null || nums.length < 3) return 0;
        List<List<Integer>> tris = new ArrayList<>();
        helper(tris, new ArrayList<>(), nums, 0);
        int count = 0;
        for (List<Integer> list : tris) {
            Collections.sort(list); //The way to sort List in Java
            if (list.get(0) + list.get(1) > list.get(2)) count++;
        }
        return count;
    }

    private void helper(List<List<Integer>> tris, List<Integer> list, int[] nums, int start) {
        if (list.size() == 3) {
            tris.add(new ArrayList<>(list));
            return;
        }
        for (int i = start; i < nums.length; i++) {
            list.add(nums[i]);
            helper(tris, list, nums, i + 1);
            list.remove(list.size() - 1);
        }
    }
}
```

Optimal solution without backtracking. Two pointers just work simply :)

```java
public class Solution {
    //O(n^2) time complexity and O(1) space 
    public int triangleNumber(int[] nums) {
        if (nums == null || nums.length < 3) return 0;
        Arrays.sort(nums);
        int count = 0;
        for (int i = nums.length - 1; i >= 2; i--) {
            int l = 0, r = i - 1;
            while (l < r) {
                if (nums[l] + nums[r] > nums[i]) {
                    count += r - l;
                    r--;
                }
                else l++;
            }
        }
        return count;
    }
}
```

## Analysis 
On my first approach, I tried to use backtracking get all the lists of three numbers  
Then sort each list and use `a + b > c` to get valid triangle numbers  
It got TLE but worth trying I guess   

As you can see on the optimal solution, we use two pointers `l` and `r` to get the correct result  
We first sort the given input, and then start the loop from the end  
We use the same statement to verify the triangle numbers  
The amazing part is however, we don't have to go through the middle number from `l` to `r`,  
because we sort the `nums` at first!  
Hence we increment our `count` by `r-l`  
If they are not valid triangle numbers, we just move the `l` to right by one  
After we finish the outer for loop, we will get the total number of valid triangle numbers  



