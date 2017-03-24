## Description
Implement a basic calculator to evaluate a simple expression string.

The expression string may contain open ( and closing parentheses ), the plus + or minus sign -, non-negative integers and empty spaces .

You may assume that the given expression is always valid.

Some examples:

``` js
"1 + 1" = 2
" 2-1 + 2 " = 3
"(1+(4+5+2)-3)+(6+8)" = 23
```


## Solution

```js
/**
 * @param {string} s
 * @return {number}
 */

var calculate = function(s) {
  if(!s) return 0;
  let result = 0, sign = 1, num = 0;

  let stack = [sign];

  for(let i = 0; i < s.length; i++) {
    let c = s[i];
    if(c >= '0' && c <= '9')  num = num*10 + (c - '0')
    else if(c === '+' || c === '-' ){
      result += sign * num;
      sign = stack[stack.length - 1] * (c === '+' ? 1 : -1);
      num = 0;
    }
    else if( c === '(') {
      stack.push(sign)
    }
    else if (c === ')') {
      stack.pop();
    }
  }
};
```
