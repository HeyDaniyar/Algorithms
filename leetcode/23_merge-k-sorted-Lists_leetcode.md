## Description

Merge k sorted linked lists and return it as one sorted list. Analyze and describe its complexity.


## Solution

递归解法
```js
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function(lists) {
    if(lists.length === 0) return null
    let current = lists[0];
    for(let i = 1; i <= lists.length; i++) {
        current = mergeTwoList(current, lists[i]);
    }
    return current
};

function mergeTwoList(l1,l2){
  let newHead = new ListNode(-1), current = newHead;
  while(l1 && l2) {
    if(l1.val > l2.val){
        current.next = l2;
        l2 = l2.next;
    }else{
        current.next = l1;
        l1 = l1.next;
    }
    current = current.next;
  }
  current.next = l1||l2||[];

  return newHead.next;
}
```
