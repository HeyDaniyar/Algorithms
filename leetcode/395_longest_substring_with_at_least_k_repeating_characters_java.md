## Solution 
```java
public class Solution {
    public int longestSubstring(String s, int k) {
        if(s == null || s.length() < k) return 0; //Remove some obviously wrong cases first 
        return helper(s, 0, s.length() - 1, k);
    }

    private int helper(String str, int s, int e, int k) {
        if (e - s + 1 < k) return 0; //Given two pointers length is even smaller than k, cannot construct valid substring 
        int[] count = new int[26];
        for (int i = s; i <= e; i++) count[str.charAt(i) - 'a']++;
        for (int i = s; i <= e; i++) {
            if (count[str.charAt(i) - 'a'] < k) return Math.max(helper(str, s, i-1, k), helper(str, i+1, e, k));
        }
        return e - s  + 1;
    }
}
```

## Analysis 
This is a **Divide and Conquer** solution. We use a `helper()` method to get our final result. The idea in `helper()` method is that we have two pointers `s` and `e`, which point to the start and end of the qualified longest substring. We know from the first if statement in main method that `str.length()` must be greater or equal to `k`. Hence we return 0 if `e-s+1` (which is the length of current substring) is smaller than k. Then we construct a `int[] count` that counts number of character appearing in the given `str`. After that, we loop from start to end, and as long as we find out a character's count is smaller than k, we know that character cannot be appeared in the longest substring. Then the problem becomes getting the max of it's left substring and right substring. At the end, we just return the length of current substring which is `e-s+1`. 