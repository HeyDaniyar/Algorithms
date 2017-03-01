## Description
Given two strings s and t, determine if they are isomorphic.

Two strings are isomorphic if the characters in s can be replaced to get t.

All occurrences of a character must be replaced with another character while preserving the order of characters. No two characters may map to the same character but a character may map to itself.

For example,
Given "egg", "add", return true.

Given "foo", "bar", return false.

Given "paper", "title", return true.

###Note:
You may assume both s and t have the same length.

## Solution

相同类型的题目，直接上代码，无需多言。

```js
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isIsomorphic = function(s, t) {
    if(t.length !== s.length) return fasle;
    const map_s ={}, map_t = {}, list =[];
    let label = 1;
    s.split('').forEach((char) =>{
        if(!map_s[char]) map_s[char] = label++;
        list.push(map_s[char]);
    })
    label = 1;
    return t.split('').every((char,index)=>{
        if(!map_t[char]) map_t[char] = label++;
        return list[index] === map_t[char]
    })
};
```
