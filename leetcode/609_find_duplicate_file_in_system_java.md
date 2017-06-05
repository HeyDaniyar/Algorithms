## Solution 
```java
public class Solution {
    public List<List<String>> findDuplicate(String[] paths) {
        Map<String, List<String>> map = new HashMap<>();
        for (String path : paths) {
            String[] tokens = path.split(" ");
            String prefix = tokens[0];
            for (int i = 1; i < tokens.length; i++) {
                String file = tokens[i].substring(0, tokens[i].indexOf("("));
                String content = tokens[i].substring(tokens[i].indexOf("("), tokens[i].indexOf(")"));
                map.putIfAbsent(content, new ArrayList<>());
                map.get(content).add(prefix + "/" + file);
            }
        }
        return map.values().stream().filter(v -> v.size() > 1).collect(Collectors.toList()); //Not asList() ! 
    }
}
```

## Analysis 
This is a pretty straightforward solution  
We create a map to store **content** of file as key and list of **files** as value  
Then we use `" "` to split and get tokens from each `path`  
After that, we store content and files and return duplicates  
Notice how the last line uses `streams()` and `Collectors.toList()` method from Java 8  
