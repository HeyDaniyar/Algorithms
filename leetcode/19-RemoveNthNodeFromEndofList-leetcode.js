//my solution
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
    var current = head, node = head,index = 0, previous,length = 0,;;
    while(node){
        node = node.next;
        length++
    }
    var position = length - n;
    if(position === 0){
        head = current.next;
        return head;
    }
    while(index++ < position){
        previous = current;
        current = current.next;
    }
    previous.next = current.next;
    return head;
};

//better Solution in leetcode
var removeNthFromEnd = function(head, n) {
  var start = new ListNode();
  // start and fast and slow are same
  var slow = start, fast = start;
  slow.next = head;

  //the twp loop use the gap to find the normal index of the remove element
  //listNode fast change,but slow are still equal to private head;
  for(var i = 1; i++ <= n+1){
    fast = fast.next;
  }

  while(fast !== null){
    slow = slow.next;
    fast = fast.next;
  }
  //find the remove element
  slow.next = slow.next.next;
  return start.next;
};
