>作为动态规划的练习题，刚开始还是对状态和状态方程的求解有点陌生,但其实仔细分析后便可以看出来其实没有那么困难。

用形式化的语言进行表述，如果假设设抢劫到前第 i 个房屋进行抢劫时所获取的最大收益是DP[i]，则这个收益要么等于 i-1个房屋的收益（题目要求相邻房屋不能同时被抢劫），要么等于 i-2与当前房屋的收益和。那么我们可以给出状态转移方程：

$$DP[i]=max(DP[i−1],DP[i−2]+DP[i])$$

即当抢劫第i个房屋时，有两种选择，一是不去抢劫这个房子，那么最大收益就是D(i-1);
另外一种选择是抢劫这个房子，那么最大收益就是抢劫i-2个房子加上当前房子的收益(DP[i−2]+DP[i]);

换算成代码就是：

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {
    let rob = 0, notRob = 0, robTotal = 0;
    for( let i = 0; i < nums.length; i++) {
        //if rob the current house, you cannot rob the previous house
        rob = nums[i] + notRob;
        //if not rob the current house,
        // get max from whether rob the previous house or not rob the previous house
        notRob = Math.max(allRob, notRob);
        //robTotal means the money  that you have already rob
        robTotal = rob;
    }
    return Math.max(robTotal, notRob);
};
```
