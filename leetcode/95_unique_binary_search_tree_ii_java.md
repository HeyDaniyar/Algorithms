## Problem 
Given an integer n, generate all structurally unique BST's (binary search trees) that store values from 1 to n.  
For example, given n = 3 your program should return 5 unique BST as below:  
1-3-1; 3-2-1; 3-1-2; 2-1,3; 1-2-3  

## Solution 
```java
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */
public class Solution {

    public List<TreeNode> generateTrees(int n) {
        if (n <= 0) return new ArrayList<>();
        return helper(1, n);
    }

    private List<TreeNode> helper(int start, int end) {
        List<TreeNode> res = new ArrayList<>();
        if (start > end) {
            res.add(null);  //Must add null here
            return res;
        }
        for (int i = start; i <= end; i++) {
            List<TreeNode> leftSubtrees = helper(start, i - 1);
            List<TreeNode> rightSubtrees = helper(i + 1, end);
            for (TreeNode left : leftSubtrees) {
                for (TreeNode right : rightSubtrees) {
                    TreeNode root = new TreeNode(i);
                    root.left = left;
                    root.right = right;
                    res.add(root);
                }
            }
        }
        return res;
    }
}
```

## Analysis 
The idea of this solution is about **Divide and Conquer**  
It use the similar algorithm in *Problem 94* to come up with all the unique BSTs  
We have a loop in recursive `helper()` function to construct all the unique BSTs and add them to the result  
Notice that, for invalid number like `start > end`, we must add `null` to our result list  