## Reverse a singly linked list.

## Solution

虽然是一道很简单的反转链表的题目，但是对于题目的具体操作还是有点朦胧不解。为了整理一下思绪，所以下面好好表述一下每个过程。

### Iteration
这个思路就直接拿一个简单例子去构思一下即可。比如说对于链表`1->2->3->4`,很明显我需要先将链表一分为二，让`1`后面跟着`null`并保存为`prev`,然后再去遍历2，3，4，同样再一分为2,
让2后面跟着之前的prev，再去让遍历`3->4`。不难看出规律，除了第一个以外，每次一分为二后都要上第一个元素跟着之前的元素，那我们就可以设`prev`的初始值为null，代码就很清晰了。

```js
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
    let prev = null, curr = head;
    while (curr !== null) {
        const nextTemp = curr.next;
        curr.next = prev;
        prev = curr;
        curr = nextTemp;
    }
    return prev;
};

```

### Recursively
整体思路都是一样的，只不过实现方式变成了递归的方法。

```js
var reverseList = function(head) {
    if(!head) return null
    let next = head.next;
    head.next = null;
    return helper(head, next);
};

function helper(prev, curr){
   if(!curr) return prev
    const temp = curr.next;
    curr.next = prev;
    helper(curr, temp);
}
```
