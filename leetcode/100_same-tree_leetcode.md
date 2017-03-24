## Description

Given two binary trees, write a function to check if they are equal or not.

Two binary trees are considered equal if they are structurally identical and the nodes have the same value.

## Solution

很简单的一套递归问题，前面想的有点复杂，不需要全部遍历。

```js
/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function(p, q) {
    if(!p && !q) return true
    if(!p || !q) return false
    if(p.val === q.val) {
        return isSameTree(p.left, q.left) && isSameTree(p.right, q.right)
    }
    return false
};



```
