## Problem 
Given a linked list, return the node where the cycle begins. If there is not cycle, return `null`.  
Note: Do not modify the linked list.    

## Solution 
```java
public class Solution {
    public ListNode detectCycle(ListNode head) {
        if (head == null || head.next == null) return null; //Cannot return head cause head.next can be null but head is not null  
        ListNode fast = head, slow = head, start = head;
        while (fast.next != null && fast.next.next != null) {
            fast = fast.next.next;
            slow = slow.next;
            if (fast == slow) {
                while (start != slow) {
                    start = start.next;
                    slow = slow.next;
                }
                return start;
            }
        }
        return null;
    }
}
```


## Analysis 
The algorithm used in this solution is called **Floyd's Cycle Detection** algorithm   
In my original solution, I tried to return as long as `fast == slow`  
However, it failed because we cannot guarantee that `fast` and `slow` just meet at the start of cycle  
Therefore, we have another variable `start`, which init to `head`  
When we detect cycle, we use `start` and `slow` to try to find the beginning of the cycle  
Cheers to **Floyd**!     
