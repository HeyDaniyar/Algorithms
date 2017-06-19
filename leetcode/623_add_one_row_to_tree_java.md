# [Add One Row to Tree](https://leetcode.com/problems/add-one-row-to-tree/#/description)

## Problem 
Given the root of a binary tree, then value v and depth d, you need to add a row of nodes with value v at the given depth d. The root node is at depth 1.

The adding rule is: given a positive integer depth d, for each NOT null tree nodes N in depth d-1, create two tree nodes with value v as N's left subtree root and right subtree root. And N's original left subtree should be the left subtree of the new left subtree root, its original right subtree should be the right subtree of the new right subtree root. If depth d is 1 that means there is no depth d-1 at all, then create a tree node with value v as the new root of the whole original tree, and the original tree is the new root's left subtree.

**Example 1:**

```
Input: 
A binary tree as following:
       4
     /   \
    2     6
   / \   / 
  3   1 5   

v = 1

d = 2

Output: 
       4
      / \
     1   1
    /     \
   2       6
  / \     / 
 3   1   5   
```

**Example 2:**

```
Input: 
A binary tree as following:
      4
     /   
    2    
   / \   
  3   1    

v = 1

d = 3

Output: 
      4
     /   
    2
   / \    
  1   1
 /     \  
3       1
```

**Note:**
- The given d is in range [1, maximum depth of the given tree + 1].  
- The given binary tree has at least one tree node.
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

    public TreeNode addOneRow(TreeNode root, int v, int d) {
        if (root == null || d < 1) return root; //check corner cases 
        if (d == 1) {
            TreeNode newRoot = new TreeNode(v);
            newRoot.left = root;
            return newRoot;
        }
        helper(root, v, d - 1);
        return root;
    }

    private void helper(TreeNode node, int v, int level) {
        if (level == 1) {
            TreeNode newLeft = new TreeNode(v), newRight = new TreeNode(v);
            newLeft.left = node.left;
            newRight.right = node.right;
            node.left = newLeft;
            node.right = newRight;
            return;
        }
        if (node.left != null) helper(node.left, v, level - 1);
        if (node.right != null) helper(node.right, v, level - 1);
    }
}
```

## Analysis 
We need to insert a row into a given Binary Tree  
The tricky part is that to find the correct **position** in both left and right part of the tree  
In this solution, we use `level` to record the current position(depth) inside recursive calls  
When `level == 1`, we need to insert the row as the current `node`'s new left and new right  
If not, we first check if current `node`'s left and right are `null` then recursively call the method with `level-1`  
Since we call the method on both `node.left` and `node.right`, we insert the row as problem required    