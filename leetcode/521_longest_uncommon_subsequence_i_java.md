## Solution  
```java
public class Solution {
    public int findLUSLength(String a, String b) {
        return a.equals(b) ? -1 : Math.max(a.length(), b.length());
    }
}
```

## Analysis 
I know what you are thinking, perhaps a good April's Fool problem  
The 522 Longest Uncommon Subsequence II is worth challenge though  