## Description

Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.

push(x) -- Push element x onto stack.
pop() -- Removes the element on top of the stack.
top() -- Get the top element.
getMin() -- Retrieve the minimum element in the stack.

### Example
```js
MinStack minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
minStack.getMin();   --> Returns -3.
minStack.pop();
minStack.top();      --> Returns 0.
minStack.getMin();   --> Returns -2.
```

## Solution

最开始想到的是用两个数组，一个就是当前的数值数组，另一个就是最小值的排序数组。后来发现如果每次push的时候，如果将当前最小值和当前数值一起存进数据中，这样无论是pop的时候或者getmin都会非常轻松，而且也没有用多余的空间，是一个小trick。

```js
/**
 * initialize your data structure here.
 */
var MinStack = function() {
    this.values = [];
    this.minValue;
};

/**
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function(x) {
    this.values.push([x,this.minValue]);
    if(this.values.length === 1)
        this.minValue = x;
    else if(x < this.minValue)
        this.minValue = x;
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
    const items = this.values.pop();
    this.minValue = items[1];
};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
     return this.values[this.values.length - 1][0];
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function() {
     return this.minValue;
};
```
