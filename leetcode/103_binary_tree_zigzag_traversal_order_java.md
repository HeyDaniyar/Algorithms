## Solution 
Recursive solution using "level"

```java
public class Solution {
    public List<List<Integer>> zigzagLevelOrder(TreeNode root) {
        List<List<Integer>> res = new ArrayList<>();
        helper(res, root, 0);
        return res;
    }

    private void helper(List<List<Integer>> res, TreeNode node, int level) {
        if (node == null) return;
        if (level >= res.size()) res.add(new ArrayList<>());
        List<Integer> list = res.get(level); //Not getting the last one, cause we do left and right separately
        if (level % 2 == 0) list.add(node.val);
        else list.add(0, node.val);
        helper(res, node.left, level + 1);
        helper(res, node.right, level + 1);
    }
}
```

Iterative Solution using Queue

```java
public class Solution {
    public List<List<Integer>> zigzagLevelOrder(TreeNode root) {
        List<List<Integer>> res = new ArrayList<>();
        if (root == null) return res;
        Queue<TreeNode> q = new LinkedList<>();
        q.add(root);
        boolean order = true;
        int size = 1;
        while (!q.isEmpty()) {
            List<Integer> list = new ArrayList<>();
            for (int i = 0; i < size; i++) {
                TreeNode node = q.poll();
                if (order) list.add(node.val);
                else list.add(0, node.val); 
                if (node.left != null) q.add(node.left); //LinkedList call "add()" not "push()"
                if (node.right != null) q.add(node.right);
            }
            res.add(list);
            size = q.size();
            order = !order;
        }
        return res;
    }
}
```

## Analysis 
We need to add each "row" as a list to our res, you need to think about traversal first   
For each "row", we can use `level` to remark it and add all of them together in the same list    
Hence we come up with a recursive function to traversal all nodes  
We create a `new ArrayList<>()` only if level >= `res.size()`, and we get the order by `level % 2`  
Every time we call the recursive function, we just increment the `level` by 1, and pass `node.left` then `node.right`

For the iterative solution, we use a `Queue` to put `TreeNodes` in it   
As long as the `q` is not empty, we create a `new ArrayList<>()` then do a for loop from 0 to `q.size()`   
We add the `node.val` to our list and add `node.left` and `node.right` into the queue if they are not null  
Notice that we need to check the corner case when given `root` is null at the beginning 



