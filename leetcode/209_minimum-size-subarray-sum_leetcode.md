## Description

Given an array of n positive integers and a positive integer s, find the minimal length of a contiguous subarray of which the sum ≥ s. If there isn't one, return 0 instead.

### Example
given the array [2,3,1,2,4,3] and s = 7,
the subarray [4,3] has the minimal length under the problem constraint.


## Solution

这个类型的题目我接触的很少，这几天应该是第一次系统的做，主要类型就是分割数组，找到最大或最少的substring。每次做这样的题的时候都会想用暴力方法列举所有的子字符串，再从里面找出满足条件的。然而事实上到了后面就会发现，这样的解法实现起来毫无美感。这时候更多的其实是要运用到two-pointer的方法。

在我的理解中，two-pointer是一个范围选择遍历，pointer不一定只有两个（大部分情况只有两个），但是需要通过pointer来缩小或者夸大范围。

例如本题要求找出最小长度的字符串，使其满足sum之和大于s。那我们就可以将左右pointer从0开始，一个pointer先进行右遍历，不断相加数字。当相加的sum之和大于或者等于s时，我们就开始进行另一个pointer的右遍历，在保证sum值大于s的情况下缩小选择范围，即从sum中不断删除第二个pointer指向的数字，同时不断更新数组长度最小值Min。当不能再缩小了后，我们继续开始第一个pointer的遍历，重复上述过程。看是否能得到比更小的数组长度。

为了获得最开始的最小值，我们需要用最大值来进行比较，即 Number.MAX_VALUE;

以上便是这个题的整体思路；

```js
/**
 * @param {number} s
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function(s, nums) {
    let i = 0; j = 0; sum = 0, min = Number.MAX_VALUE;
    while(i < nums.length) {
        sum += nums[i++];
        while( sum >= s) {
            min = Math.min(min,i-j);
            sum -= nums[j++];
        }
    }
    return min == Number.MAX_VALUE ? 0 : min;
};
```
