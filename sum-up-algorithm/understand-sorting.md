# 排序

首先，得清楚常用的排序方式，按我本人的熟悉度来分，有这些常用的排序方法

## 冒泡排序
冒泡排序应该是最熟悉的排序方法，原理非常简单，就是比较相邻的元素，如果第一个数比第二个数大，那就进行交换，一直交换到最后，然后再重新回到外循环，再去比较第二个数字和第三个数字的大小。

时间复杂度分析：$O(n^2)$

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

## 插入排序
插入排序的思想是建立在把数组分为有序对和无序对。首先，我们认为数组第一个数字是有序的，所以我们就拿第二个数字和第一个数字比较，如果第二个数字比第一个数字大，刚好，将第二个插入到我们的有序对中，继续看第三个数字。如果第二个数字比第一个数字小，那我就去看第一个数字前有哪个数字比第二个数字小或者相等，一直看到没有数字。很明显，第一个数字前已经没有数字，所以我们将第二个数字和第一个数字互相交换即可，继续去看第三个数字。

下面是插入排序的动画演示：


![动画演示](https://sort.hust.cc/res/insertionSort.gif)

了解了思想，代码实现起来就很简单。
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

#### 性能分析:

**时间复杂度O(n^2), 空间复杂度O(1)**

排序时间与输入有关：输入的元素个数；元素已排序的程度。
最佳情况，输入数组是已经排好序的数组，运行时间是n的线性函数； 最坏情况，输入数组是逆序，运行时间是n的二次函数。

在待排数据基本有序的情况下,直接插入排序方法是效果最好。


## 二分插入排序

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
## 选择排序
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
#### 性能分析：

时间复杂度O(n^2), 空间复杂度O(1)
排序时间与输入无关，最佳情况，最坏情况都是如此, 不稳定


## 快速排序
快速排序的名字起的是简单粗暴，因为一听到这个名字你就知道它存在的意义，就是快，而且效率高。在平均状况下，排序 n 个项目要 Ο(nlogn) 次比较。在最坏状况下则需要 Ο(n2) 次比较，但这种状况并不常见。事实上，快速排序通常明显比其他 Ο(nlogn) 算法更快，因为它的内部循环（inner loop）可以在大部分的架构上很有效率地被实现出来。


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

除了这种递归写法以外，我们还有另外的一种非递归写法。

```js
function partition(nums, start, end) {
  const tmp = nums[start];
  while(start < end) {
    while(nums[end] >= tmp && start<end) end--;
    if(start < end) nums[start++] = nums[end];
    while(nums[start] <= tmp && start < end) start++;
    if(start < end) nums[end--] = nums[start];
  }
  nums[start] = tmp;
  return start
}
function quickSort(arr) {
  const start = 0, end = arr.length - 1;
  const stack = [];
  let left, right;
  if(start < end) {
    stack.push(end);
    stack.push(start);
    while(stack.length !== 0) {
      left = stack.pop();
      right = stack.pop();
      let index = partition(arr, left, right);
      if(left < index - 1) {
        stack.push(index - 1);
        stack.push(left);
      }
      if(right > index + 1) {
        stack.push(right);
        stack.push(index + 1);
      }
    }
  }
  return arr
}

```

#### 性能分析

时间复杂度：

最坏$O（n^2）$ 当划分不均匀时候 逆序或者排好序都是最坏情况

最好$O（n）$ 当划分均匀
partition的时间复杂度: O（n）一共需要logn次partition

空间复杂度：递归造成的栈空间的使用，最好情况，递归树的深度logn 空间复杂的logn，最坏情况，需要进行n‐1 递归调用，其空间复杂度为`O(n)`，平均情况，空间复杂度也为`O(log2n)`。
由于关键字的比较和交换是跳跃进行的，因此，快速排序是一种不稳定的排序方法。

快速排序的每一轮就是将这一轮的基准数归位，直到所有的数都归为为止，排序结束。（类似冒泡）. partition是返回一个基准值的index, index 左边都小于该index的数，右边都大于该index的数。

快速排序之所比较快，因为相比冒泡排序，每次交换是跳跃式的。每次排序的时候设置一个基准点，将小于等于基准点的数全部放到基准点的左边，将大于等于基准点的数全部放到基准点的右边。这样在每次交换的时候就不会像冒泡排序一样每次只能在相邻的数之间进行交换，交换的距离就大的多了。因此总的比较和交换次数就少了，速度自然就提高了。当然在最坏的情况下，仍可能是相邻的两个数进行了交换。因此快速排序的最差时间复杂度和冒泡排序是一样的都是 O(n^2)，它的平均时间复杂度为 O(nlogn)。其实快速排序是基于 “二分” 的思想。

## 归并排序

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

归并排序的动画演示如下：


![动画演示](https://sort.hust.cc/res/mergeSort.gif)

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
  left = arr.slice(0, mid),
  right = arr.slice(mid);
  return merge(mergeSort(left), mergeSort(right));
}

```

#### 性能分析：
时间复杂度 O(nlogn), 排序时间与输入无关，最佳情况，最坏情况都是如此, 稳定。

由于归并排序在归并过程中需要与原始记录序列同样数量的存储空间存放归并结果 以及 递归时深度为 log_2n 的栈空间，因此空间复杂度为O(n+logn)。

**也就是说，归并排序是一种比较占用内存，但却效率高且稳定的算法。**


## 堆排序

### 数据结构 - 堆
理解堆排序，首先要理解堆的含义，堆可以近似等于一个完全二叉树，完全二叉树的一个“优秀”的性质是，除了最底层之外，每一层都是满的，这使得堆可以利用数组来表示（普通的一般的二叉树通常用链表作为基本容器表示），每一个结点对应数组中的一个元素。
![堆](http://bubkoo.qiniudn.com/heap-and-array.png)

对于给定的某个节点的下标i，可以很容易的计算出这个节点的父节点，子节点下标：
- Parent(i) = floor(i/2),i的父节点下标
- Left(i) = 2i, i的左子节点下标
- Right(i) = 2i + i, i的右子节点下标
如下图所示：
![堆中父子关系图](http://bubkoo.qiniudn.com/heap-and-array-parent-children.png)

对于zero-based的数组，即index从0开始的array，我们还需要做以下调整：
- Parent(i) = floor((i-1)/2)，i 的父节点下标
- Left(i) = 2i + 1，i 的左子节点下标
- Right(i) = 2i + 2，i 的右子节点下标

二叉堆一般分为两种：最大堆和最小堆。

- 最大堆：
  - 最大堆中的最大元素值出现在根结点（堆顶)
  - 堆中每个父节点的元素值都大于等于其孩子结点（如果存在）
- 最小堆：
  - 最小堆中的最小元素值出现在根结点（堆顶）
  - 堆中每个父节点的元素值都小于等于其孩子结点（如果存在）

### 堆排序原理

理解了堆的数据结构，再来看看堆排序原理。堆排序就是把最大堆堆顶的最大数取出，将剩余的堆继续调整为最大堆，再次将堆顶的最大数取出，这个过程持续到剩余数只有一个时结束。在堆中定义以下几种操作：

#### buildMaxHeap创建最大堆

创建最大堆（Build-Max-Heap）的作用是将一个数组改造成一个最大堆，接受数组和堆大小两个参数，Build-Max-Heap 将自下而上的调用 Max-Heapify 来改造数组，建立最大堆。因为 Max-Heapify 能够保证下标 i 的结点之后结点都满足最大堆的性质，所以自下而上的调用 Max-Heapify 能够在改造过程中保持这一性质。如果最大堆的数量元素是 n，那么 Build-Max-Heap 从 Parent(n) 开始，往上依次调用 Heapify。流程如下：
![buildMaxHeap](http://bubkoo.qiniudn.com/building-a-heap.png)

代码实现如下：

```js
function buildMaxHeap(arr) {
  const len = arr.length;
  for(let i = Math.floor(len/2); i >= 0; i--) {
    heapify(arr, len,  i);
  }
}
```
#### heapify
最大堆调整(`HEAPIFY`)的作用是保持最大堆的性质，是创建最大堆的核心子程序，作用过程如图所示：

![heapify](http://bubkoo.qiniudn.com/MAX%E2%80%90HEAPIFY-Procedure.png)

具体实现有递归和非递归两种形式，具体见代码所示。
```js
function heapify(arr, len,  i) {
  let left = 2 * i + 1,
      right = 2 * i + 2,
      largest = i;
  if(left < len && arr[left] > arr[largest]) {
    largest = left;
  }
  if(right < len && arr[right] > arr[largest]) {
    largest = right;
  }
  if(largest !== i) {
    swap(arr, largest, i);
    heapify(arr, len, largest);
  }
}
//用非递归的方法实现heapify
function heapifyWithoutRecruion(arr, len, index){
  let left, right, largest;
  while (true) {
    left = 2 * i + 1;
    right = 2 * i + 2;
    largest = i;
    if (left < len && array[largest] < array[left]) {
      largest = iLeft;
    }
    if (right < len && array[largest] < array[right]) {
      largest = right;
    }
    if (largest !== index) {
      swap(array, largest, index);
      index = largest;
    } else {
      break;
    }
  }
}

function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

```
### heapSort
堆排序（Heap-Sort）是堆排序的接口算法，Heap-Sort先调用Build-Max-Heap将数组改造为最大堆，然后将堆顶和堆底元素交换，之后将底部上升，最后重新调用Max-Heapify保持最大堆性质。由于堆顶元素必然是堆中最大的元素，所以一次操作之后，堆中存在的最大元素被分离出堆，重复n-1次之后，数组排列完毕。整个流程如下：

![heapSort](http://bubkoo.qiniudn.com/HeapSort.png)

代码如下：

```js
function heapSort(arr) {
  buildMaxHeap(arr);
  let len = arr.length;
  for(let i = len - 1; i > 0; i--) {
    swap(arr, 0, i);
    len--;
    heapify(arr, len, 0);
  }
  return arr
}
```
#### 性能分析

时间复杂度 O(nlogn), 空间复杂度O(1). 从这一点就可以看出，堆排序在时间上类似归并，但是它又是一种原地排序，时间复杂度小于归并的O(n+logn)
排序时间与输入无关，最好，最差，平均都是O(nlogn). 不稳定

## 计数排序


计数排序是一种比较巧妙的排序方法，他巧妙的将输入的数据值转换为存储在额外开辟的数组或空间上，通过让key变成元素值，value变成元素出现次数。最后通过遍历从小到最大的key值，就可以得出排序结果。计数排序(Counting sort)是一种稳定的排序算法，作为一种线性时间复杂度的排序，计数排序要求输入的数据必须是有确定范围的整数。

下面是计数排序的动画演示：
![动画演示](https://sort.hust.cc/res/countingSort.gif);

代码分析：
```js
function countingSort(arr) {
  let list = [], maxValue = arr[0], minValue = arr[0];
  for(let i = 0; i < arr.length; i++) {
    const current = arr[i];
    if(current >= maxValue) maxValue = current
    else if(current < minValue) minValue = current
    if(!list[current]) list[current] = 0;
    list[current] ++;
  }
  const result = [];
  for(let i = minValue; i <= maxValue; i++) {
      while(list[i]--) {
        result.push(i);
      }
  }
  return result
}

```

####性能分析
最好，最坏，平均的时间复杂度O(n+k), 天了噜， 线性时间完成排序，且稳定。

- 优点：不需要比较函数，利用地址偏移，对范围固定在[0,k]的整数排序的最佳选择。是排序字节串最快的排序算法。

- 缺点：由于用来计数的数组的长度取决于待排序数组中数据的范围（等于待排序数组的最大值与最小值的差加上1），这使得计数排序对于数据范围很大的数组，需要大量时间和内存。


## 桶排序

桶排序其实是计数排序的一种升级版。他的思想是将数组分到不同的桶中，然后在每一个不是空的桶里进行排序，再把这些内部数据已经排好的桶全部拼接起来，就完成了我们的桶排序。

Youtube上有一个挺逗的关于桶排序的视频，大家有时间可以看看，会让你对桶排序的思想瞬间领悟（需要翻墙）

[![IMAGE ALT TEXT HERE](http://img.youtube.com/vi/JXNHgbEer8Q/0.jpg)](http://www.youtube.com/watch?v=JXNHgbEer8Q)


理解了原理，代码也就简单了：
```js
function bucketSort(arr) {
  let maxValue = arr[0], minValue = arr[0];
  // 找出最大和最小值
  for(let i = 0; i < arr.length; i++) {
    const current = arr[i];
    if(current >= maxValue) maxValue = current
    else if(current < minValue) minValue = current
  }
  //根据最大和最小值确定bucketSize
  const bucketSize = 5;
  const bucketCount = Math.ceil((maxValue - minValue)/bucketSize);
  let buckets = new Array(bucketCount);
  //将原数据根据数值大小分配到每个桶中
   for (i = 0; i < arr.length; i++) {
        const index = Math.floor((arr[i] - minValue) / bucketSize);
        if(!buckets[index]) buckets[index] = [];
        buckets[index].push(arr[i]);
   }
   //将每个桶进行排序
   let result = [];
   for(let i = 0; i <= bucketCount; i++) {
     if(buckets[i] && buckets[i].length > 0) {
       //使用插入排序
       console.log('buckets',buckets[i])
       result = result.concat(insertionSort(buckets[i]));
       console.log('result',result)
     }
   }
   return result;
}

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


## 复杂度汇总


![复杂度分析](https://segmentfault.com/img/bVlf9S)
<!-- | 算法         |  最好        |  平均             |   最差 |空间复杂度  | 稳定性 | 特点|
| --------    | :---:        |:-----:          |:----:|:----: |:----:|:----:|
| 冒泡排序     | $O(n)$       |     $O(n^2)$    | $O(n^2)$ | $O(1)$   |
| 插入排序     |  $O(n)$      |   $O(n^2)$      | $O(n^2)$ | $O(1)$   |
| 选择排序     |  $O(n^2)$    |  $O(n^2)$       | $O(n^2)$ | $O(n)$   |
| 快速排序     |  $O(nlogN)$  |  $O(nlogN)$     | $O(nlogN)$| $O(nlogN)$   |
| 归并排序     |  $O(nlogN)$  |  $O(nlogN)$     | $O(nlogN)$|$O(n)$   |
| 堆排序       |    $O(nlogN)$ |  $O(nlogN)$    | $O(nlogN)$| $O(1)$   |
| 计数排序     |    $O(n)$    |   $O(n)$        | $O(n^2)$ |$O(n)$   |
| 桶排序       |    $O(n)$   |   $O(n)$          | $O(n^2)$ |$O(n)$   | -->




### 参考文章

- [前端也要学点算法- 韩子池](http://www.cnblogs.com/zichi/p/4796727.html)
- [常用排序算法之JavaScript实现 ](https://segmentfault.com/a/1190000000656344)
- [常用排序算法总结](https://segmentfault.com/a/1190000002595152)
