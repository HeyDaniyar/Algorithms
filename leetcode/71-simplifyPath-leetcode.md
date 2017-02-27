生平第一次10分钟内做出来的leetcode的medium题,
从开始确定用stash到排除完几个特殊情况，五行代码搞定，然后一次性提交成功，哦吼！
不过觉得这道题真不是medium难度。。。


```js
var simplifyPath = function(path) {
    const arr = path.split('/');
    let stash = [];
    for(let i = 0; i < arr.length; i++) {
        if(arr[i] === '' || arr[i] === '.') continue;
        if(arr[i] === '..') stash.pop();
        else stash.push(arr[i]);
    }
    return '/' + stash.join('/');;
};
```
