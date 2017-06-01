## Solution 
```java
public class Solution {
    public int rob(TreeNode root) {
        if (root == null) return 0;
        int robRoot = root.val;
        if (root.left != null) robRoot += rob(root.left.left) + rob(root.left.right);
        if (root.right != null) robRoot += rob(root.right.left) + rob(root.right.right);
        return Math.max(robRoot, rob(root.left) + rob(root.right));
    }
}
```

## Analysis 
This idea of this solution is pretty straightforward.  
We know if we rob a `node`, we cannot rob it's direct children (`node.left` && `node.right`)  
Therefore, we use recursion and return max of robbing the root or not  
Since it will cover all situations, we guarantee our algorithm works  
Beauty of Recursion! 