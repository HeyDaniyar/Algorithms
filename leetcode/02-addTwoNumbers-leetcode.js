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

/**mine Solution
 this solution works out only when l1 and l2 is not big list
 when the num1 + num2 is get bigger than js can represent
 this solution cannnot work
**/
var addTwoNumbers = function(l1, l2) {
  let num1 = parseInt(convertList(l1));
  let num2 = parseInt(convertList(l2));
  return converToList(num1 + num2);

};

function convertList(head) {
  let arr = [];
  pushToArr(head);
  return arr.join('')

  function pushToArr(head) {
    if (!head) return
    arr.push(head.val);
    pushToArr(head.next);
  }
}

function converToList(num) {
  let current = new ListNode();
  let strArr = num.toString().split('');

  strArr.forEach((item) => {
    insertToLink(parseInt(item));
  })
  return current.next

  function insertToLink(val) {
    let newNode = new ListNode(val);
    newNode.next = current.next;
    current.next = newNode;
  }
}

/*
  compares to mine, this solution use shorter line to solve the problems
  and it also work in the situation that both linklist is huge
*/

var addTwoNumbers = function(l1, l2) {
  if (!l1 && !l2) return new ListNode(0);

  let carry = 0,
    currNode = null,
    firstNode = null;

  while (l1 || l2) {
    let a = (l1) ? l1.val : 0;
    let b = (l2) ? l2.val : 0;
    let sum = a + b + carry;

    if (sum >= 10) {
      sum = sum % 10;
      carry = 1;
    } else {
      carry = 0;
    }

    let newNode = new ListNode(sum);

    if (!currNode) {
      firstNode = newNode;
      currNode = newNode;
    } else {
      currNode.next = newNode;
      currNode = newNode;
    }

    //go to next
    l1 = (l1) ? l1.next : l1;
    l2 = (l2) ? l2.next : l2;

    if (carry) {
      let newNode = new ListNode(carry);
      currNode.next = newNode;
      currNode = newNode;
    }
    return firstNode;
  }
}
