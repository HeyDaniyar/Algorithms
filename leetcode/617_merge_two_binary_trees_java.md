## Solution 
```java
public class Solution {
    public TreeNode mergeTrees(TreeNode t1, TreeNode t2) {
        if (t1 == null && t2 == null) return null;
        int val = (t1 == null ? 0 : t1.val) + (t2 == null ? 0 : t2.val);
        TreeNode newNode = new TreeNode(val);
        newNode.left = mergeTrees(t1 == null ? null : t1.left, t2 == null ? null : t2.left);
        newNode.right = mergeTrees(t1 == null ? null : t1.right, t2 == null ? null : t2.right);
        return newNode;
    }
}
```

## Analysis 
This is a typical traversal problem and we use typical recursive solution  
Notice that we need to return an object of `TreeNode` hence we cannot return the sum of values in each recursion  
In this solution, we construct a new `TreeNode` using the sum of two given input `TreeNodes`   
And then we recursively set the left of newly constructed `TreeNode` and also the right  
At the end, we return our `newNode` because it's the root in the first recursion call  