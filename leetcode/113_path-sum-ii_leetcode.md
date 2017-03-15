## Description
Given a binary tree and a sum, find all root-to-leaf paths where each path's sum equals the given sum.

For example:
Given the below binary tree and sum = 22,

```js
 5
/ \
4   8
/   / \
11  13  4
/  \    / \
7    2  5   1
```

return
```js
[
   [5,4,11,2],
   [5,8,4,5]
]
```


## Solution
和上一道题解法完全一样。

```js
/**
 * @param {TreeNode} root
 * @param {number} sum
 * @return {number[][]}
 */
var pathSum = function(root, sum) {
    if(!root) return []
    let result = [], path = [];
    result = findPath(root, result, path, sum);
    return result;
};

function findPath(node, result, path, remain) {
    if(!node) return
    if(!node.left && !node.right && remain - node.val === 0 ){
        path.push(node.val);
        result.push(path.slice());
        path.pop();
    }
    path.push(node.val);
    findPath(node.left, result, path, remain-node.val);
    findPath(node.right, result, path, remain-node.val);
    path.pop();
    return result;
}
```
