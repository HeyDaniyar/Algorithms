## Description

Given a binary tree, return the zigzag level order traversal of its nodes' values. (ie, from left to right, then right to left for the next level and alternate between).

For example:
Given binary tree [3,9,20,null,null,15,7],

```
  3
 / \
9  20
  /  \
 15   7
```

return its zigzag level order traversal as:
```
[
  [3],
  [20,9],
  [15,7]
]


```

## Solution
只需要根据level是偶数还是奇数来确定元素插入的顺序是push还是unshift即可。前面想的方法是颠倒preOrder（node.left)和preOrder(node.right)的顺序，但后来发现如果这样会让遍历左右节点的顺序也发生变化，和题目要求不符合。

```js
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var zigzagLevelOrder = function(root) {
    const result = [];
    return preOrder(root, result, 0) || [];

};

function preOrder(node, result, level) {
    if(node) {
        if(!result[level]) result[level] = [];
        if(level % 2 === 0) result[level].push(node.val)
        else result[level].unshift(node.val);

        preOrder(node.left, result, level + 1);
        preOrder(node.right, result, level + 1);
        return result
    }
}
```
