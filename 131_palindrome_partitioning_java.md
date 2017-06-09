## Solution 
```java
public class Solution {
    public List<List<String>> partition(String s) {
        List<List<String>> res = new ArrayList<>();
        helper(res, new ArrayList<>(), s, 0);
        return res;
    }

    private void helper(List<List<String>> res, List<String> list, String s, int start) {
        if (start == s.length()) {
            res.add(new ArrayList<>(list));
            return;
        }
        for (int i = start; i < s.length(); i++) {
            if (isPalindrome(s, start, i)) {
                list.add(s.substring(start, i + 1));
                helper(res, list, s, i + 1);
                list.remove(list.size() - 1);
            }
        }
    }

    private boolean isPalindrome(String s, int start, int end) {
        while (start < end) {
            if (s.charAt(start++) != s.charAt(end--)) return false;
        }
        return true;
    }
}
```

## Analysis 
This is a backtracking problem for sure  
The difference between this solution and general backtracking solutions is that we call the recursion method only if we find valid situations  
Therefore, we have a helper method to check palindrome from `start` to `i` every time in the loop  
If we get palindrome, we add the substring from `start` to `i+1` (i+1 won't be covered) to the list  
Notice that we return from recursion method when the given `start` is equal to `s.length()`  