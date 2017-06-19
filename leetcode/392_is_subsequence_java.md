## Solution 
```java
public class Solution {
    public boolean isSubsequence(String s, String t) {
        //Check whether s is subsequence of t
        int index = 0, m = s.length(), n = t.length();
        for (int i = 0; i < n && index < m; i++) {
            if (s.charAt(index) == t.charAt(i)) index++;
        }
        return index == m;
    }
}
```

## Analysis 
This is a general way to determine if a given string is subsequence of another string   
We loop through the bigger string and increment the index if we find same characters of two strings  
At the end, we simply return whether the `index` is equal to the length of smaller string   
Notice that **subsequence** is defined as removing some (can be 0) characters from given input, it does not have to be consecutive   