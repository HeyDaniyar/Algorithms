## Description

Given a binary tree, return the preorder traversal of its nodes' values.

For example:
Given binary tree {1,#,2,3},

```
1
  \
   2
  /
3
```
return [1,2,3]


## Solution

#### Recursive Solution
虽然都说了回调很简单，但是还是先复习一遍简单的先序遍历。

```js
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var preorderTraversal = function(root) {
    let result = [];
    return preOrder(root, result) || [];
};

function preOrder(node, result) {
    if(node) {
        result.push(node.val);
        preOrder(node.left, result);
        preOrder(node.right,result);  
        return result
    }
}
```



### Iteratively Solution
下面就让我们看看如何用stack来完成这个先序遍历。我们设定一个right栈来专门存放右节点，当左节点遍历完毕后，我们就可以从right栈中一个个取出右节点，从而完成先序遍历。

```js
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var preorderTraversal = function(root) {
    let right = [], node = root;
    const list = [];
    while(node) {
        list.push(node.val);
        if(node.right) {
            right.push(node.right)
        }
        node = node.left;
        if(!node && right.length > 0) {
           node = right.pop();
        }
    }
    return list
};



```
