# 排序

### 寻找N个数中第K大的数

### Solution 1

```js
var largestNumber = function(nums, k) {
    const result = quickSort(nums, k);
    return result;
};

function quickSort(nums, k) {
    if(nums.length === 1) return nums[0];
    const index = Math.floor(nums.length/2);
    let pivot = nums.splice(index, 1)[0], left = [], right = [];

    for(let i = 0; i < nums.length; i++) {
        if(nums[i] < pivot) {
            left.push(nums[i])
        }else {
            right.push(nums[i])
        }
    }
    if(left.length > k -1)  return quickSort(left, k)
    if(left.length === k - 1) return pivot
    if(left.length < k - 1) return quickSort(right, k- left.length -1)
}
```
