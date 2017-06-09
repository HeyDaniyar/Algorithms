## Solution 
```java  
public class Solution {
    public int nthUglyNumber(int n) {
        int index2 = 0, index3 = 0, index5 = 0;
        int exp2 = 2, exp3 = 3, exp5 = 5;
        int[] ugly = new int[n];
        ugly[0] = 1;
        for (int i = 1; i < n; i++) {
            int num = Math.min(Math.min(exp2, exp3), exp5);
            ugly[i] = num;
            if (num == exp2) exp2 = 2 * ugly[++index2];
            if (num == exp3) exp3 = 3 * ugly[++index3];
            if (num == exp5) exp5 = 5 * ugly[++index5];
        }
        return ugly[n-1];
    }
}
```

## Analysis 
To solve this problem, we need to think about the opposite direction of telling the number is ugly number  
Since an ugly number can be constructed only by multiplying 2, 3, or 5   
We store the expression list of these numbers called `exp2`, `exp3` and `exp5`   
Then we use a loop to construct a list of ugly numbers, of course we first set `ugly[0] = 1`  
We get the minimum number of each expression and then update the indices and corresponding expressions  
Notice that we cannot use `if() else if()` statement while updating because an ugly number can be constructed more than one way  
For example, 6 = 2 * 3 = 3 * 2 :)  