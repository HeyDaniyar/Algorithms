## Solution 
```java
public class Solution {
    public List<List<Integer>> permute(int[] nums) {
        List<List<Integer>> res = new ArrayList<>();
        helper(res, new ArrayList<>(), nums);
        return res;
    }

    private void helper(List<List<Integer>> res, List<Integer> list, int[] nums) {
        if(list.size() == nums.length) {
            res.add(new ArrayList<>(list));
            return ;
        }
        for(int i = 0; i < nums.length; i++) {
            if(list.contains(nums[i])) continue;
            list.add(nums[i]);
            helper(res, list, nums);
            list.remove(list.size() - 1);
        }
    }
}
```

## Analysis 
This is a typical backtracking solution. We need to store every number in each permutation, hence we start the `for` loop from `i = 0` until the length of given `nums`. Consider that the `list` cannot have duplicates, we check duplications before we add the number inside list. 
In backtracking solution, we need to modify the `list` in params, hence we need to copy the reference and add it to our `res`. 
