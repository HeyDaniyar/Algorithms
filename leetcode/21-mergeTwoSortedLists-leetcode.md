## Description
merge two sorted list


## Solution
无需多言
```js
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */

var mergeTwoLists = function(l1, l2) {
  const mergedHead = new ListNode(-1);
  let current = mergedHead;
  while (l1 && l2) {
    if (l1.val > l2.val) {
      current.next = l2;
      l2 = l2.next;
    } else {
      current.next = l1;
      l1 = l1.next;
    }
    current = current.next;
  }

  current.next = l1 || l2;
  return mergedHead.next;
}
