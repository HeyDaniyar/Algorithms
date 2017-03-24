## Description

Given a singly linked list L: `L0→L1→…→Ln-1→Ln`,
reorder it to:`` L0→Ln→L1→Ln-1→L2→Ln-2→…``

You must do this in-place without altering the nodes' values.

For example,
Given ``{1,2,3,4}``, reorder it to ``{1,4,2,3}``.

##Solution
看似很简单的一道题，在边界条件上费了很长时间。。。思路是先将链表遍历，用栈去存储数组的值。然后再从头遍历数组，每两个节点之间添加节点，值即为出栈的元素。这个解法虽然思路清晰，但是有一点非常不好，就是对于奇数长度的节点和偶数长度的链表，最后要停止遍历并把之后链表值赋为null的方式不同，因为对于偶数节点，我会把中间元素重复使用。在最开始很容易忽略这一点造成错误。第一个解法代码如下：

```js
/**
 * @param {ListNode} head
 * @return {void} Do not return anything, modify head in-place instead.
 */
var reorderList = function(head) {
    if(!head || !head.next) return
    let node = head, i = 0;
    const list = getLinkList(node).reverse();
    while(node.next ) {
        const  newNode = new ListNode(list[i++]);
        const temp = node.next;
        node.next = newNode;
        newNode.next = temp;
        node = node.next.next;
        if(i >= Math.floor(list.length/2) ) {
          //停止第二次遍历的方式不同，很容易出错
            if(list.length % 2 === 0)  newNode.next = null;
            else node.next = null;
            break;
        }
    }
};

function getLinkList(node) {
    const list = [];
    while(node){
        list.push(node.val);
        node = node.next;
    }
    return list;
}

```
#### 解法二
第二种解法来自leetcode讨论，用了O(n)时间复杂度（第一个解法也是），但空间复杂度用了O(1)。具体是策略是

- 先用不同倍速遍历链表找到链表中间值middle
- 截取middle之后的链表部分并翻转
- 合并两个链表

整个代码用到了前面的一系列小技巧。越发感觉到其实一开始想起来得有点复杂的算法的很多就是前面的基础的常用数据结构技巧的搭配组合。如果对于之前的翻转链表，合并链表的代码很熟悉，那整个算法代码就是轻而易举。

```js
var reorderList = function(head) {
  if(!head || !head.next) return;
  //find the middle node
  let p1 = head, p2 = head.next;
  while(p2 && p2.next) {
    p1 = p1.next;
    p2 = p2.next.next;
  }

  let head2 = p1.next;
  p1.next = null;
  head2 = reverseList(head2);
  mergeTwoList(head, head2);
};

function reverseList(head) {
    let prev = null, cur = head;
    while(cur) {
        const tmp = cur.next;
        cur.next = prev;
        prev = cur;
        cur = tmp;
    }
    return prev
}

function mergeTwoList(p1, p2) {
    while(p1 || p2) {
        const tmp = p1.next;
        p1.next = p2;
        p1 = p1.next;
        p2 = tmp;
    }
}
```
