## Solution
```java
/**
 * Definition for binary tree with next pointer.
 * public class TreeLinkNode {
 *     int val;
 *     TreeLinkNode left, right, next;
 *     TreeLinkNode(int x) { val = x; }
 * }
 */
public class Solution {
    public void connect(TreeLinkNode root) {
        while(root != null) {
            TreeLinkNode node = root;
            while(node != null && node.left != null) {
                node.left.next = node.right;
                node.right.next = node.next == null ? null : node.next.left;
                node = node.next;
            }
            root = root.left;
        }
    }
}
```

## Analysis 
This is a typical DFS solution. While first reading the problem, it seemed really hard for me to think of a accepted solution because I have no idea how to get the `node.right.next`. We use DFS each time in the while loop, and we are beneficial of the `next` we set earlier on the root node.   