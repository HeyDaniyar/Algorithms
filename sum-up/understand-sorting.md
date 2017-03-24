# 排序

首先，得清楚常用的排序方式，按我本人的熟悉度来分，有这些常用的排序方法

- #### 冒泡排序
冒泡排序应该是最熟悉的排序方法，原理非常简单，就是比较相邻的元素，如果第一个数比第二个数大，那就进行交换，一直交换到最后，然后再重新回到外循环，再去比较第二个数字和第三个数字的大小。

时间复杂度分析：$O(n2)$

空间复杂度分析： $O(1)$

```js
function bubbleSort(arr) {
  for(let i = 0; i < arr.length; i++) {
    for(let j = i+1; j < arr.length; j++) {
      if(arr[i] > arr[j]) {
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
      }
    }
  }
  return arr
}
```

- #### 插入排序
插入排序的思想是建立在把数组分为有序对和无序对。首先，我们认为数组第一个数字是有序的，所以我们就拿第二个数字和第一个数字比较，如果第二个数字比第一个数字大，刚好，将第二个插入到我们的有序对中，继续看第三个数字。如果第二个数字比第一个数字小，那我就去看第一个数字前有哪个数字比第二个数字小或者相等，一直看到没有数字。很明显，第一个数字前已经没有数字，所以我们将第二个数字和第一个数字互相交换即可，继续去看第三个数字。

```js
function insertionSort(arr) {
  for(let i = 1; i < arr.length; i++) {
    let current = arr[i];
    let j = i - 1;
    while(j >= 0 && arr[j] > current) {
      arr[j+1] = arr[j];
      j--;
    }
    arr[j+1] = current;
  }
  return arr;
}
```


- #### 二分插入排序

二分插入排序其实就是插入排序的升级版，在插入排序中，我们拿到新元素后，在已排序序列中是按从后到前的顺序进行比较。而二分查找排序是在已经排序的序列对中二分查找到一个第一个比他大的数字。 所以整体思路是：
  - 从第一个元素开始，该元素可以认为已经被排序；
  - 取出下一个元素，在已经排序的元素序列中二分查找到第一个比它大的数的位置；
  - 将新元素插入到该位置后；
  - 重复上述两步。


```js
function binaryInsertionSort(arr) {
  for(let i = 1; i < arr.length; i++) {
    let current = arr[i]; left = 0, right = i - 1;  
      while( left <= right) {
        const middle = parseInt(arr[left] + arr[right]/2);
        if(current < arr[middle]) {
            right = middle - 1;
        }else{
          left = middle + 1;
        }
      }
      // 找到比current小的元素，开始挪位
      for(let j = i - 1; j >= left; j--) {
        arr[j+1] = arr[j];
      }
      arr[left] = current;
  }
  return arr;
}

```
- ### 选择排序
选择排序也是把数组分为两个部分，一部分是未排序对，一部分是排序对。首先在未排序序列中找到最小（大）元素，存放到排序序列的起始位置，然后，再从剩余未排序元素中继续寻找最小（大）元素，然后放到已排序序列的末尾。以此类推，直到所有元素均排序完毕。
```js
function selectionSort(arr) {
  for(let i = 0; i < arr.length - 1; i++) {
    let min = arr[i], temp;
    for(let j = i + 1; j < arr.length; j++) {
      if(arr[j] < min) {
        temp = min;
        min = arr[j];
        arr[j] = temp;
      }
    }
    arr[i] = temp;
  }
  return arr;
}
```

- ### 快速排序

快速排序的思想是，选中一个中间pivot基准值元素，重新排列数列，所有比基准值小的都放基准值左边，比基准值大的放右边。这样就是实现了把一个串分为两个子串。然后我再让这两个子串进行递归操作，最终就可以获得我们想要的结果。

```js
function quickSort(arr) {
  if(arr.length <= 1) return arr;
  let pivotIndex = Math.floor(arr.length/2);
  let pivot =  arr.splice(pivotIndex, 1)[0], left = [], right = [];
  for(let i = 0; i < arr.length; i++) {
    if(arr[i] <= pivot) left.push(arr[i])
    if(arr[i] > pivot) right.push(arr[i])
  }
  return quickSort(left).concat([pivot],quickSort(right));
}
```
其实，只要胆子大，用一行代码写快排也是可以的，因为基准值任意，我们完全可以让第一个元素变为基准值。

```js
function quickSort(a) {
  return a.length <= 1 ? a : quickSort(a.slice(1).filter(item => item < a[0])).concat(a[0],quickSort(a.slice(1).filter(item => item >= a[0])));
}
```
其实快速排序的本质上获得一颗二叉树，我们以数组`[2, 1, 3, 4, 7, 6, 5]`为例，代入数据到之前的快排算法中，堆栈中其实形成了一棵如下二叉树（二叉搜索树）：
```
  4
 /  \
1    6
 \  / \
  2 5  7
   \
    3
```
当递归到最底层向上回溯时，其实我们只需把父节点和左子树右子树的元素合并成一个数组就行了


- ### 归并排序

如果快速排序的本质是自上而下的构成一个二叉树，而归并排序就是自下而上的构成二叉树。我们继续以数组
`[1, 5, 6, 2, 4, 3]`举例，归并排序的第一步，将数组一分为2，接着将分成的数组继续一分为2，直到长度为1，我们构成如下二叉树：
```
       [1, 5, 6, 2, 4, 3]
      /                 \
[1, 5, 6]             [2, 4, 3]
/       \            /         \
[1]    [5, 6]      [2]       [4, 3]
      /    \                /    \
     [5]   [6]             [4]   [3]
```

当递归到了尽头，我们向上回溯，对于两个有序的数组，我们将它们合并成一个有序数组，从而完成整个归并排序（归并 从下往上）：
```
        [1, 2, 3, 4, 5, 6]
       /                 \
  [1, 5, 6]             [2, 3, 4]
 /       \            /         \
[1]    [5, 6]      [2]       [3, 4]
        /    \                /    \
      [5]   [6]             [4]   [3]
```
代码如下：

```js
function merge(left, right) {
  let temp = [];
  while(left.length && right.length) {
    if(left[0] < right[0]){
      temp.push(left.shift())
    }else{
      temp.push(right.shift())
    }
  }
  return temp.concat(left, right);
}

function mergeSort(arr) {
  if(arr.length <= 1) return arr
  let mid =  Math.floor(arr.length/2),
  left = arr.splice(0, mid),
  right = arr.slice(mid);
  return merge(mergeSort(left), mergeSort(right));
}

```

- ### 堆排序


- ### 复杂度分析




### 参考文章

- [前端也要学点算法- 韩子池](http://www.cnblogs.com/zichi/p/4796727.html)
- [常用排序算法之JavaScript实现 ](https://segmentfault.com/a/1190000000656344)
