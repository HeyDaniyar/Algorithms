## Description

Given a set of distinct integers, nums, return all possible subsets.

Note: The solution set must not contain duplicate subsets.

### Example
If nums = [1,2,3], a solution is:
```
[
  [3],
  [1],
  [2],
  [1,2,3],
  [1,3],
  [2,3],
  [1,2],
  []
]
```


## Solution

标准的backtrak问题，分析请见39题


```js

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function(nums) {
    let result = [], temp = [];
    backtrack(temp, result, nums, 0);
    result.push([]);
    return result
};

function backtrack(temp, result, nums, start) {
    for(let i = start; i < nums.length; i++) {
        temp.push(nums[i]);
        backtrack(temp, result, nums, i+1);
        result.push(temp.slice());
        temp.pop();
    }
}
```
