##二叉树的几种遍历方式
根据遍历方式的不同，一般把二叉树的遍历方式分成先序遍历，中序遍历，后序遍历等。怎么记忆呢？

可以根据语义来记忆，如果把d想成`顶点`,l为左节点，r为右节点，三个遍历是这么个顺序：
- DLR: 先序遍历
- LDR： 中序遍历
- LRD： 后序遍历

几种遍历的递归访问方式不用多说，无非就是改变一下语句的位置，需要记住的是如何用栈来实现这几种遍历方式。

### 先序遍历

思路是在遍历node顶点后，让node等于他的左节点，就是先考虑左节点，不断将深入左节点，同时检测右节点是否存在，如果存在存在rightNode的stack中，当左节点不存在时，再去从stack中取出右节点，逐个遍历。
代码如下；
```js
function preorder(root) {
  const list = [], right = [];
  let node = root;
  while(node) {
    list.push(node.val);
    if(node.right) {
      right.push(node.right);
    }
    node = node.left;
    if(!node && right.length > 0) {
      node = right.top;
    }
  }
  return list;
}
```

### 中序遍历

思路是初始化stack数组，先让当前节点进入stack数组，并让node等于他的左节点，依次添加到stack中，等node不存在的时候，再去从stack中取出一个节点，这个节点应该就是左边最底部的节点，然后存在到list中，再让node等于他的右节点，因为不存在右节点，node又会变成从stack中取出的元素，此时的node应该是左边最底层节点的父节点，再让node等于他的右边节点，继续上述过程。
```js
function inorder(root) {
  const list = [], stack = [];
  let node = root;
  while(stack.length !== 0 || node) {
    if(node) {
      stack.push(node);
      node = node.left;
    }else{
      node = stack.pop();
      list.push(node.val);
      node = node.right;
    }
  }
  return list;
}
```
###后续遍历

思路和先序遍历一样，只不过我们需要这次先序变成DRL，然后再取数组的reverse，就可以取到后续遍历LRD
```js
function postOrder(root) {
  const list = [], stack = [], left = [];
  let node = root;
  while (node) {
    list.push(node.val);
    if (node.left) {
      left.push(node.left);
    }
    node = node.right;
    if (!node && left.length > 0) {
      node = left.pop();
    }
  }
  return list.reverse();
}
```

## 二叉树的一些常用操作

### 比较二叉树是否相等
最简单的方式是用递归的方式，如果需要用栈的方式来比较的话可以尝试用前面提到的栈遍历方式，同时对两个树进行遍历，如果发现不相等立即返回false
```js
//递归方式
function isSameTree(p, q) {
  if(!p && !q) return true
  if(!p || !q) return false
  if(p.val === q.val) {
    return isSameTree(p.left,q.left) && isSameTree(p.right, q.right);
  }
}

//非递归
function isSameTree(p,q) {
  const sp = [p], sq = [q];
  while(sq.length > 0 && sq.length > 0) {
    const pNode = sp.pop();
    const qNode = sq.pop();
    if(pNode.val !== qNode.val) return false
    if(pNode.right) sp.push(pNode.right);
    if(qNode.right) sq.push(qNode.right);
    if(sp.length !== sq.length) return false
    if(pNode.left) sp.push(pNode.left);
    if(qNode.left) sq.push(qNode.left);
    if(sp.length !== sq.length) return false
  }
  return sp.length === sq.length
}
```

### 比较二叉树是否对称
还是采用递归的方法，和比较两树相等，只是传餐顺序有变
```js
function isSymmetric(root) {

  const isSameTree = function() {
    if(!p && !q) return true
    if(!p || !q) return false
    if(p.val === q.val) {
      return isSameTree(p.left,q.left) && isSameTree(p.right, q.right);
    }
  }
  isSameTree(root, root);
}
```

### 反转二叉树

