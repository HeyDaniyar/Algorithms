## Solution 
```java
public class Solution {
    public String decodeString(String s) {
        Stack<Integer> intS = new Stack<>();
        Stack<StringBuilder> sbS = new Stack<>();
        StringBuilder sb = new StringBuilder();
        int k = 0;
        for(char c : s.toCharArray()) {
            if(Character.isDigit(c)) k = k * 10 + c - '0'; // "k*10" because the number can be > 9 like 125
            else if(c == '[') {
                intS.push(k);
                k = 0;
                sbS.push(sb);
                sb = new StringBuilder();
            } else if(c == ']') {
                StringBuilder temp = sb;
                sb = sbS.pop();
                k = intS.pop();
                while(k-- > 0) sb.append(temp.toString()); //Every time we check the while statement, it will change k even not true 
                k = 0; //So we must set k = 0 otherwise it is "0" after while statement
            } else sb.append(c);
        }
        return sb.toString();
    }
}
```

## Analysis 
This is a typical question using `Stack`. You should always first consider `Stack` as long as you need to record some data and use it in `FILO` order. Overall, the question is not very hard but it does need to calculate the data correctly, especially for the `K` values in while statement and after that. 