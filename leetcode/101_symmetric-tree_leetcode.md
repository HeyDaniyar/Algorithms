##Description

Given a binary tree, check whether it is a mirror of itself (ie, symmetric around its center).

For example, this binary tree [1,2,2,3,4,4,3] is symmetric:

```js
   1
  / \
 2   2
/ \ / \
3  4 4  3
```
But the following [1,2,2,null,3,null,3] is not:
```js
 1
/ \
2   2
\   \
3    3
```


## Soltuion

和上一道题判断是否相等很相似

```js
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function(root) {
    if(!root) return true
    return isSame(root, root);

};

function isSame(p, q) {
    if(!p && !q) return true
    if(!p || !q) return false
    if(p.val === q.val) {
        return isSame(p.left, q.right) && isSame(p.right, q.left)
    }
    return false
}
```
