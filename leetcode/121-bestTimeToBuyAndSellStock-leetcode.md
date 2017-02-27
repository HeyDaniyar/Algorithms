>Say you have an array for which the ith element is the price of a given stock on day i.
If you were only permitted to complete at most one transaction (ie, buy one and sell one share of the stock), design an algorithm to find the maximum profit.
Example 1:
Input: [7, 1, 5, 3, 6, 4]
Output: 5
max. difference = 6-1 = 5 (not 7-1 = 6, as selling price needs to be larger than buying price)

很简单的一道题，都不用DP的方法，只需要用当前的利润（数值price[i] -  i之前构成的数组中的最小值）和
之前的最大利润进行比较，如果利润更大，则当前利润变成最大利润，否则继续遍历。

```js
var maxProfit = function(prices) {
  let min = prices[0], maxProfit = 0;
  for(let i = 1; i < prices.length; i++) {
      let profit = prices[i] - min;
      maxProfit = Math.max(profit, maxProfit);
      min = Math.min(prices[i], min);
  }
  return maxProfit
};
```
