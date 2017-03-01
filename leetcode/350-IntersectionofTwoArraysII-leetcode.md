##Description
Given two arrays, write a function to compute their intersection.

#### Example
Given nums1 = [1, 2, 2, 1], nums2 = [2, 2], return [2, 2].

#### Note
- Each element in the result should appear as many times as it shows in both arrays.
- The result can be in any order.

#### Follow Up
- What if the given array is already sorted? How would you optimize your algorithm?
- What if nums1's size is small compared to nums2's size? Which algorithm is better?
- What if elements of nums2 are stored on disk, and the memory is limited such that you cannot load all elements into the memory at once?

## Solution

题目本身很简单，但是没有能做到bug-free，一次没能提交。followUp里提到的三个问题很有意思，下次再讨论。


```js
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersect = function(nums1, nums2) {
    const map = {},result = [];
    nums1.forEach((num1)=>{
        map[num1] ? map[num1]++ : map[num1] =1;
    })
    nums2.forEach((num2) =>{
        if(map[num2] && map[num2]> 0){
             result.push(num2);
             map[num2]--;
        }
    });
    return result;
};
```
