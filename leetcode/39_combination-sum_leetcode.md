## Description
Given a set of candidate numbers (C) (without duplicates) and a target number (T), find all unique combinations in C where the candidate numbers sums to T.

The same repeated number may be chosen from C unlimited number of times.

Note:
All numbers (including target) will be positive integers.
The solution set must not contain duplicate combinations.

#### Example
For example, given candidate set [2, 3, 6, 7] and target 7,
A solution set is:

```
[
  [7],
  [2, 2, 3]
]
```

## Solution

很典型的一道backtrack题，题目要求我们列举出sum相加等于target的所有可能性。
那根据规律，首先让我们找到tmp满足入栈result的条件，sum相加等于target, 但是每次计算temp的值有点累，还不如算出每次temp加入后，离值相加等于target所剩的值，remain。如果remain为0， 那就可以表示该tmp的所有0值相加等于target。
因为同一组数组只能出现一次，比如`[2,3]`和`[3,2]`， 那我们需要对最初的数字进行一个排序，而且对于for循环，我们需要限定条件，不能让它再遍历比当前数字小的数字。


```js
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function(candidates, target) {
    let result = [], tempList = [];
    candidates.sort();
    backtrack(result, tempList, candidates, target, 0)
    return result
};

function backtrack(result, tempList, nums, remain, start) {
   // 如果值 大于 target
   if(remain < 0) return
   // 值刚好等于target
   else if(remain === 0) result.push(tempList.slice());
   else{
       for(let i = start; i < nums.length; i++) {
           tempList.push(nums[i]);
           backtrack(result,tempList, nums, remain - nums[i], i);
           tempList.pop();
       }
   }
}
```
