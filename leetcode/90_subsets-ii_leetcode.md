## Description

Given a collection of integers that might contain duplicates, nums, return all possible subsets.

Note: The solution set must not contain duplicate subsets.

For example,
If nums = [1,2,2], a solution is:
```
[
  [2],
  [1],
  [1,2,2],
  [2,2],
  [1,2],
  []
]
```


## Solution

标准的bactrack问题，详情分析见40题，两个思路一样。


```js
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsetsWithDup = function(nums) {
    let result = [], temp = [];
    nums.sort();
    backtrack(temp, result, nums, 0);
    return result
};


function backtrack(temp, result, nums, start) {
    result.push(temp.slice());
    for(let i = start; i <  nums.length; i++) {
        if(i > start &&  nums[i] === nums[i-1] )  continue;
        temp.push(nums[i]);
        backtrack(temp, result, nums, i+1);
        temp.pop();
    }
}
```
