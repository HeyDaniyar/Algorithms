## Solution 
```java
public class Solution {
    public boolean isUgly(int num) {
        if (num <= 0) return false;
        for (int i = 2; i < 6; i++) {
            while (num % i == 0) num /= i;
        }
        return num == 1;
    }
}
```

## Analysis 
Since ugly number is positive, we first check whether the given input is non-negative  
Then we divide 2, 3, 4, 5 if it's divisible  
At the end, we just return if given input is equal to `1`  