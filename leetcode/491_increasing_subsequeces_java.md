## Solution
```java
public class Solution {
    public List<List<Integer>> findSubsequences(int[] nums) {
        Set<List<Integer>> set = new HashSet<>();
        helper(set, new ArrayList<>(), 0, nums);
        return new ArrayList<>(set);
    } 

    private void helper(Set<List<Integer>> set, List<Integer> list, int start, int[] nums) {
        if(list.size() >= 2) set.add(new ArrayList<>(list));
        for(int i = start; i < nums.length; i++) {
            if(list.size() == 0 || list.get(list.size() - 1) <= nums[i]) {
                list.add(nums[i]);
                helper(set, list, i + 1, nums);
                list.remove(list.size() - 1);
            }
        }
    }
}
```

## Analysis 
Unlike the **Permutations** and **Combinations** problems we solved earlier, this problem is essentially to find a special sequence from a given array (can be considered as sequence too). Since the size of list in returning result cannot be less than 2, we use this qualification in our `if` statement. Notice that we don't return in `if` statement, cause the length can be 3, 4 or even more. Hence, we need to pass a `Set` in the params of `helper()` method, and convert it to list in main method. The idea is still about backtracking, just adding some limitations(qualifications). 