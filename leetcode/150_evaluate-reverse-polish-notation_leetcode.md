## Description

Evaluate the value of an arithmetic expression in Reverse Polish Notation.

Valid operators are `+, -, *, /. `Each operand may be an integer or another expression.

Some examples:

```js

["2", "1", "+", "3", "*"] -> ((2 + 1) * 3) -> 9
["4", "13", "5", "/", "+"] -> (4 + (13 / 5)) -> 6

```

## Solution
思路很简单，让数字入栈，遇到单位符号的时候让最后两位出栈运算，将结果再次入栈即可实现。

```js
/**
 * @param {string[]} tokens
 * @return {number}
 */
var evalRPN = function(tokens) {
    if(!tokens) return []
    const isOperate = {
        '+':true,
        '-':true,
        '*':true,
        '/':true,
    }
    let stack = [];
    for(let i = 0; i < tokens.length; i++) {
        const cur = tokens[i];
        if(!isOperate[cur]) stack.push(parseInt(cur))
        else {
            const b = stack.pop();
            const a = stack.pop();
            const result = calculate(a, b, cur);
            stack.push(result);
        }
    }
    return stack.pop()
};

function calculate(a, b, operate) {
    switch(operate) {
        case '+' : return a + b;
        case '-' : return a - b;
        case '*' : return a * b;
        case '/' : {
            return parseInt(a / b);
        }
    }
}
```
