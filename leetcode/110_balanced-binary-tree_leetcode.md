## Description
Given a binary tree, determine if it is height-balanced.

For this problem, a height-balanced binary tree is defined as a binary tree in which the depth of the two subtrees of every node never differ by more than 1.


## Solution

通用解法，先分别得出左右子树的深度，然后去相剪，如果diff超过1即不是BT。


```js
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isBalanced = function(root) {
    if(!root) return true
    const resultLeft = [], resultRight = [];
    const leftDepth = getDepth(root.left,resultLeft, 0)||0;
    const rightDepth = getDepth(root.right, resultRight, 0)||0;
    const diff = Math.abs(leftDepth - rightDepth);
    return diff <= 1
};

function getDepth(node,result,level) {
    if(node) {
       if(!result[level]) result[level] = []
       result[level].push(node.val);
       getDepth(node.left, result,level+1);
       getDepth(node.right,result, level+1);
       return result.length

    }
}
```

#### 解法二
有点不太理解，可能和我前期理解的balanced tree的定义不同有关

```js
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
let result = true;

var isBalanced = function(root) {
    maxDepth(root);
    return result;    
};

function maxDepth(node) {
    if (!node) return 0
    let l = maxDepth(node.left);
    let r = maxDepth(node.right);
    if (Math.abs(l - r) > 1)
        result = false;
    return 1 + Math.max(l, r);
}
```
