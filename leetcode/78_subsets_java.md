## Solution 
```java
public class Solution {
    public List<List<Integer>> subsets(int[] nums) {
        List<List<Integer>> res = new ArrayList<>();
        helper(res, new ArrayList<>(), nums, 0);
        return res;
    }

    private void helper(List<List<Integer>> res, List<Integer> list, int[] nums, int start) {
        res.add(new ArrayList<>(list));
        for (int i = start; i < nums.length; i++) {
            list.add(nums[i]);
            helper(res, list, nums, i + 1);
            list.remove(list.size() - 1);
        }
    }
}
```

## Analysis 
Typical **backtracking** problem, since all the elements from `nums` are distinct, we just add the list to res every time the `helper()` function is called. Please refer to *90 Subsets II* for finding all the subsets of an array that has duplicated items.