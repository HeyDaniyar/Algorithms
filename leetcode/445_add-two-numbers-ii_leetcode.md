## Description
You are given two non-empty linked lists representing two non-negative integers. The most significant digit comes first and each of their nodes contain a single digit. Add the two numbers and return it as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.

Follow up:
What if you cannot modify the input lists? In other words, reversing the lists is not allowed.

Example:

```
Input: (7 -> 2 -> 4 -> 3) + (5 -> 6 -> 4)
Output: 7 -> 8 -> 0 -> 7
```

## Solution

用栈的办法，先构建两个list的倒序数组，再分别出栈去构建一个新链表。似乎空间复杂度会有点大。

```js
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
   let len = 0;
   const stackL1 = [], stackL2 = [];
   let num1 = 0, num2 = 0;
   // 构建l1和l2的stack数组
   while(l1 || l2) {
        len++;
        if(l1) {
            stackL1.push(l1.val);
            l1 = l1.next;
        }
        if(l2) {
            stackL2.push(l2.val);
            l2 = l2.next;
        }
   }
   let i= len - 1, carry = 0,  prev = null;
   while(i-- >= 0 ) {
      let cur = (stackL1.pop() || 0) + (stackL2.pop() || 0);
      if(carry) {
           cur += carry;
           carry = 0;
       }
       if(cur > 9) {
           carry++;
           cur = cur - 10;
       }
      const tempList = new ListNode(cur);
      tempList.next = prev;
      prev = tempList;
    }
    if(carry) {
       const tempList  = new ListNode(carry);
       tempList.next = prev;
       prev = tempList;
    }
    return prev
};

```
