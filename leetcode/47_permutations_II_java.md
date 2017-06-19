## Solution  
```java
public class Solution {
    public List<List<Integer>> permuteUnique(int[] nums) {
        Arrays.sort(nums);
        List<List<Integer>> res = new ArrayList<>();
        helper(res, new ArrayList<>(), nums, new boolean[nums.length]);
        return res;
    }

    private void helper(List<List<Integer>> res, List<Integer> list, int[] nums, boolean[] used) {
        if (list.size() == nums.length) {
            res.add(new ArrayList<>(list));
            return;
        }
        for (int i = 0; i < nums.length; i++) {
            if (used[i]) continue;
            if (i > 0 && nums[i] == nums[i-1] && used[i-1]) continue; //!used[i-1] works too
            list.add(nums[i]);
            used[i] = true;
            helper(res, list, nums, used);
            list.remove(list.size() - 1);
            used[i] = false;
        }
    }
}
```

## Analysis 
This is a variation of **Permutation** Problem   
The difference in this problem is that given input `nums` can have duplicated elements  
Therefore, we first sort the `nums` (typical solution when duplicated elements are in array)  
Then we use a `boolean[] used` to store the status of using each number in `nums`  
We don't have a `start` parameter in `helper()` function but we pass the `boolean[] used`  
Then in the `for` statement we loop from `i = 0` to the end  
We continue when we face the following conditions:    
- When we already used that number in `helper()` function (`used[i] == true`)  
- When we have same consecutive elements and the former one has already used before (`nums[i] == num[i-1] && used[i-1]`)