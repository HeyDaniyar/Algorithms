## 关于函数柯里化的题目


用函数柯里化 实现如下效果:

`sum(1)(2)() = 3`
`sum(14,23)() = 14 `

函数实现：
```js
function sum() {
    const _args = [].slice.call(arguments);
    return function (){
      if(arguments.length === 0) {
        return _args.reduce((a,b) => a+ b)
      }
      [].push.apply(_args,[].slice.call(arguments))
      return arguments.callee;
    }
}
```

如果不需要最好的括号，可以这么来实现：

```js
function add(){
  let args = [].slice.call(arguments);
  function adder(){
    const newArgs = [].slice.call(arguments);
    args = args.concat(newArgs);
    return adder;
  }
  adder.toString = (() => args.reduce((a,b) => a + b))

  return adder.toString()
}
```

## flatten Array 展开数组

```js
function flatten(a) {
  if(!Array.isArray(a)) return

  const arr = [];

  const merge = ((a) =>{
    for(let i = 0; i < a.length; i++) {
      if(Array.isArray(a[i])) merge(a[i])
      else arr.push(a[i])
    }
    return arr
  })
  return merge(a)
}

```

## 编写js深度克隆对象

```js
function deepClone(obj) {
  // null undefined non-object -function
  if(!obj || typeof obj !== "object") return obj

  //dom node
  if(obj.nodeType && "cloneNode" in obj) {
    return obj.cloneNode(true)
  }

  //Date
  if(Object.prototype.toString.call(a) === '[object Object]') return new Date(obj.getTime())

  // RegExp
  if(Object.prototype.toSring.call(a) === '[object RegExp]'){
    const flags = [];
    if(obj.global) flags.push('g')
    if(obj.multiline) flags.push('m')
    if(obj.ignoreCase) flags.push('i')
    return new RegExp(obj.source, flags.join(''))
  }
  //Array
  if(Array.isArray(obj)) { const result = [] }
  // Object 
  else if(obj.constructor) {
    const result = new obj.constructor();
  } else result = {}

  for(let key in obj) {
    result[key]  = deepClone(obj[key])
  }

  return result;
}
```
