## Solution 
```java
public class Solution {
    public int numTrees(int n) {
        if (n <= 1) return 1;
        int[] G = new int[n+1];
        G[0] = G[1] = 1; //This is valid statement in java 
        for (int i = 2; i <= n; i++) {
            for (int j = 1; j <= i; j++) {
                G[i] += G[j - 1] * G[i - j]; 
            }
        }
        return G[n];
    }
}
```

## Analysis 
`G(n)` is the number of BST with length `n`  
It can be constructed with each number as root   
`G(n) = F(1, n) + F(2, n) + F(3, n) + ... + F(n, n)`, where `F(i, n)` is the number of BST with `i` as root  
For each BST with a root i, we can construct it with left subtrees times right subtrees   
`F(i, n) = G(i-1) * G(n-1)`  
At the end, we return the `G(n)` as  required       
