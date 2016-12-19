最开始的思考出发点是考虑人脑的运算机制，即把运算符和数字分开。
所以第一步自然而然想到的是先遍历，对于“运算符号"入栈的时候做特殊考虑，

可后来做着做着，就卡在关键的异步，即如何确定* 或者/ 的优先级比+ - 高，
想到这里便开始思绪混乱，没有按时找到合适的解决办法。

后来看完讨论后，发现了一个神奇的“运算后置法”,即在当前的运算符出现的时候执行上一次的运算符操作，
等级问题瞬间得到完美解决！

现在通过代码来分析：

```JavaScript
/**
 * @param {string} s
 * @return {number}
 */
var calculate = function(s) {
    //确定特殊运算符
    var op = {'+':1,'-':1,'*':1,'/':1};
    var stack = [], num = 0, result = 0, sign ='+';

    for(var i = 0; i < s.length; i++){
        var char = s.charAt(i);
        //if current char is number
       if(parseInt(char) >= 0 ) num = num*10 + parseInt(char);
       //if current char is operation
       if(op[char] || i == (s.length - 1)) {
          //注意这里的sign和char不同，char代表的是当前的运算符，sign代表上一个运算符，默认为‘+’
           if( sign === '+') stack.push(num);
           if( sign === '-') stack.push(-num);
           if( sign === '*') stack.push(stack.pop()*num);
           if( sign === '/') stack.push(Math.trunc(stack.pop()/num));
           sign = char;
           num = 0;
       }
    }

    stack.forEach(function(item){
        result += item;
    });
    return result;
};
```

不知道这个方式是巧合还是处理这种运算问题的一个通配法，反正觉得这个方法实在是骚，简单明了！
