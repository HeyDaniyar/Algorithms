## Description

Given a linked list, return the node where the cycle begins. If there is no cycle, return null.

Note: Do not modify the linked list.

## Solution

这道题也是属于寻找特定的位置节点题。只不过找到环的开始有一个技巧，那就是让一个指针先按2x的速度遍历list，一个指针正常速度遍历，如果有环的话那肯定两者会在某一点
相遇。此时让一个指针回到原点，两个指针都以正常速度遍历，那两个指针再次相遇的一点肯定是环的起点，神奇的规律。有了这个规律，代码就很好编写了

```js
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var detectCycle = function(head) {
    let slow = head, fast = head;
    while(fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        if(fast === slow) break;
    }
    if(!fast || !fast.next) return null
    fast = head;
    while(fast !== slow) {
        fast = fast.next;
        slow = slow.next;
    }
    return fast
};
```