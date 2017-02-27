>这个题目是houseRobbed的衍生版，从相邻的房屋不能抢劫增加了一个条件，即抢劫房屋的起点和终点也不能同时抢劫。

既然上一道题目的解法那么完美简洁，我们是不是能把那个改造进化一下呢？ 初一看感觉问题瞬间繁琐，一个房子不在仅仅是“抢”或者”不抢“的问题，还有考虑第会不会首尾相连。

但这样的想法显然不是从dp的角度出发，能不能换个角度，不能收尾相连是不是意味着如果我选择第一个，就不能选最后一个，这不就是for 循环中i开始和结束的问题吗？瞬间恍然大悟，
代码结构逻辑泉水般涌出。


```js
House Robber II
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {
    if (nums.length === 1) return nums[0];
    return Math.max(robbing(nums, 0, nums.length - 2), robbing(nums, 1, nums.length - 1));
};

var robbing = function(nums, start, end) {
    let rob = 0, notRob = 0, allRob = 0;
    for( let i = start; i <= end; i++) {
        //if rob the current house, you cannot rob the previous house
        rob = nums[i] + notRob;
        //if not rob the current house,
        // get max from whether rob the previous house or not rob the previous house
        notRob = Math.max(allRob, notRob);
        //allRob means the money  that you have already rob
        allRob = rob;
    }
    return Math.max(allRob, notRob);
};
```
