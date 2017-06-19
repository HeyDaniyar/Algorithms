## Solution 
```java
public class Solution {
    public boolean hasCycle(ListNode head) {
        if (head == null || head.next == null) return false;
        ListNode fast = head, slow = head;
        while (fast.next != null && fast.next.next != null) {
            fast = fast.next.next;
            slow = slow.next;
            if (fast == slow) return true;
        }
        return false;
    }
}
```

## Analysis 
Typical way to determine whether there is a cycle in a Linked List  
We have two pointers `fast` and `slow` and we update that with difference speeds(metaphor)  
If there is a cycle, they will meet eventually  
This algorithm with finding the start node in Linked List is called **Floyd's cycle finding algorithm**   