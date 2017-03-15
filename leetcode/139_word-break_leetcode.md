## Description

Given a **non-empty** string s and a dictionary wordDict containing a list of **non-empty words**, determine if s can be segmented into a space-separated sequence of one or more dictionary words. You may assume the dictionary does not contain duplicate words.

### Example
```
For example, given
s = "leetcode",
dict = ["leet", "code"].
```

Return true because `"leetcode"`can be segmented as `"leet code"`.


##Solution

一道看似很简单的题没想到费了这么久的功夫，从前面的没有思路到看完阿三大神的视频，到最后的写代码的各种数组构造，真是bug-free的能力完全没有啊。


```js
/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreak = function(s, wordDict) {
    const len = s.length, map = {};
    let dp = [];
    if(len < 1 || wordDict.length < 1) return false
    wordDict.forEach((word) =>{
        map[word] = 1;
    })
    s.split('').forEach((char,index)=>{
        dp[index] = [];
    });
    //i means the interval of string, 0 means consider
    // about the string when length equals to one
    for(let l = 0; l < len; l++) {
        for(let i = 0; i + l < len; i++) {
            const current = s.substring(i,i+l+1);
            if(map[current]) {
                dp[i][i+l] = true;
                continue;
            }
            if(!map[current]) {
                // p means the split length
                for(let p = 0; p < l; p++){
                   const left = dp[i][i+p];
                   const right = dp[i+p+1][i+l];
                   if(left && right) {
                       dp[i][i+l] = true;
                       break;
                   }
                }
            }
            if(!dp[i][i+l]) dp[i][i+l] = false;
        }
    }
    return dp[0][len-1]  
};
```

####  新解法


晚上回家后看程序员白皮书发现也有这道题，但是用了完全不一样的dp方法。仔细分析后发现，原来这种dp比上一个更简洁更美观，具体思路对于s,我们设定i为考虑字符串数目，例如i=n就是考虑前n个字符串情况。然后j可以看做对前n个字符串内部的边路，从前n个字符串的第0个字母开始，一直到第n个字符进行。举个具体的例子，对于字符串`s = 'abcd'`，`i = 1`就是只看第一个字符串，那我们先去看 `temp_s='a'`，因为dp的初始值为true，所以只要是当前的s.substring（0,1)是否在字典中，如果在那就可以设定`dp[1] = true`，如果不在就设定false。接着再看`i = 2`,此时只考虑`temp_s = 'ab'`,首先看`'ab'`是否在字典中，如果不在就把`'ab'`分割，因为已经知道`‘a’`（`dp[1]`)，所以只需要看`‘b’`是否在字典中就可以知道`'ab'`是否能用字典表示，即可知道`dp[2]`。



```js
/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreak = function(s, wordDict) {
    const dp = [];
    dp[0] = true;

    for(let i = 1; i <= s.length; i++) {
        for(let j = 0; j < i; j++){
            console.log('i:',i,'j:',j)
            console.log('substring',s.substring(j,i))
            if(dp[j] && wordDict.includes(s.substring(j,i)) ) {
                dp[i] = true;
                break;
            }
        }
    }
    return dp[s.length] || false
};
```
