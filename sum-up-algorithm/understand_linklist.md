# 掌握链表

在熟悉链表后，发现链表是一个很有趣的数据结构，对链表的操作里可以体现出不同的编程思想，如dfs，递归，排序等。本篇主要记录一些典型的关于链表类的题目。

##链表定义，和数组的不同

链表是一种常见的数据结构，一般分为单向链表和双向链表。双向链表是在单向链表的基础上多了一个prev节点，用来指向之前元素。链表和数组具体有什么不同呢？

- 数组是将元素在内存中连续存放，由于每个元素占用内存相同，可以通过下标迅速访问数组中任何元素。但是如果要在数组中增加一个元素，需要移动大量元素，在内存中空出一个元素的空间，然后将要增加的元素放在其中。同样的道理，如果想删除一个元素，同样需要移动大量元素去填掉被移动的元素。如果应用需要 **快速访问数据**，很少或不插入和删除元素，就应该用数组

- 链表恰好相反，链表中的元素在内存中不是顺序存储的，而是通过存在元素中的指针联系到一起。比如：上一个元素有个指针指到下一个元素，以此类推，直到最后一个元素。如果要访问链表中一个元素，需要从第一个元素开始，一直找到需要的元素位置。但是增加和删除一个元素对于链表数据结构就非常简单了，只要修改元素中的指针就可以了。如果需要 **经常插入和删除元素** 就需要用链表数据结构了。

## 常用技巧

### dummy node
dummyNode是一个处理链表问题的常用方法，通常将链表的head元素赋给另外的一个值cur后，处理cur的值就相当于处理head，但是对cur我们又能改变其指向，让其指向另外的元素但是head却不受影响。
比如说，对于一个head`1->2->3->4`，如果我们进行如下操作：
```js
let cur = head;
cur.val = 100;
cur = cur.next;
```
我们会发现head最后会变成`100->2>3>4`,cur会是`2->3->4`,通过这种改变cur对象指向的办法我们可以对链表进行层层遍历。


### fast & slow
对于寻找链表的特定位置的题目，我们可以用两个指针变量，如fast和slow，或者right和left来用不同的速度遍历链表，比如我要找到距离表尾k个元素的位置，那我们可以让right前进k个节点，然后再让left和right同时前进，只要right到头了，此时left指向的位置也就是离终点k个位置的节点。除了了这种以外，我们还能用不同速度去访问链表，这样的情况在处理环形链表尤其常见。


## 典型的例题

下面有做过的题的一些总结：

#### 给定一个链表，返回链表中间点

用一倍速度和两倍速度来进行链表遍历，之后再进行第二次遍历即可找到中间点。

```js
function findMiddle(list) {
  if(!list || !list.next) return
  let slow = list, fast = list;
  while(fast) {
    slow = slow.next;
    fast = fast.next.next;
  }
  // slow is the middle node
  return slow.val
}
```
#### 给定一个链表，删除从后数第K个元素

同样用`fast&slow`方法，让fast先等于第K个元素，然后让slow指针从0开始遍历链表，当fast为null时即发现倒数第N个元素，删除即可。

```js
function deleteNode(list, k) {
    if(!list) return
    let fast = list, slow = list;
    for(let i = 0; i < k; i++) {
      if(!fast) return list
      fast = fast.next;
    }
    if(!fast) return list.next
    while(fast.next){
      slow = slow.next;
      fast = fast.next;
    }
    if(slow.next) {
      const tmp = slow.next.next;
      slow.next = tmp;
    }
    return list
}
```
#### 给定一个可能包含一个环的链表，如何确定它有环？如何找到环开始的节点

用一倍速度和两倍速度进行链表遍历，如果有环，两点一定能在某点相遇，相遇后再让某一指针回到顶部，两者再以相同速度前进。可以证明，第二次相遇的位置就是环的节点。

```js
var detectCycle = function(head) {
    let slow = head, fast = head;
    while(fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        if(fast === slow) break;
    }
    //如果没有发现环
    if(!fast || !fast.next) return null
    fast = head;
    while(fast !== slow) {
        fast = fast.next;
        slow = slow.next;
    }
    return fast
};
```


#### 合并两个sort链表

