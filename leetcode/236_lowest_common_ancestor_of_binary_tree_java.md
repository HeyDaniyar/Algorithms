## Problem  
Given a binary tree, find the lowest common ancestor(LCS) of two given nodes in the tree.

## Solution 
```java
public class Solution {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        if (root == null || root == p || root == q) return root;
        TreeNode left = lowestCommonAncestor(root.left, p, q);
        TreeNode right = lowestCommonAncestor(root.right, p, q);
        return left == null ? right : right == null ? left : root;
    }
}
```

## Analysis 
Typical recursive solution  
Notice that the last return statement works like two-line codes as below:  

```
if (left != null && right != null) return root;
return  left == null ? right : left;
```