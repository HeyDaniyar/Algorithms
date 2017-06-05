## Solution 
```java
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */
```

Recursion solution with no extra helper method 

```java
public class Solution {
    public String tree2str(TreeNode t) {
        if (t == null) return "";
        String result = t.val + "";
        String left = tree2str(t.left);
        String right = tree2str(t.right);
        if (left.equals("") && right.equals("")) return result;
        if (left.equals("")) return result + "()(" + right + ")";
        if (right.equals("")) return result + "(" + left + ")";
        return result + "(" + left + ")" + "(" + right + ")";
    }
}
```

Optimized Space using StringBuilder 

```java
public class Solution {
    public String tree2str(TreeNode t) {
        StringBuilder sb = new StringBuilder();
        helper(t, sb);
        return sb.toString();
    }

    private void helper(TreeNode t, StringBuilder sb) {
        if (t != null) {
            sb.append(t.val);
            if (t.left != null || t.right != null) {
                sb.append("(");
                helper(t.left, sb);
                sb.append(")");
                if (t.right != null) {
                    sb.append("(");
                    helper(t.right, sb);
                    sb.append(")");
                }
            }
        }
    }
}
```

## Analysis 
This is a typical traversal problem  
In the first solution, we traversal the given `TreeNode`, then it's left and it's right  
Then according to the result of traversal `left` and `right` we return the required string  

In the second solution we use `StringBuilder` to save space  
We add the current `TreeNode` val as long as it is not null  
Then we check whether it's left or right is null  
Notice that we must use `||` for `t.right` because we need to append the empty parenthesis `()` if the left is null  