首先新建一个空指针head，设置head的dummyNode为p。对l1和l2的进行遍历，按照不同情况进行处理，如果l1和l2都存在，那就根据大小将l1或者l2赋给`p.next`,再处理特殊情况，比如一个链表已经为空，另一个链表还存在的时候，就将`p.next`直接等于还存在的元素，最后返回原来节点`head.next`即可。

```js
function mergeTwoLists(l1, l2) {
  const head = new ListNode();
  let p = head;
  while(l1 || l2) {
    if(l1 && l2) {
      if(l1.val < l2.val) {
        p.next = l1;
        l1 = l1.next;
      }else{
        p.next = l2;
        l2 = l2.next;
      }
      p = p.next;
    }else if (!l1) {
      p.next = l2;
      break;
    }else if (!l2) {
      p.next = l1;
      break;
    }
  }
  return head.next;
}
```
#### 合并k个sort的链表 LeetCode[23]
思路和合并连个sort的链表基本一致，难点在如何把k个sort的链表合并变成两个链表合并的问题，正解应该是用二分递归法，设置链表的left和right，找到中间数mid，每次再传递（list，left，mid）和（lists，mid+1，right），把链表集合二分后，再一个个递归进行merge处理。

```js
var mergeKLists = function(lists) {
    if(lists.length === 0) return null
    const helper = ((lists, left, right) => {
        if(left < right) {
            let mid = Math.floor((right+left)/2);
            console.log('mid',mid)
            return mergeTwoList(helper(lists,left,mid),helper(lists,mid+1,right));
        }
        return lists[left]||[]
    })
    return helper(lists, 0, lists.length -1)
};

//merge处理和合并两个数组一样
function mergeTwoList(l1,l2){
  console.log("l1",l1);
  console.log('l2',l2)
  let newHead = new ListNode(-1), curent = newHead;
  while(l1 && l2) {
    if(l1.val > l2.val){
        curent.next = l2;
        l2 = l2.next;
    }else{
        curent.next = l1;
        l1 = l1.next;
    }
    curent = curent.next;
  }
  curent.next = l1||l2||null;

  return newHead.next;
}
```

#### 给定一个链表，交换两个相邻的位置 [LeetCode24]
先交换当前节点和next节点的val值，然后再让节点向后退两位，即cur = cur.next.next即可

```js
function swapPairs(head) {
  if(!head) return
  let cur = head;
  while(cur && cur.next) {
    const tmp = cur.val;
    cur.val = cur.next.val;
    cur.next.val = tmp;
    cur = cur.next.next;
  }
  return head
}
```
#### 反转链表
比较死的方法是新疆一个链表，然后遍历链表并不断将旧链表赋值在新链表上。不浪费额外空间的方式是用递归的方法去解决,比较不好理解。

```js
//新建链表的方法, 浪费空间
function reverseList(list) {
  if(!list) return
  let prev = new ListNode();
  let head = list;
  while(head){
    const tmp = new ListNode(head.val);
    tmp.next = prev;
    prev = tmp;
  }
  return prev
}
//递归

function reverseList(list) {
  if(!list) return
  let next = list.next;
  list.next = null;

  const helper = ((prev, cur) => {
    if(!cur) return prev
    const temp = cur.next;
    cur.next = prev;
    helper(cur, temp);
  })
  return helper(list,next)
}
```

#### 从指定的第M个节点到第N个节点反转链表

```js
function reverseList(head) {
  if(!head) return
  const dummy = new ListNode(0);
  dummy.next = head;

  let pre = dummy;
  // make a pointer pre as a marker for the node start reversing
  for(let i = 0; i < m - 1; i++) {
    pre = pre.next;
  }
  //a pointer to the beginning of a sub-list that will be reversed
  let start = pre.next;
  // a pointer to a node that will be reversed
  let then = start.next;

  for(let i = 0; i < n-m; i++){
    start.next = then.next;
    then.next = pre.next;
    pre.next = then;
    then = start.next;
  }
  return dummy.next;
 }
```

#### 相加两个链表，分别以右对齐方式或者左对齐方式

对于左对齐来说，即
（1-> 7 -> 6) 和 （2->5->6) 等于（3->2->3->1) 我们顺序遍历，用常规方法即可,要注意进位，特别是在最后一位相加后还出现进位需要进行补位。

