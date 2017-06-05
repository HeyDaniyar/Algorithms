## Solution 
```java
//Greedy Solution  
public class Solution {
    public boolean canPlaceFlowers(int[] flowerbed, int n) {
        if (flowerbed == null || n > (flowerbed.length + 1) / 2) return false;
        int count = 0;
        for (int i = 0; i < flowerbed.length && count < n; i++) {
            if (flowerbed[i] == 0) {
                int prev = i == 0 ? 0 : flowerbed[i-1];
                int next = i == flowerbed.length - 1 ? 0 : flowerbed[i+1];
                if (prev == 0 && next == 0) {
                    count++;
                    flowerbed[i] = 1;
                }
            }
        }
        return count == n;
    }
}
```

## Analysis 
This solution modifies the given input `flowerbed`  
We first check some corner cases then have `count` record current available spaces we find  
Notice that as long as `count >= n` we stop the for loop  
We get the previous number and the next number if the `flowerbed[i] == 0`  
Then we increment `count` and change `flowerbed[i]` to `1` if both the previous and next number are 0  
At the end, we just return whether `count` is equal to the given `n`  
 