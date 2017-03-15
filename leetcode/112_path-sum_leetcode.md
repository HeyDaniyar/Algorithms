## Description

Given a binary tree and a sum, determine if the tree has a root-to-leaf path such that adding up all the values along the path equals the given sum.

### Example
For example:
Given the below binary tree and sum = 22,
```js
 5
/ \
4   8
/   / \
11  13  4
/  \      \
7    2      1

```
return true, as there exist a root-to-leaf path 5->4->11->2 which sum is 22.


## Solution
有一个题目中很重要的条件忽略了，那就是如果节点有子节点，那sum必须是节点和子节点路劲之和。也是就说`[1,2], sum = 1`像这样的情况是不行的。


```js
/**
 * @param {TreeNode} root
 * @param {number} sum
 * @return {boolean}
 */
var hasPathSum = function(root, sum) {
    if(!root) return false;
    if(!root.left && !root.right &&  sum - root.val === 0) return true
    return hasPathSum(root.left, sum - root.val) || hasPathSum(root.right, sum - root.val)
};

```
