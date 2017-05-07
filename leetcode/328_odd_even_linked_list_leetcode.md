## My solution O(1) extra spaces
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
    public ListNode oddEvenList(ListNode head) {
        if(head == null || head.next == null) return head;

        ListNode evenHead = head.next, odd = head, even = evenHead;
        while(even != null && even.next != null) {
            odd.next = even.next;
            even.next = odd.next.next; // No need to check null cause even.next != null,
            odd = odd.next;
            even = even.next;
        }
        odd.next = evenHead;
        return head;
    }
} 
```

## Analysis 
This question requires O(1) extra space and O(#nodes) time complexity. At first, I thought creating three nodes before the loop is O(3) space. However, they all only count O(1) space cause they are not like map or array. 
The key to this question is just connecting the link in correct positions, pretty straightforward. 