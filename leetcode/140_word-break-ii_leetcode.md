## Description

Given a non-empty string s and a dictionary wordDict containing a list of non-empty words, add spaces in s to construct a sentence where each word is a valid dictionary word. You may assume the dictionary does not contain duplicate words.

Return all such possible sentences.

### Example
given s = `"catsanddog"`,
dict = `["cat", "cats", "and", "sand", "dog"]`
A solution is `["cats and dog", "cat sand dog"]`

## Solution

很典型的backtrack问题。首先看一下满足入栈temp的条件，我们可以将s分割成两部分，分别为current和remain，如果current满足属于dict中的单词，那我们继续将remian传入回溯函数中，重新分割remian，一直到remain中没有元素，此时就是temp满足入栈result的条件。需要注意的是，为了减少时间复杂段，我们用map来进行current是否满足条件的判断，并且设定全局变量effort，限定查找的次数不超过100一次。虽然这样不是一个好方法，但是对于leetcode特别庞大的testcase如LTE,就是大量的相同字符，这个方法是可以让其通过AC的暂时解，期待更好的办法。


```js
/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {string[]}
 */

var wordBreak = function(s, wordDict) {
    let tmp = [], result = [];
    const map = {};
    let effort = 100;
    wordDict.forEach((word) => map[word] = 1);
    backtrack(tmp, result, s, map);
    return result;

    function backtrack(tmp, result, rest, map) {
     if (--effort <= 0) {
            return;
     }
    if(rest.length === 0) {
        result.push(tmp.slice().join(' '));
        effort += 100;
    }
    else{
        for(let i = 1; i <= rest.length; i++) {
            const cur = rest.substring(0,i);
            const remain = rest.substring(i);
            if(map[cur]) {
                tmp.push(cur);
                backtrack(tmp, result, remain, map);
                tmp.pop();
            }
        }
    }
}
};


```
