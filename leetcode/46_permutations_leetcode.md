## Description

Given a collection of distinct numbers, return all possible permutations.

### Example
`[1,2,3]` have the following permutations:

```
[
  [1,2,3],
  [1,3,2],
  [2,1,3],
  [2,3,1],
  [3,1,2],
  [3,2,1]
]
```

## Solution
```js

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
    let result = [], tempList = [];
    getAllPermute(tempList, nums, result);
    return result;
};

function getAllPermute(tempList, nums, result) {
    if (tempList.length === nums.length) {
        result.push(tempList.slice());
    }else{
        for(let i = 0; i < nums.length; i++) {
            if(tempList.includes(nums[i])) continue;
                tempList.push(nums[i]);
                getAllPermute(tempList, nums, result);
                tempList.pop()
        }
    }
    return result
}


```
