/*
 * @param {ListNode} head
 * @return {ListNode}
 */

//mine iterative Solution
var swapPairs = function(head) {
  let node = head;
  while (node && node.next) {
    let temp = node.val;
    node.val = node.next.val;
    node.next.val = temp;
    node = node.next.next;
  }
  return head
};

//recursively
var swapPairs = function(head) {
  if (head === null || head.next === null) return head;
  let node = head.next;
  head.next = swapPairs(node.next);
  node.next = head;
  return node;
};
