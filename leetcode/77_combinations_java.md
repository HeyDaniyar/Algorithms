## Solution 
```java
public class Solution {
    public List<List<Integer>> combine(int n, int k) {
        List<List<Integer>> res = new ArrayList<>();
        helper(res, new ArrayList<>(), 1, n, k);
        return res;
    }

    private void helper(List<List<Integer>> res, List<Integer> list, int start, int n, int k) {
        if(list.size() == k) {
            res.add(new ArrayList<>(list));
            return;
        }
        for(int i = start; i <= n; i++) {
            list.add(i);
            helper(res, list, i + 1, n, k);
            list.remove(list.size() - 1);
        }
    }
}
```

## Analysis 
Typical **backtracking** solution above there. This one is similar to *46_permutations*, however, there are some distinguishes. First of all, we need an `int start` to record the starting index in each execution of `helper()` function. We also start the `for loop` from `i = start` and we don't need to check if the `list` already contains the number, because the number is always increased before calling the `helper()` function. The given `nums` are from 1 to n, not a list or array with random numbers.  