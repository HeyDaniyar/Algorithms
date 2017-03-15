## Description
Given a string s and a string t, check if s is subsequence of t.

You may assume that there is only lower case English letters in both s and t. t is potentially a very long (length ~= 500,000) string, and s is a short string (<=100).

A subsequence of a string is a new string which is formed from the original string by deleting some (can be none) of the characters without disturbing the relative positions of the remaining characters. (ie, "ace" is a subsequence of "abcde" while "aec" is not).

### Example:
```
s = "abc", t = "ahbgdc"
Return true.
```
```
s = "axc", t = "ahbgdc"

Return false.
```

### Follow up:
If there are lots of incoming S, say S1, S2, ... , Sk where k >= 1B, and you want to check one by one to see if T has its subsequence. In this scenario, how would you change your code?


##Solution

```js
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isSubsequence = function(s, t) {
    const dict = {};
    t.split('').forEach((char,index) =>{
        if(!dict[char])  dict[char] = [];   
        dict[char].push(index);
    })
    let lastPosition = 0;
    for(let i = 0; i < s.length; i++) {
        const char = s[i];
        const charIndexs = dict[char];
        if(charIndexs && charIndexs.length >= 1) {
            //get the char Indexs which only larger than lastIndex
            const positionIndex = charIndexs.findIndex((item) =>{return item >= lastPosition});
            //when didn't find indexs larger than lastIndex
            if(positionIndex === -1) return false

            lastPosition = charIndexs[positionIndex];
            dict[char][positionIndex] = -1;

        }
        else return false
    }

    return true
};
```


```js
var isSubsequence = function(s, t) {
    var count = 0;
    for(var i = 0; i<t.length; i++){
        if(s[count] == t[i]){
            count++;
        }
    }
    if(count == s.length){
        return true;
    }
    else return false;
};
```