```js
//递归的方法
function inverTree(root) {
  if(!root) return null
  const node = root;
  const tmp = node.left;
  node.left = node.right;
  node.right = tmp;
  if(node.left) invertTree(node.left);
  if(node.right) invertTree(node.right);
  return root
}

//非递归
function invert(root) {
  const list = [], stack = [];
  let node = root;
  while(node || stack.length > 0) {
      if(node && (node.left || node.right)) {
          const temp = node.left;
          node.left = node.right;
          node.right = temp;
          stack.push(node.right);
      }
      if(node) {
          node = node.left;
      }else{
           node = stack.pop()
      }
  }
  return root
}
```

### 按深度输出BST
按深度去输出二叉搜索树，其实这就是按正序遍历二叉树的思想，只不过就需要加上每一个节点的层次。
所以，如果我们是用递归法，只需要加上level这个参数，如果我们是用栈的方法，那就在栈中添加一个包含level的对象元素即可。

```js
//递归
var levelOrder = function(root) {
    let node = root, result = [];
    const preOrder = function(node, result, level) {
      if(node) {
          if(!result[level]){
              result[level] = [];
          }
          result[level].push(node.val);
          preOrder(node.left, result, level+1);
          preOrder(node.right, result, level+1);
          return result;
      }
    }
    return preOrder(node, result, 0) || []
};

//非递归
var levelOrder = function(root) {
  if (!root) return [];
  const list = [], right = [];
  let node = { cur: root, level: 0};
  while (node.cur) {
    if(!list[node.level]) list[node.level] = [];
    list[node.level].push(node.cur.val);
    if (node.cur.right) {
      right.push({ cur: node.cur.right, level: node.level + 1 });
    }
    node = { cur: node.cur.left, level: node.level + 1 };
    if (!node.cur && right.length > 0) {
      node = right.pop();
    }
  }
  return list
};
```

### 输出二叉树中的深度最大的元素
用递归的方法，只需要把level以参数传入，每次递归level+1即可
```js
var maxDepth = function(root) {
    if(!root) return 0
    let maxDeepth = 0;
    const preOrder = function(node, level) {
        if(!node) return
        maxDeepth = Math.max(level, maxDeepth)
        preOrder(node.left, level+1);
        preOrder(node.right,level+1);
    }
    preOrder(root, 0);
    return maxDeepth + 1
};
```


### 找到二叉搜索树中第k小的元素

第一种最简单的方法就是用中序遍历来遍历二叉树，因为中序遍历的结果就是二叉树从小到大的排列，所以我们只需在遍历的过程每次让k-1，然后等k=0的将此时的node.val设置为number，即第k小的元素就是这个number
```js
var kthSmallest = function(root, k) {
  const list = [];
  let number;
  const inOrder = function(node){
     if(!node)  return
     inOrder(node.left)
     k--;
     if(k === 0)  {
         number = node.val;
         return
     }
    inOrder(node.right);
  }
  inOrder(root)
  return number
};
```

### 删除二叉搜索中等于key的元素 [leetcode465](https://leetcode.com/problems/delete-node-in-a-bst/#/description)
这个题的思路还是以递归的方式去解决。首先，因为BST的左节点< 父节点 < 右节点，
所以先让node值和key值进行比较，如果当前值大于key，则将root.left作为新节点递归，否则就是root.right。
有一个需要注意的问题是，当发现节点值和key值相等，而且左右节点都存在时，我们应该用getMin去获取右节点的最小值，找到后用最小值代替root.val,并把找到的那个最小值删除，所以还需要再次调用deNode(root.right,root.val);

```js
var deleteNode = function(root, key) {
  //for get Min node
  const getMin = function(root) {
      let min = root.val;
      while(root.left) {
          root = root.left;
          min = root.val;
      }
      return min
  }

  const delNode = function(root, key) {
      if(!root) return root
      if(root.val > key) root.left = delNode(root.left, key);
      else if(root.val < key) root.right = delNode(root.right, key);
      else{
          if(!root.left) return root.right
          if(!root.right) return root.left
          //当root两个节点都存在时
          root.val = getMin(root.right);
          root.right = delNode(root.right, root.val);
      }
      return root
  }
  return delNode(root,key);
};
```

##给出一个二叉树的中序和倒序排序 构建二叉树本身

