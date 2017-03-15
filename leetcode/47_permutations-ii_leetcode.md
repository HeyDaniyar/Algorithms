## Description

Given a collection of numbers that might contain duplicates, return all possible unique permutations.

### Example

`[1,1,2]` have the following unique permutations:
```
[
  [1,1,2],
  [1,2,1],
  [2,1,1]
]
```


### Solution
```js
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permuteUnique = function(nums) {
    let result = [], tempList = [], used = [];
    nums.sort();
    getUniquePermute(tempList,nums,result,used);
    return result
};

function getUniquePermute(tempList, nums, result, used) {
    if (tempList.length === nums.length) {
        result.push(tempList.slice());
    }else{
        for(let i = 0; i < nums.length; i++) {
            if(used[i] || i > 0 && nums[i] === nums[i-1] && !used[i-1] ) continue;
            used[i] = true;    
            tempList.push(nums[i]);
            getUniquePermute(tempList, nums, result, used);
            used[i] = false;
            tempList.pop()
        }
    }
    return result
}
```
