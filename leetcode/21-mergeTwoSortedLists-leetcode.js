/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */


var mergeTwoLists = function(l1, l2) {
  var mergedHead = {
    val: -1,
    next: null
  };
  var crt = mergedHead;

  while (l1 && l2) {
    if (l1.val > l2.val) {
      crt.next = l2;
      l2 = l2.next;
    } else {
      crt.next = l1;
      l1 = l1.next;
    }
    crt = crt.next;
  }

  crt.next = l1 || l2;
  return mergedHead.next;
}
