## Solution
```java
public class Solution {
    public int findLUSlength(String[] strs) {
        if (strs == null || strs.length == 0) return -1;
        Arrays.sort(strs, (a, b) -> b.length() - a.length());
        int len = strs.length;
        for (int i = 0; i < len; i++) {
            int notSubseq = len;
            for (int j = 0; j < len; j++) {
                if (i == j || !isSubseq(strs[i], strs[j])) notSubseq--; //Most important line 
                else break;
            }
            if (notSubseq == 0) return strs[i].length();
        }
        return -1;
    }

    private boolean isSubseq(String a, String b) {
        int index = 0, m = a.length(), n = b.length();
        for (int i = 0; i < n && index < m; i++) {
            if (a.charAt(index) == b.charAt(i)) index++;
        }
        return index == m;
    }
}
```

## Analysis 
A variation of #521 FindLUS problem from Leetcode  
The difference is that we are now given an array of strings instead of just two  
The idea is, however, kind of similar to the one of #521  
We first sort the given input in **decreasing** order  
Then we loop through all the strings from input and record the number of not subsequences as `notSubseq`  
We increment it if `strs[i]` is not subsequence of all other strings `strs[j]` except itself  
Hence we have the most important line in this algorithm `if (i == j || !isSubseq(strs[i], strs[j])) notSubseq--`  
Otherwise, we just break the inner loop for checking because there exists a common subsequence  
If the current string is not subsequence of all other strings, we return the length of it  
Because we sort the input by decreasing order of the length, we guarantee the result is correct  

