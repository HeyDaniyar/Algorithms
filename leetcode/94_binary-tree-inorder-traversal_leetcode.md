## Description

Given a binary tree, return the inorder traversal of its nodes' values.

For example:
Given binary tree [1,null,2,3]

```js
1
   \
    2
   /
  3
```

## Solution
同样先上中序遍历的回调实现。
#### Recursive
```js
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function(root) {
   let result = [];
   return inOrder(root, result) || []
};

function inOrder(node, result) {
    if(node) {
        inOrder(node.left, result);
        result.push(node.val);
        inOrder(node.right,result)
        return result
    }
}
```

#### Iterative
巧妙的入栈方法，不知道这个思路是怎么想出来的？是一个个试验试出来的呢还是按照某一规律去总结得出？程序逻辑很清晰，无需多言。

```js
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function(root) {
    const list = [], stack = [];
    let node = root;
    while(node || stack.length > 0) {
        while(node) {
            stack.push(node);
            node = node.left;
        }
            node = stack.pop();
            list.push(node.val);
            node = node.right;
       }
    return list
};
```
