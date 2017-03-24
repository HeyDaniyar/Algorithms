## Description

Given a linked list, remove the nth node from the end of list and return its head.

For example,

``` js
Given linked list: 1->2->3->4->5, and n = 2.

After removing the second node from the end, the linked list becomes 1->2->3->5.
```

## Solution
对于寻找链表的特定位置时，可以用两个指针变量left和right以不同的速度访问该链表。一旦right链表为空了，则说明他到尽头了，那此时的left链表一定是当前我们所想要找到的特殊位置。
```js
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
   let left = head, right = head;
   if(!head)  return []
   for(let i = 0; i <  n; i++) {
       right = right.next;
   }
   if(!right) return head.next
   while(right.next){
       left = left.next;
       right = right.next;
   }
   if(left.next) {
       const tmp = left.next.next;
       left.next = tmp;
   }
   return head
};
```