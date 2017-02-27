>Find the contiguous subarray within an array (containing at least one number) which has the largest sum.
For example, given the array [-2,1,-3,4,-1,2,1,-5,4],
the contiguous subarray [4,-1,2,1] has the largest sum = 6.


虽然是一道easy的提醒，但是从整个题目来说非常锻炼dynamic programming的思想。
题目要求是获得数组中相邻数字的最大值。也就是说，我们要求出数组A中从连续的从i位置到j位置的最大sum值，这让人很容易想到用两个变量去分割数组，
但其实用这个思路会把问题复杂化。我们不妨分解问题，用dp的方法去求解。

假设一个i+1长度的数组 A = [a,b,c,....n],我们可以设D[i]为从某一个j位置到i位置的最大sum值，max为整个数组0,i中任意连续位置的最大值，初始值为a,
当i = 0, 数组A = [a]，此时最大值D[0] = a;
当i = 1, 数组A = [a,b]; 现在的最大值有三种情况，要不是a+b, 要不就是b, 要不就是a,
但如果a最大，因为b没有选择，就不符合题目中的连续条件，所以我们在D(1)中就不考虑a的情况，D[1] = Math.max(a+b, b);
然后我们再比较D(1)和max的大小，如果真的a是最大的，那okay，max继续等于a,我们继续看接下来的数组中会不会有更大的连续纸。
同理，i = 2, 数组A = [a,b,c]; D[2] = Math.max(Math.max(a+b,b) + c, c);
i = 3, 数组A = [a,b,c,d]; D[3] = Math.max( D[2] + d, d);

看出规律了！对，就是这么简单。
对于任意数组A, D[i] = Math.max(D[i-1], A[i]);
这就是我们需要的那个公式。
找到这个公式后，剩下的问题很简单，我们只需要带入代码就即可。

```js
var maxSubArray = function(nums) {
    let max = nums[0], D = [];
    D[0] = nums[0];
    for(let i = 1; i < nums.length; i++) {
       D[i] = Math.max(D[i-1]+nums[i], nums[i]);
       max = Math.max(max, D[i]);
    }
    return max;
};
```
