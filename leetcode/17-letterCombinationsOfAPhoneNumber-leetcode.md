首先很容易想到了用map的方法去获取每个数字对应的字母，
但是对获取到的字母进行组合排列时，陷入一个死循环，不知道如何穷尽出所有可能的组合。
会人工判断，但是程序表达不出来，看来是组合数学没学好。

看到一个美女程序员ZiXi Zhang的优雅解法后瞬间爆棚，为什么一个女孩JS能写的这么简洁明了，
献上膝盖的同时献上她的简介代码：

```js
/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function(digits) {
    const map = {
        "2": ["a", "b", "c"],
		"3": ["d", "e", "f"],
		"4": ["g", "h", "i"],
		"5": ["j", "k", "l"],
		"6": ["m", "n", "o"],
		"7": ["p", "q", "r", "s"],
		"8": ["t", "u", "v"],
		"9": ["w", "x", "y", "z"]
    };
    let rlt = map[digits[0]];
    digits = digits.substr(1);
    digits.split('').forEach((digit)=>{
        let t = [];
        map[digit].forEach((letter)=>{
            t = t.concat(rlt.map((item)=>{
                return item + letter;
            }))
        })
        rlt = t;
    })
    return rlt === undefined ? [] : rlt;  
};

```
