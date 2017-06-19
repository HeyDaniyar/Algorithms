# [Word Break](https://leetcode.com/problems/word-break/#/description)

## Problem 
Given a non-empty string s and a dictionary wordDict containing a list of non-empty words, determine if s can be segmented into a space-separated sequence of one or more dictionary words. You may assume the dictionary does not contain duplicate words.

For example, given
`s = "leetcode"`,
`dict = ["leet", "code"]`.

Return `true` because "leetcode" can be segmented as "leet code".

## Solution 

```java
public class Solution {
    public boolean wordBreak(String s, List<String> wordDict) {
        if (s == null || s.length() == 0) return true;
        int len = s.length();
        boolean[] dp = new boolean[len + 1]; //dp[i] represents whether the substring of s from 0 to i can be segmented
        dp[0] = true; //dp[0] is the empty substring, it can be segmented trivially 
        for (int i = 1; i <= len; i++) {
            for (int j = 0; j < i; j++) {
                if (dp[j] && wordDict.contains(s.substring(j, i))) {
                    dp[i] = true;
                    break;
                }
            }
        }
        return dp[len];
    }
}
```

## Analysis 
It is hard for me to consider this problem as DP at first  
Because we can use the word from `wordDict` multiple times, we have choices when segment substring of `s`  
Hence it is indeed a DP problem and we have `dp[len + 1]` cause `s.substring(i, j)` won't include j  
We use two loops to guarantee every substring until the index `i`  
If we know the left part `dp[j]` is already segmented and right part `s.substring(j, i)` can be segmented, we update `dp[i]`  
At the end, we just return `dp[len + 1]` which represent the whole string `s`  