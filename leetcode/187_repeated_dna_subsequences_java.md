## Solution 
```java
public class Solution {
    public List<String> findRepeatedDnaSequences(String s) {
        Set<String> seen = new HashSet<>(), res = new HashSet<>();
        for (int i = 0; i < s.length() - 9; i++) {
            String dna = s.substring(i, i + 10); //Need to be i + 10 here because the last index one won't be added  
            if (!seen.add(dna)) res.add(dna);
        }
        return new ArrayList<>(res);
    }
}
```

## Analysis  
Pretty straightforward solution using two `HashSet`  
The first set is to check the duplicated, the second set is to guarantee there is no duplicates in our result  
At the end, convert set to list and return it  