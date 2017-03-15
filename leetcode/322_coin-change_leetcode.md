## Description

You are given coins of different denominations and a total amount of money amount. Write a function to compute the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.

#### Example
```java
coins = [1, 2, 5], amount = 11
return 3 (11 = 5 + 5 + 1)
```
```java
coins = [2], amount = 3
return -1.
```
#### Note:
You may assume that you have an infinite number of each kind of coin.

## Solution

这是一道典型的可以用动态规划二维数组解决的问题。对于特定的amount，要求最少需要的硬币，那对于每一个硬币来说无非就是两个选择，一个是我用了这个硬币，要不就是我不需要用这枚硬币。所以我们可以得出下面的这个推理，对于特定的i < amount，需要最小次数即 之前没有用这枚硬币得出的最小`dp[i]`和用了这个硬币后得出的`dp[i-coin]+ 1`，两个数字之间最小值
$$  dp[i] = Math.min(dp[i],dp[i-coin]+1) $$

有了这个推理，剩下的程序就很好写了。我们只需要遍历一下所有的硬币，看看对于某一个特定值i 首先看当前的硬币值是不是大于i，如果小于i再看是否`dp[i-coin]是否为-1`，即不可能用硬币换算,如果可以的话就用上述推理来获取最新的`dp[i]`值。

代码如下：

```js
/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function(coins, amount) {
    const len = coins.length;
    if(amount < 1) return 0
    if(len < 1) return -1
    let dp = [0],  min = -1, sortCoins = coins.sort();
    for(let i = 0 ; i < len; i++) {
        dp[sortCoins[i]] = 1;
    }
    for(let i = 1; i <= amount; i++) {
        if(dp[i]) continue;
        for(let j = 0; j < len; j++) {
          const coin = sortCoins[j];
          if(coin > i) break;
          if(dp[i-coin] !== -1 )  {
              const crtNeedCoins = dp[i-coin] + 1;
              dp[i] = dp[i] ? Math.min(dp[i],crtNeedCoins) : crtNeedCoins;
          }
        }
        if(!dp[i]) dp[i] = -1;
    }
    return dp[amount]

};
```

### Follow Up

如果这个题改变一下，我们不是求最小需要硬币数目，而是给定一个N值。用N表示我们需要缓冲N美分零钱。并且我们拥有可以无限供应的，面值为`S= {S1,S2,...,Sm}`的硬币，请问找零的方式有多少种？

如果是这个问题，其实更符合我们的dp思想。如果i是目标钱数，j是当前coin下标，对于第j种coin，无非是选择和不选择使用两种可能性。那么就有
```js
  ways(i,j) = ways(i-s[j],j) + ways(i,j-1)
  (i = [0,N] j = [1,M])
```

因为ways[i,j]只和上一步的局部解有关，所有我们完全可以用一个变量表示。所以我们就可以用dp table来表示i方向上的一维空间。


```js
/**
 * @param {number[]} coins
 * @param {number} amount
 * @param {number} m
 * @return {number}
 */
var countWays = function(amount, coins, m){
  let table = [];
  table[0] = 1;
  for(let i = 1; i<= amount; i++) {
    for(let j = 0; j < m; j++) {
      table[i] += (i-s[j] > 0) ? table[i- coins[j]]: 0
    }
  }
  return table[n]
}
```
