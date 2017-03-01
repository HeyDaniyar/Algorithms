
##Description
Given two arrays, write a function to compute their intersection.

#### Example
Given nums1 = `[1, 2, 2, 1]`, nums2 = `[2, 2]`, return `[2]`.

#### note
- Each element in the result must be unique.
- The result can be in any order.


##Solution

很简单的一道题，无需多言。本来最后返回的是Object.keys(result)，因为很显然返回的是key，但是后来发现obj的key都是string，和题目需要的数字不符合。所以就换成了Object.values()这种方式。



```js
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersection = function(nums1, nums2) {
    const map = {},result = {};
    nums1.forEach((num1) =>{
        map[num1]  = 1;
    });
    nums2.forEach((num2) =>{
        if(map[num2])  result[num2] = num2;
    })
    return Object.values(result)
};
```
