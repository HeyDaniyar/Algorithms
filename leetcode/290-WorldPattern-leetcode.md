## Description

Given a pattern and a string str, find if str follows the same pattern.

Here follow means a full match, such that there is a bijection between a letter in pattern and a non-empty word in str.

### Examples:
pattern = "abba", str = "dog cat cat dog" should return true.
pattern = "abba", str = "dog cat cat fish" should return false.
pattern = "aaaa", str = "dog cat cat dog" should return false.
pattern = "abba", str = "dog dog dog dog" should return false.
Notes:
You may assume pattern contains only lowercase letters, and str contains lowercase letters separated by a single space.

## Solution

第一次拿到题目的时候，大意的以为需要按常规的方法对pattern和str进行map遍历，最后比较他们的key值就可以。后来写的时候才发现这个map需要一个新的模式。

题目中让找到相同的模式，那我遍历的时候就需要对每个字母或者单词进行一个统一的分类，我用label来表示分类。也就是a => 1, dot=>1; b=>2,cat =>2l b=>1, cat =>2;

按照这样的map类型才会得出是否一致的结论。


```js
/**
 * @param {string} pattern
 * @param {string} str
 * @return {boolean}
 */
var wordPattern = function(pattern, str) {
    const mapPattern = {},
            mapStr = {},
            list =[]
            strArr = str.split(' ');
    let label = 1;
    pattern.split('').forEach((char,index) =>{
      if(!mapPattern[char]) mapPattern[char] = label++;
      list.push(mapPattern[char]);
    })
    label = 1;
    return list.length === strArr.length && strArr.every((word,index) =>{
        if(!mapStr[word])  mapStr[word] = label++;
        return list[index] === mapStr[word]
    })
};
```
