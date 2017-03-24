## Description

Total Accepted: 99316
Total Submissions: 410820
Difficulty: Medium
Contributors: Admin
Given a list, rotate the list to the right by k places, where k is non-negative.

### Example:
Given 1->2->3->4->5->NULL and k = 2,
return 4->5->1->2->3->NULL.

## Solution
还是用两个不同速度的指针就可以解决问题。但是边界问题有点难确定，因为我必须还要让左右链表的位置发生变换，所以慢节点应该落在k之前的一个位置上。

```js
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var rotateRight = function(head, k) {
    let right = head, left = head;
    if(!head || k === 0) return head;
    for(let i = 0; i <= k; i++) {
        //when the k is eaqual to list length
        if(!right) return head
        right = right.next;
    }
    while(right) {
        left = left.next;
        right = right.next;
    }
    let remain = left.next, top = left.next;
    left.next = null;
    while(remain.next) {
        remain = remain.next;
    }
    remain.next = head;
    return top
};

```

我这个解法没有ac通过，原因是k有可能超出限制，虽然这一点我觉得有些扯。程序员面试白皮书里是这么写的:

```js
var rotateRight = function(head, k) {
  if(!head || k < 0) return null
  let cur = head, len = 1;
  while(cur.next) {
    len ++;
    cur = cur.next;
  }
  k = k%len;
  if(k === 0) return head
  // tail of the original list should link to the original head
  cur.next = head;
  cur = head;
  // find the split point
  for(let i = 0; i < len - k - 1; i++) cur = cur.next;
  let newTail = cur;
  let newHead = cur.next;
  newTail.next = null;
  return newHead
};
```
明显这个思路更清晰明了，首先算出整个list的长度，看k的位置具体是在哪里，然后通过将li整个head变成一个环的操作。然后再找到分割点，即是k的所在位置，这个位置就应该是新列表的尾部，头部就应该是这个点之后的部分。通过这样的一个拼接，新链表就出生了。
