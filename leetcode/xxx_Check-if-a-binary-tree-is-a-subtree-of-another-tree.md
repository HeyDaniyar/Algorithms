## Description
Given two binary trees s and t, check if t is a subtree of s. A subtree of a tree t is a tree consisting of a node in t and all of its descendants in t.

### Example
```
Given s:
     3
    / \
   4   5
  / \
 1   2

Given t:

   4
  / \
 1   2
```

Return true, because t is a subtree of s.

```
Given s:

     3
    / \
   4   5
  / \
 1   2
    /
   0

Given t:

     3
    /
   4
  / \
 1   2
```

## Solution
在程序员面试白皮书看到这道题，觉得这道题真的利用了很多DC的思想。
这个程序里容易想到的第一个递归是一层层去判断两树的左右节点是否都完全相同，只要有不同就返回false，即isTreeSame函数。
然而另外一个问题是什么时候调用这个函数，因为两个节点的相等不是平行，是父节点和子节点的相等。这时其实我们可以用另外的一个递归来判断什么时候去使用isTreeSame。


```js
/**
 * @param {TreeNode} tree1
   @param {TreeNode} tree2
 * @return {boolean}
 */
 function isSubTree(root1, root2) {
   //if tree2 is subtree of tree1
   if(!root1)  return false
   if(!root2) return true
   if(root1.val === root2.val) {
     if(isTreeSame(root1, root2) ){
       return true
     }
   }
   return isSubtree(roo1.left, root2) ||isSubtree(root1.right, root2)
 }

 function isTreeSame(node1, node2) {
   if(!node1 && !nood2) return true
   if(!node1 || !node2 || node1.val !== node2.val) return false
   return isTreeSame(node1.left, node2.left) && isTreeSame(node1.right, node2.right); 
 }
