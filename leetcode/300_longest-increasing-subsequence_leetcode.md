## Description

Given an unsorted array of integers, find the length of longest increasing subsequence.

For example,
Given [10, 9, 2, 5, 3, 7, 101, 18],
The longest increasing subsequence is `[2, 3, 7, 101]`, therefore the length is 4. Note that there may be more than one LIS combination, it is only necessary for you to return the length.

Your algorithm should run in O(n2) complexity.

Follow up: Could you improve it to O(n log n) time complexity?

## Solution

最开始分析这道题的时候，没有考虑全可能出现的情况，错误的认定只要遍历数组的过程中发现当前数字比存在的最长增长substring的最后一个元素大，就可以添加到substring中，反之继续遍历。但是之后发现对于`[1,3,1,2,3,4,5]`这种情况，会得出错误的答案。因为最长增长substring不一定是最先开始增长的序列。 后来看到youtube上这位阿三大神的视频，顿时茅塞顿开,希望这几天能看完他的dp系列视频，让自己的dp有一点进步。
```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function(nums) {
    const len = nums.length;
    if(len === 0) return 0
    if(len === 1) return 1;
    const dp = [];
    for(let i = 0; i < nums.length; i++) dp.push(1);
    for(let i = 0; i < nums.length; i++) {
        for(let j = 0; j < i; j++) {
            if(nums[i] > nums[j]){
               dp[i] = Math.max(dp[i],dp[j]+1);
            }
        }
    }
    return Math.max.apply(null, dp)
};
```
####视频链接
 Coin Changing Minimum Coins Dynamic Programming

[![IMAGE ALT TEXT HERE](http://img.youtube.com/vi/CE2b_-XfVDk/0.jpg)](http://www.youtube.com/watch?v=CE2b_-XfVDk)


## Follow Up

如果不是求最长子序列的长度，而是求最长子序列的话呢？ 其实思想还是一样的，只不过dp表示的不再是最长子序列长度，而是最长子序列本身。详情看代码

```js
var lengthOfLIS = function(nums) {
    if(!nums) return 0
    if(nums.length === 1) return 1
    let dp = [], max = 1,result = [];
    for(let i = 0; i < nums.length; i++) {
        dp[i] = [nums[i]];
    }
    for(let i = 1; i < nums.length; i++) {
        for(let j = 0; j < i; j++) {
            if(nums[i] > nums[j] ) {
                if(dp[j].length + 1 > dp[i].length){
                    // 另dp[i] = dp[j],并且将nums[i]传入
                    dp[i] = dp[j].slice();
                    dp[i].push(nums[i]);
                }
                if(dp[i].length > max) {
                    max = dp[i].length;
                    result = dp[i].slice();
                }
            }
        }
    }
    return result
};
```
