## Description

You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order and each of their nodes contain a single digit. Add the two numbers and return it as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.


```
Input: (2 -> 4 -> 3) + (5 -> 6 -> 4)
Output: 7 -> 0 -> 8
```

## Solution
只需要顺序遍历，需要考虑多种情况，如链表同时存在，一个链表存在一个不存在，还有进位等。

```js
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
   let carry = 0, cur = 0, head = new ListNode(-1), list = head;
   while(l1 || l2) {
       if(l1 && l2) cur = l1.val + l2.val
       else  {
        cur = l1 ? l1.val: l2.val;
       }
       if(carry) {
           cur += carry;
           carry = 0;
       }
       if(cur > 9) {
           carry++;
           cur = cur - 10;
       }
       list.next = new ListNode(cur);
       list = list.next;
       l1 = l1 && l1.next;
       l2 = l2 && l2.next;
   }
   if(carry) list.next = new ListNode(carry);
   return head.next
};
```
