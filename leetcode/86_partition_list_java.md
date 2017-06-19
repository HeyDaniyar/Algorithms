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
    public ListNode partition(ListNode head, int x) {
        ListNode smallerHead = new ListNode(0), biggerHead = new ListNode(0);
        ListNode smaller = smallerHead, bigger = biggerHead;
        while (head != null) {
            if (head.val < x) {
                smaller.next = head;
                smaller = smaller.next;
            } else {
                bigger.next = head; 
                bigger = bigger.next;
            }
            head = head.next;
        }
        smaller.next = biggerHead.next;
        bigger.next = null; //To avoid cycle when given only two ListNodes ([2,1], 2) won't pass without this assignment to null.
        return smallerHead.next;
    }
}
```

## Analysis 
The problems seems tricky because we need to handle with the link in `ListNode` (next and previous)   
Also we are supposed to return original `head` at the end   
Therefore, we first construct two new dummy ListNodes `smallerHead` and `biggerHead`  
Then we have another **two pointers** pointing to the current smaller or bigger ListNode  
We do the `while` loop and check the value of current `head`  
If it's smaller than `x` we set move the `smaller` pointer to the next, otherwise we move the `bigger` pointer  
After finishing the loop, we set the `smaller.next = biggerHead.next` to connect the two parts  
Also, we need to set `bigger.next = null` to avoid cycles (example is given in comment)  
We guarantee that we return the original head because we never modify the `smallerHead` reference   
