>Given an array of strings, group anagrams together.
For example, given: ["eat", "tea", "tan", "ate", "nat", "bat"],
Return:
[
  ["ate", "eat","tea"],
  ["nat","tan"],
  ["bat"]
]
Note: All inputs will be in lower-case.
Subscribe to see which companies asked this question.


不知道是不小心看到了tag是Hash Table还是什么，这道Medium题完全没有了难度。
遍历字符串数组，对每一项进行排序，并加入map中，对于下一个字符串，因为map的key是排序后的字符串，所以很容易归档。
上代码：
```js

/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
  let len = strs.length, map = {}, sortStr = '';
  for(let i = 0; i < len; i++) {
    sortStr = strs[i].split('').sort().join('');
    if(!map[sortStr])  map[sortStr] = [];
    map[sortStr].push(strs[i]);
  }
  return Object.values(map);
};
```
