## Description

Given a binary tree, determine if it is a valid binary search tree (BST).

Assume a BST is defined as follows:

The left subtree of a node contains only nodes with keys less than the node's key.
The right subtree of a node contains only nodes with keys greater than the node's key.
Both the left and right subtrees must also be binary search trees.

### Example

```js
 2
/ \
1   3
```

Binary tree [2,1,3], return true.

```js
 1
/ \
2   3
```

Binary tree [1,2,3], return false.


## Solution
首先考虑BST的特点，即用中序排序后能得到一个递增的数组。最直观的想法是将数组中序排序然后再看是否满足递增，但是这样的坏处是会需要将整个树全部遍历完，空间复杂度有点高。所以另一种解法就是设定最大值和最小值，用递归的思想去比较是否右节点的值大于最小值但小于父元素值，左节点值是否小于最大值但是大于父元素值。

```js
/**
* @param {TreeNode} root
* @return {boolean}
*/
var isValidBST = function(root) {
   const max = Number.MAX_VALUE;
   const min = - Number.MAX_VALUE;
   return helper(root, min, max);
};

function helper(node, min, max) {
   if(!node) return true
   if(node.val < max && node.val > min) {
       if(helper(node.left, min, node.val) && helper(node.right, node.val, max)) {
           return true
       }
   }
   return false
}
```
