====
Id:242
Name:Valid Anagram
language:Javascript
Level:Easy
Tags:HashTable
====

## Description


Given two strings s and t, write a function to determine if t is an anagram of s.

For example,
s = "anagram", t = "nagaram", return true.
s = "rat", t = "car", return false.

###  Note:
You may assume the string contains only lowercase alphabets.

### Follow up:
What if the inputs contain unicode characters? How would you adapt your solution to such case

## Solution

无需多言，直接上代码。

```js
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function(s, t) {
    if(s.length !== t.length) return false;
    const map = {};
    s.split('').forEach((char) =>{
        map[char] ? map[char]++ : map[char] =1;
    })
    return t.split('').every((char) =>{
        return map[char]--
    })
};
```
