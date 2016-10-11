//Reverse Linked List:
/** 遍历法
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
  var prev = null;
  var curr = head;
  while (curr != null) {
    var nextTemp = curr.next;
    curr.next = prev;
    prev = curr;
    curr = nextTemp;
  }
  return prev;
};

//迭代法

var reverseList_recursive = function(head) {
  if (!head) {
    return head;
  }
  var next = head.next;
  head.next = null;
  return reverse(next, head);
  function reverse(curr, prev) {
    if (!curr) {
      return prev;
    }
    next = curr.next;
    curr.next = prev;
    return reverse(next, curr);
  }
};
