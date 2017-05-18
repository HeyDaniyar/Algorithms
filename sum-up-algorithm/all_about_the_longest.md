# Leetcode关于longest的题型总结

### Longest Common Prefix

>描述： 给定一个字符串数组，找到最长的前缀

思路： 首先假定最长的前缀为数组中的第一个字符串`prefix = s[0]`，遍历数组中剩余的字符串。只要发现当前字符串和前缀不相等，将前缀和当前字符串减去一位后重新比较，一直到相等为止，如果prefix的长度小于1或者遍历到头，跳出，结束循环。

### Longest Common Subsequence
>描述： 给定两个字符串，找到最长的一样的子序列

思路：用动态规划矩阵的方法。首先初始化dp为一个第一行为0，第一列为0的数组，然后外层遍历令i=0开始字符串s1，内层从j=0开始遍历字符串s2, 可以得出如果s1[i] === s2[j],则他们的公共子序列为
`dp[i-1][j-1]+1`，如果不相等，则必定为`dp[i-1][j]`和`dp[i][j-1]`两者中的较大值。
如s1 = 'abc',s2 = 'acd';
则整个矩阵表示为：
```js
      | a | b | c |
      | 0 | 0 | 0 |
|a| 0 | 1 | 1 | 1 |
|c||0 | 1 | 1 | 2 |
|d||0 | 1 | 1 | 2 |

```
### longest Common Substring
>描述： 给定两个字符串s1,s2，找到最长的substring

思路：取第一个字符串的长度为l，另最长子串暂str为s1, 设i为0，`i + l <= s2.length`遍历截取长度为l的s2子串,并与最长子串进行比较，看是否相等，如果相等返回最长子串，如果遍历完没有相等
那就令l长度减一，并继续比较。或者也可以用dp的方法去做。

```js
//遍历法
function longest(s1, s2) {
  const shorter = s1.length < s2.length ? s1 : s2;
  for (let l = shorter.length; l > 0; l--) {
    for (let i = 0; i + l <= shorter.length; i++) {
      const longest = shorter.substr(i, l);
      for (let j = 0; j + l <= s2.length; j++) {
        const tmp = s2.substr(j, l);
        if (longest === tmp) return longest;
      }
    }
  }
}
//dp方法
function longest2(s1, s2) {
  const len1 = s1.length;
  const len2 = s2.length;
  let result = 0, dp = [];
  for (let i = 0; i <= len1; i++) {
    dp[i] = [];
  }

  for (let i = 0; i <= len1; i++) {
    for (let j = 0; j <= len2; j++) {
      if (i === 0 || j === 0) {
        dp[i][j] = 0;
      } else if (s1[i - 1] === s2[j - 1]) {
        dp[j][j] = dp[i - 1][j - 1] + 1;
        result = Math.max(dp[i][j], result);
      } else {
        dp[i][j] = 0;
      }
    }
  }
  return result;
}
```


### Longest Substring Without Repeating Characters

>描述：给定一个字符串，找到最长的不包含相同数字的子字符串长度（非子序列，即不能打乱顺序）

思路：用two-pointer的思想去解题。拿左指针和右指针遍历字符串。首先，左指针为0，右指针从0开始遍历，遍历的过程中同时构建map对象，map对象的key为当前元素值，value为元素的位置。如果发现右指针新的元素在map中存在，此时改变左指针的顺序，使其等于**发现的元素位置+1**或者当前左指针位置（取较大值）。注意因为有value可能为`0`的情况，所以不能用`map[i]`来判断，应该用`map.hasOwnProperty`来判断。


### Longest Palindromic Substring
>描述：给定一个字符串，找到最长的回文子串

思路：假设字符串长度为l，取子串长度为l，判断是否为回文，如果不是另子串长度为l-1，设i= 0， 从第一个字符串取l-1长度的子字符串，判断是否为回文。如果不是，让i++，从第二个字符取l-1长度的子字符串，如果是回文直接返回当前字符串，如果不是则继续另l-1，并且重新从首位开始截取。


### Longest Increasing Subsequence

>描述：给定一个数字数组,找到最长的增长子序列（不是substring，即不用连在一起）

思路：用dp的方法和two-pointer的方法去解。首先，初始化dp长度为数组长度，而且每一项为1，因为对每个数字来说，至少最长序列为1。然后，对数组进行外层遍历，让右指针从1开始进行遍历，左指针小于右指针，对于每一个右指针指向的元素来说，在此位置上的最长子序列应该等于左指针指向元素的最长子序列+1和之前已经得出的最长子序列的较大值。如果需要得出这个最长的子序列，需要初始化dp为数组长度，每一项都是一个新数组，里面的第一个元素是对应数组的元素，同样对数组进行遍历，对于每一个右指针指向的元素，如果大于左指针指向的元素，则让右指针对应的dp数组变成左指针对应的dp数组，然后再push当前元素，同时也有记录最大长度，最后返回dp的最大长度所对应的数组即可。

### Longest Palindrome

>描述:给定一个字符串，返回可以构建的最长回文的长度。

思路：用hashmap的方法。遍历每个字符，将字符设为key，出现次数设为value存进map中，再将map的values值遍历，如果出现次数为偶数，直接加入result，如果为奇数，那就设定有奇数项为hasOdd为1，并且将次数减一加入result。最后返回result+hasOdd。如果需要返回构建的字符串，那就另result按出现次数循环添加key值。
