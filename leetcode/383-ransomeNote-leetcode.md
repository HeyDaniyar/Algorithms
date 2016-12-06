首先题意分析，
有两个字符串a, b， 我们要确定这两个给定的参数是否有a属于b的关系；
遇到属于的情况， 自然而然想到的是用hash表判断， 原因？ 一个字： 快！
然后本题并不是简简单的属于问题（第一次以为是），因为题中有一个条件
>Each letter in the magazine string can only be used once in your ransom note.

每个a只能在b中出现一次，是不是意味着不能用hashmap来判断了，因为hash里每个属性可是只有一次的哦。
然而，属性名虽然只能出现一次，属性值我们是可以随意设定的，为何不能用属性值去判断次数？
如果一个属性只出现一次，那让它属性值为1.当出现这次属性时，我我们就让属性值减1，就巧妙的做到了判断只出现一次的hashmap方法；
好了，
迅速写好代码：

```js
/**
 * @param {string} ransomNote
 * @param {string} magazine
 * @return {boolean}
 */
var canConstruct = function(ransomNote, magazine) {
    var len = magazine.length, l = ransomNote.length, hashMap = {};
    if(l < 1) return true;
    if(len < 1) return false;
    for(var i = 0; i < len; i++) {
      hashMap[magazine[i]] ？ hashMap[magazine[i]]++ : ashMap[magazine[i]] = 1
    };
    for(var j = 0; j < l; j++) {
        if(!!hashMap[ransomNote[j]]) hashMap[ransomNote[j]]--;
        else return false;
    }
    return true;
};
```
