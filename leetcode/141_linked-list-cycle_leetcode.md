## Description 

Given a linked list, determine if it has a cycle in it.

Follow up:
Can you solve it without using extra space?

## Solution

找出环的起点的简单版，设定快速和慢速指针，只需要两个不同速度的指针能否相遇即可。当然也要考虑本身`head === head.next`的特殊情况

```js

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function(head) {
    if(!head) return false
    if(head === head.next) return true
    let fast = head, slow = head;
    while(fast && fast.next) {
        fast = fast.next.next;
        slow = slow.next;
        if(slow === fast) return true
    }
    return false
};
```