这道题也是用递归去解决。首先postorder的最后即是root.value,我们再通过遍历inorderList来发现值等于root的节点位置rootIndex，根据这个rootIndex再去把数组分为左右两部分，再去递归构建。

思考的时候最好举一个简单的例子，不然很难想明白传餐的时候复杂的算术关系。
举例来说：
```js
in-order:   4 2 5  (1)  6 7 3 8
post-order: 4 5 2  6 7 8 3  (1)
```

我们可以通过画图构建出这个二叉树的模型：

![二叉树构建](http://www.programcreek.com/wp-content/uploads/2013/01/construct-binary-tree-from-inorder-and-postorder-traversal-150x150.jpg)

在找到rootValue为1后，我们分别把245，3786当做数组两部分分别构建，再分别进行递归操作。

```js
function buildTreePostIn(inorder, postorder) {
  const inStart = 0, postStart = 0;
  const inEnd = inorder.length - 1, postEnd = postorder.length -1;

  return buildTree(inorder, inStart, inEnd, postorder, postStart, postEnd);
}

function buildTree(inorder, inStart, inEnd, postOrder, postStart, postEnd) {
  if(inStart > inEnd || postStart > postEnd) return null
  //The last element in postorder is the root.
  const rootValue = postorder[postEnd];
  const root = new TreeNode(rootValue);


  //find the index of the root from inorder. Iterating from the end.
  let rootIndex = 0;
  for(let i = 0; i < inorder.length; i++) {
    if(inorder[i] === rootValue) {
      rootIndex = i;
      break;
    }
  }
  //build right and left subtrees. Again, scanning from the end to find the sections.
  // rootIndex - (inStart + 1) is mean to get the length
  root.left = buildTree(inorder, inStart, rootIndex - 1, postorder, postStart, postStart + rootIndex - (inStart +1));
  root.right = buildTree(inorder, rootIndex + 1, inEnd, postorder, postStart + rootIndex - inStart, postEnd - 1)
}
```


## 给出一个二叉树中的前序和中序排序，构建二叉树本身
和上题一样的思路，同样要考虑递归函数传参的问题。

```js
var buildTree = function(preorder, inorder) {
  const preStart = 0, inStart = 0;
  const preEnd = preorder.length - 1, inEnd = inorder.length - 1;

  return buildTreeHelper(preorder, preStart, preEnd, inorder, inStart, inEnd)
};

function buildTreeHelper(preorder, preStart, preEnd, inorder, inStart, inEnd) {
  if(preStart > preEnd || inStart > inEnd) return null
  // the first element in preorder is the root;
  const rootValue = preorder[preStart];
  const root = new TreeNode(rootValue);
  // find the index of the root from inorder
  let index = 0;
  for(let i = 0 ; i < inorder.length; i++) {
    if(inorder[i] === rootValue) {
      index = i;
      break;
    }
  }
  //build right and left subtrees
  root.left = buildTreeHelper(preorder, preStart + 1, preStart + index - inStart, inorder, inStart, index - 1);
  root.right = buildTreeHelper(preorder, preStart + index - inStart + 1, preEnd, inorder, index + 1, inEnd);
  return root
}
```

## 将一个有序数组变为二叉搜索树
同样递归的思想。遍历整个数组，找到数组的中间值，这个中间值肯定就是整个数组的根元素。如果把这个中间值index记录为mid，
则从first 到 mid - 1就是树的左节点，mid+1到last是这个树的右节点，调用递归函数继续生成左右节点即可。

```js
var sortedArrayToBST = function(nums) {
    if(nums.length < 1) return null
    if(nums.length === 1) return new TreeNode(nums[0])
    const first = 0;
    const last = nums.length - 1;
    return helper(nums, first, last)
};

function helper(nums, first, last) {
    if(first > last) return null
    if(first === last) {
        const parent = new TreeNode(nums[first]);
        return parent
    }
    const mid = Math.floor((first+last)/2);
    const leftChild = helper(nums, first, mid - 1);
    const rightChild = helper(nums, mid+1, last);
    const parent = new TreeNode(nums[mid]);
    parent.left = leftChild;
    parent.right = rightChild;
    return parent;
}
```

## 将二叉树转为链表
二叉树和链表的不同之处在于，二叉树是一个节点有左右两个节点属性，而链表是只有一个节点属性，而且都是连在一个节点上，这就可以让链表想成一个只有右节点没有左节点的特殊二叉树。
```js
   1
  / \
 2   5
/ \   \
3   4   6

1
 \
  2
   \
    3
     \
      4
       \
        5
         \
          6

```
所以我们只需要DFS遍历整个二叉树，遍历到最底后将node的right遍历给上一个元素(初始为null)，一层层返回即可。


```js
var flatten = function(root) {
    let prev = null;
    transfered(root);

    function transfered (node) {
        if (!node) return
        transfered(node.right);
        transfered(node.left);
        node.right = prev;
        node.left = null;
        prev = node;
    }
};
```

## 将有序链表转化为二叉搜索树
首先最容易想到的思路是先遍历链表，将链表转化为有序数组，再使用我们上面提到的方法👆将有序数组转化为二叉搜索树。另外就是直接去用两倍的速度去遍历链表，找链表的中间值，此中间值就是root，然后将链表的前半部分当做leftpart继续递归寻找中间值，把链表后半部分当成rightpart进行递归。思路整体和将数组转换为二叉树差不多，不同的地方在于传递链表的前部和后部与数组的不同，数组需要改变index值，而找到一个链表的前部和后部我们可以通过多传递一个tail的参数，即代表链表的尾部，遍历的时候去是否链表尾部为tai为找到中间值。

```js
var sortedListToBST = function(head) {
  if(!head) return null
  return helper(head,null)

  function helper(head, tail) {
    let slow = head, fast = head;
    if(head === tail) return
    while(fast !== tail && fast.next !== tail) {
      fast = fast.next.next;
      slow = slow.next;
    }
    const root = new TreeNode(slow.val);
    root.left = helper(head, slow);
    root.right = helper(slow.next, tail)
    return root;
  }
}
```

## 判断是否为子二叉树树
题目要求子二叉树必须和父二叉树的某一节点有一模一样的结构和数值，也就是说我们不能用遍历之后的两个数组来判断，因为遍历之后的数组不具备结构，无法保证结构的一致性。最简单的方法是用迭代去判断一个树的左右节点和另外一个子树是否相等，如果相等，立即返回true

```js
var isSubtree = function(s, t) {
  if(!t || !s) return false
  if(isSameTree(s,t)) return true
  return isSubtree(s.left, t) || isSubtree(s.right, t)
};

function isSameTree(p, q) {
  if(!p && !q) return true
  if(!p || !q) return false
  if(p.val === q.val) {
    return isSameTree(p.left,q.left) && isSameTree(p.right, q.right);
  }
}
```

## 计算所有孤立左节点的总值

没有什么特殊的思路，用逆中序遍历来遍历数组，当开始从left栈中取出节点的时候，判断他是不是孤立节点，即没有任何左右节点，如果是则加入到list中，最后计算list的总值

```js
var sumOfLeftLeaves = function(root) {
    const left = [],list = [];
    let node = root;
    while(node) {
        if(node.left) {
            left.push(node.left);
        }
        node = node.right;
        if(!node && left.length > 0) {
            node = left.pop();
            if(!node.left && !node.right) list.push(node.val)
        }
    }
    console.log('list',list)
    return list.length > 0 ? list.reduce((a,b) => a + b):0
};
```

## 找出二叉树每一行的最大值
遍历二叉树的时候加上深度属性，最后构建出一个以深度为index的list数组，计算出list每一行的最大值接口

```js
var largestValues = function(root) {
    const list = [];
    const preOrder = ((node,deep) => {
        if(!node) return
        if(!list[deep]) list[deep] = []
        list[deep].push(node.val);
        preOrder(node.left, deep+1);
        preOrder(node.right, deep+1);
    })
    preOrder(root,0);
    const maxValue = [];
    list.forEach((item) => {
        maxValue.push(Math.max.apply(null,item));
    })
    return maxValue
};
```
