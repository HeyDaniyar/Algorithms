本来以为是道很简单的题，
结果答案虽然每次都正确,但是一直不能accpet，提示时间开销太大。
后来看了别人的solution发现确实自己的太过复杂了，虽然都是同样的思路，但用代表表示的时候我只设定了一个i变量，而别人是用了i,j两个变量
分别表示两个指针，一个指向当前遍历的开始，一个指向结束。
```js

var lengthOfLongestSubstring = function(s) {
   let max = 0, map = {}, curLength = 0;
   for(let i = 0; i < s.length; i++) {
      // check if there is same value in map
      if(map[s[i]] ) {
         if(curLength > max) max = curLength;
         i = map[s[i]];
         map = {};
         curLength = 0;
      }
         curLength++;
         map[s[i]] = i+1;
   }
   if(curLength > max) max = currentLegth;
   return max
};
```


>the basic idea is, keep a hashmap which stores the characters in string as keys and their positions as values, and keep two pointers which define the max substring. move the right pointer to scan through the string , and meanwhile update the hashmap. If the character is already in the hashmap, then move the left pointer to the right of the same character last found. Note that the two pointers can only move forward.

```js
var lengthOfLongestSubstring = function(s) {
   let max = 0, map = {};
   for(let i = 0, j = 0; i < s.length; i++) {
      // 理解这一步是关键
      if(map.hasOwnProperty(s[i]) )  j = Math.max(j, map[s[i]] + 1);
      map[s[i]] = i;
      max = Math.max(max, i - j + 1);
   }
   return max
};
```
