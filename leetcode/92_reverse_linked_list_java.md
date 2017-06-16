## Solution 
```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) { val = x; }
 * }
 */
public class Solution {
    public ListNode reverseBetween(ListNode head, int m, int n) {
        if (head == null || head.next == null) return head;
        ListNode dummy = new ListNode(0); //a reference to return head at the end 
        dummy.next = head;
        ListNode prev = dummy;
        for (int i = 1; i < m; i++) prev = prev.next;
        ListNode start = prev.next, next = start.next;
        //Amazing for loop to reverse a Linked List 
        for (int i = 0; i < n - m; i++) {
            start.next = next.next;
            next.next = prev.next;
            prev.next = next;
            next = start.next;
        }
        return dummy.next;
    }
}
```

## Analysis 
We need to reverse a Linked List from `m` to `n`, including the middle ones between `m` and `n`  
We first create a dummy ListNode to keep the reference of `head`  
This is important because we will modify the reference of `head` later so set `dummy.next = head`   
Then we find the previous one right before the start of rotation, where we set it to `prev`   
Then we init our `start` and `next` ListNode  
We use a for loop with length `n - m` to make the rotation successful  
We first set `start.next = next.next` then since we modify the `next.next` we just update it and continue   
A crucial idea in updating Linked List or other connected elements is that we update the stuff we just modified  
You can see the details in our last for loop, the right side of `=` becomes the left side in next statement  
At the end, we return `dummy.next` which is the head of modified Linked List  