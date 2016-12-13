最先开始看到题目没有太多思路，
写了几个例子开始手动模拟reverse事件后，
发现最重要的一点要是要记录每个元音出现的位置并按相反的顺序再放回去。
记录位置并reverse？
那当然是stack的功能。

首先,我们遍历整个字符串数组，将元音按顺序存入stack，并把原来的元音值改为null，以供后面插入判断；
其次再次遍历字符串数组，判断元素是否为null，如果是则stack出栈回到此位置，当stack都出栈后，就可以宣布结束了。

简洁明了！不过要用到两次for循环，感觉比较笨，但时间复杂度应该也是2N吧，所以应该可以接受。

上代码：

```js
/**
 * @param {string} s
 * @return {string}
 */

var reverseVowels = function(s) {
    if(len < 1) return s;
    var len = s.length,
        sArr = s.split('');
        vowelMap = {a:1,e:1,i:1,o:1,u:1,A:1,E:1,I:1,O:1,U:1},
        stack = [];
    for(var i = 0; i < len; i++) {
        if(vowelMap[s[i]]){
            stack.push(s[i]);
            sArr[i] = null;
        }
    }
    for(var j = 0; j < len; j++){
        if(!sArr[j]) sArr[j] = stack.pop();
        if(stack.length === 0) break;
    }
    return sArr.join('');
};
```
