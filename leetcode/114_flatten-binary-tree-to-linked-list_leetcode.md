## Description

Given a binary tree, flatten it to a linked list in-place.

For example,
Given
```js

    1
   / \
  2   5
 / \   \
3   4   6
```
The flattened tree should look like:
```js
1
 \
  2
   \
    3
     \
      4
       \
        5
         \
          6
```

## Soltuion

仔细不难发现这个整个二叉树的变形是遵循先序循环的 ，所以我们可以用先序循环得出数组后然后再修改root。

```js

/**
 * @param {TreeNode} root
 * @return {void} Do not return anything, modify root in-place instead.
 */
var flatten = function(root) {
    let result = preOrder(root, [])||[], node = root;
    for(let i = 1; i< result.length; i++) {
       if(node){
           node.left = null;
           node.right = new TreeNode(result[i])
           node = node.right;
       }
    }
};

function preOrder(node, result) {
    if(node) {
        result.push(node.val);
        preOrder(node.left, result);
        preOrder(node.right, result);
        return result;
    }
}
```

#### 解法二

来自discuss。现在真是每次看完discuss，都有一种望洋兴叹的感觉。
```js

var flatten = function(root) {
    let prev = null;
    transfered(root);

    function transfered (node) {
        if (!node) return
        transfered(node.right);
        transfered(node.left);
        node.right = prev;
        node.left = null;
        prev = node;
    }
};
```
$$P = SUM(  C(1,15) + C(14,15)  + C(13,15) + …. C(N,15)) $$
