##Description
Find the length of the longest substring T of a given string (consists of lowercase letters only) such that every character in T appears no less than k times.

### Example
```
Input:
s = "aaabb", k = 3

Output:
3

The longest substring is "aaa", as 'a' is repeated 3 times.
```
```
Input:
s = "ababbc", k = 2

Output:
5

The longest substring is "ababb", as 'a' is repeated 2 times and 'b' is repeated 3 times
```

## Solution

最开始这道题还是非常没有思路，最主要卡壳在如何找到满足条件的substring的过程。因为最长的substing有可能在中间，有可能在整个数组的两侧，所以如何截取这个长度思考了很久🤔
后来看discuss发现这个巧妙的解法，为什么忘了用递归呢？！

思路是首先遍历s为map，整体遍历之后我们可以得到一个key为char，value为出现次数的map，我们从中找到出现次数少于k的char（如果没有直接返回s），这个char可以说是一个分水岭，我们所要寻找的substring一定不能包含这个char，那么我们就可以以这个char来split整个s，对split的每个部分进行上述操作的递归，递归的最终界限是当前的substring中不再有出现次数小于k的char，此时返回当前数组的长度，最后我们就能用Math.max()来得出结果，整个解法清晰明了。

```js
/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var longestSubstring = function(s, k) {
    if(!s|| s.length === 0) return 0;
    let map = {}, maxLen = 0;

    s.split('').forEach(char => {
        map[char] ? map[char]++: map[char] = 1;
    });
    let filter = Object.keys(map).find(key => {
        return map[key] < k
    });
    if(!filter) return s.length;
    let subs = s.split(''+filter);
    subs.forEach(sub =>{
        maxLen = Math.max(maxLen,longestSubstring(sub,k));
    })
    return maxLen
}
```
