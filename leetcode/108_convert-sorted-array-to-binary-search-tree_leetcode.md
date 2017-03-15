## Description
Given an array where elements are sorted in ascending order, convert it to a height balanced BST.



## Solution

想到了用递归的方式，但是具体实现的时候还是比较吃力。总是想不到合适的点去执行递归函数是一个比较明显的问题。比如说本例中
，我们需要不断的迭代左分支和右分支，由底向上构建BST。先设定中间值mid，然后再用二分的思想将剩余的数组再分为两部，分别构建。如果发现right > left的情况，那就是返回null，如果相等，返回一个值即可。直接在遍历的方法去得到最小的leftChild和rightChild，将他们分别赋予用mid构建的空树的左右两侧，从而完成构建。

```js
/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
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
