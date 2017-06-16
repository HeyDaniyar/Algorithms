## Solution 
My original solution using the same idea from *92 Reverse Linked List* in Leetcode  

```java
public class Solution {
    public ListNode reverseList(ListNode head) {
        if (head == null || head.next == null) return head;
        ListNode dummy = new ListNode(0);
        dummy.next = head;
        ListNode prev = dummy, next = head.next;
        while (next != null) {
            head.next = next.next;
            next.next = prev.next;
            prev.next = next;
            next = head.next; //Cannot be next.next cause it is already modified, stick to the "Cycle Rule"
        }
        return dummy.next;
    }
}
```

Optimal Iterative Solution 

```java
public class Solution {
    public ListNode reverseList(ListNode head) {
        ListNode newHead = null;
        while (head != null) {
            ListNode next = head.next;
            head.next = newHead;
            newHead = head;
            head = head.next;
        }
        return newHead;
    }
}
```

Optimal Recursive Solution 

```java
public class Solution {
    public ListNode reverseList(ListNode head) {
        return helper(head, null);
    }

    private ListNode helper(ListNode head, ListNode newHead) {
        if (head == null) return newHead;
        ListNode next = head.next;
        head.next = newHead;
        return helper(next, head);
    }
}

```

## Analysis 
There are three approaches to this problem  
The first one is my original thought after solving the Reverse Linked List II problem  
The second one is using iteration and has less variables  
The third one is recursion and I think it is the most understandable one   