对于右对齐来说，可以栈的思想去处理。

```js
//左对齐相加
function addTwoNumbers(l1, l2) {
  let carry = 0, cur = 0;
  let head = new ListNode(-1), list = head;
  while(l1 || l2) {
    if(l1 && l2) {
      cur = l1.val + l2.val
    } else cur = l1 ? l1.val :l2.val
    if(carry) {
      cur += carry;
      carry = 0;
    }
    if(cur > 9) {
      carry ++;
      cur = cur - 10;
    }
    list.next = new ListNode(cur);
    list = list.next;
    l1 = l1 && l1.next;
    l2 = l2 && l2.next;
  }
  if(carry) list.next = new ListNode(carry);
  return head.next
}
//右对齐相加
function addTwonNumbers(l1, l2) {
let len = 0, num1 = 0, num2 = 0;
  const s1 = [], s2 = [];
  while(l1 || l2) {
    len ++;
    if(l1) {
      s1.push(l1.val);
      l1 = l1.next;
    }
    if(l2) {
      s2.puhs(l2.val);
      l2 = l2.next;
    }
  }
  let i = len - 1, prev = null, sum = 0;
  while(i -- >= 0) {
    sum += (s1.pop() || 0) + (s2.pop()|| 0);
    const tmp = new ListNode(sum % 10);
    tmp.next = prev;
    prev = tmp;
    sum = Math.floor(sum/10);
  }
  return prev.val === 0 ? prev.next : prev;
}
```
#### 从链表中删除节点值为value元素
思路就是用两个dummynode，一个是head的复制体cur，另一个是新建的一个节点list的复制体prev，
遍历的时候判断cur.val是否等于val，如果等于直接让cur变成下一个节点，如果不等于则让新链表的下一个节点链接cur，并让prev等于当前cur，然后让cur等于他的子节点，继续遍历。

另外一个思路就是先确保节点头不等于val值，然后比较遍历的子节点是否等于val，如果等于，即去除这个节点。否则就

```js
function removeElements(head, val) {
  if(!head) return null
  const list = new ListNode(-1);
  let prev = list, cur = head;
  while(cur) {
    if(cur.val ==== val) {
        cur = cur.next;
    }else{
      prev.next = cur;
      prev = cur;
      cur = cur.next;
    }
  }
  prev.next = cur;
  return list.next;
}
//Another
function removeElements(head, val) {
  while(head&& head.val === val) head = head.next;
  let cur = head;
  while(cur && cur.next) {
    if(cur.next.val ==== val) cur.next = cur.next.next
    else cur = cur.next;
  }
}
```
#### 删除重复元素，让每个元素只出现一次
和上一道题删除指定元素很相似，只要判断当前元素和下一个元素值是否相等即可

```js

function deleteDuplicates(head) {
  if(!head) return null
  const list = head;
  while(list && list.next) {
    if(list.val !=== list.next.val) {
      list = list.next;
    }else{
      list.next = list.next.next;
    }
  }
  return head
}
```

#### 删除重复元素，让每个元素一次都不要出现
思路是先去遍历链表元素，构建一个map结构，map中的key是元素值，value是出现次数，
然后再去遍历map并建立新的ListNode，最后返回新的ListNode。

还有一种思路是对于删除连续的重复元素，可以采取比较cur和cur.next的值的过程中也保持prev指针指向前一个元素，这样如果发现cur和cur.next相等，即可以令prev等于cur.next，从而删除整个元素
```js
function deleteDuplicates(head) {
  if(!head) return null
  const copy = new ListNode(-1);
  let prev = copy;
  let cur = head;
  while(cur) {
    while(cur.next && cur.val === cur.next.val) cur = cur.next;
    //这里比较巧妙
    if(pre.next === cur) {
      pre = pre.next;
    }else{
      pre.next = cur.next;
    }
    cur = cur.next;
  }
}


#### 重组链表，从` L: L0→L1→…→Ln-1→Ln,`修改为`L0→Ln→L1→Ln-1→L2→Ln-2→…`

- 先用不同倍速遍历链表找到链表中间值middle，
- 截取middle之后的链表部分并翻转
- 合并两个链表。
