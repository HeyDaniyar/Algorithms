## Solution 
```java
public class Solution {

    int index;
    String[] strs;
    int[] counts;

    public StringIterator (String s) {
        this.strs = s.split("\\d+");
        this.counts = Arrays.stream(s.substring(1).split("[a-zA-Z]+")).mapToInt(Integer::parseInt).toArray();
        this.index = 0;
    }

    public char next() {
        if (!hasNext()) return ' ';
        char ch = strs[index].charAt(0);
        if (--counts[index] == 0) index++;
        return ch;
    }

    public boolean hasNext() {
        return index < strs.length;
    }
}
```

## Analysis 
In this solution we have `int index` to mark current character, `String[] strs` and `int[] counts` to record corresponding data  
The logics used in this solution is pretty straightforward   
Notice that, however, how we construct `counts` using Java 8 `Arrays.stream()` method  
  