## Description

Given a binary tree, return the postorder traversal of its nodes' values.

For example:
Given binary tree {1,#,2,3},

```js
1
   \
    2
   /
  3
```
return [3,2,1].

## Solution

#### Recursive Solution
先上回调的方法，很简单，无需多言。

```js
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
 var postorderTraversal = function(root) {
   let node = root, result = [];
   return postOrder(node, result) || [];

 }

 function postOrder(node, result) {
   if(node) {
     postOrder(node.left, result);
     postOder(node.right, result);
     result.push(node.val);
     return result
   }
 }
```
#### Iterative Solution
这道题虽然也是用stack的方法，但是实施很tricky,因为后续遍历的顺序是LRD，而前序的顺序是DLR,那我们只要对谦虚稍加修改使其变成DRL然后再输出list的倒置，就是我们需要的后置，完美诠释tricky！


```js

var postorderTraversal = function(root) {
    const list = [], stack = [], left = [];
    let node = root;
    while(node) {
        list.push(node.val);
        if(node.left) {
            left.push(node.left);
        }
        node = node.right;
        if(!node && left.length > 0) {
            node = left.pop();
        }
    }
    return list.reverse()

};
```
