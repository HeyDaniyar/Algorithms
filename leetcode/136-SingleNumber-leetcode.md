## Description
Given an array of integers, every element appears twice except for one. Find that single one.

Note:
Your algorithm should have a linear runtime complexity. Could you implement it without using extra memory?


## Solution

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
    const map = {};
    nums.forEach((num) =>{
        map[num] ? map[num]++ : map[num] =1;
        if(map[num] ===2) delete map[num];
    })
    return parseInt(Object.keys(map)[0]);
};
```
