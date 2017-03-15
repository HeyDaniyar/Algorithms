## Description

Find all possible combinations of k numbers that add up to a number n, given that only numbers from 1 to 9 can be used and each combination should be a unique set of numbers.


### Example:

```
Input: k = 3, n = 7

Output:

[[1,2,4]]
```

```
Input: k = 3, n = 9

Output:

[[1,2,6], [1,3,5], [2,3,4]]

```

##Solution

和39题的思路一样，只不过形式稍有不同，详情见代码。

```js
/**
 * @param {number} k
 * @param {number} n
 * @return {number[][]}
 */
var combinationSum3 = function(k, n) {
    let temp = [], result = [];
    const nums = [];
    for(let i = 1; i < 10; i++)  nums.push(i);
    backtrack(temp, result, nums, n, 0, k);
    return result
};

function backtrack(temp, result, nums, remain, start, k) {
    if(remain < 0) return
    if(temp.length === k && remain === 0) {
        result.push(temp.slice());
    }
    else{
        for(let i = start; i < nums.length; i++) {
            temp.push(nums[i]);
            backtrack(temp, result, nums, remain - nums[i], i+1, k);
            temp.pop(nums[i]);
        }
    }
}
```
