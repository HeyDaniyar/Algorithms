## Solution 
```java
public class Solution {
    public List<List<Integer>> subsetsWithDup(int[] nums) {
        Arrays.sort(nums);
        List<List<Integer>> res = new ArrayList<>();
        helper(res, new ArrayList<>(), nums, 0);
        return res;
    }

    private void helper(List<List<Integer>> res, List<Integer> list, int[] nums, int start) {
        res.add(new ArrayList<>(list));
        for (int i = start; i < nums.length; i++) {
            if (i > start && nums[i] == nums[i-1]) continue; // i > start used to avoid nums[0] == nums[-1] error 
            list.add(nums[i]);
            helper(res, list, nums, i + 1);
            list.remove(list.size() - 1);
        }
    }
}
```

## Analysis 
This is a general way to get all subsets of a given array. The difference of this solution to *78 Subsets* is that the given array might contain duplicated elements. I first thought of using `set` to do this problem. However, it's hard to check equality of a list (which is an object). For example, a list `{2, 1, 2}` is different from `{1,2,2}` because of orders. Hence, the correct and easiest way to avoid duplicates in this **backtracking** solution is that, we first sort the given array and check if `nums[i] == nums[i-1]`. If true, we just continue the loop. Besides these, everything is same as getting subsets from an array with distinct elements.   