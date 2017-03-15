## Description

Given a collection of candidate numbers (C) and a target number (T), find all unique combinations in C where the candidate numbers sums to T.

Each number in C may only be used once in the combination.

Note:
All numbers (including target) will be positive integers.
The solution set must not contain duplicate combinations.
For example, given candidate set [10, 1, 2, 7, 6, 1, 5] and target 8,
A solution set is:

#### Example
```js
[
  [1, 7],
  [1, 2, 5],
  [2, 6],
  [1, 1, 6]
]

```


## Solution
和上一道39同样的思路，只是修剪枝叶的过程稍有不同。因为题目要求不能出现重复的值，result里的每个数组必须唯一。那假如给定的candidates数组里可能有重复数字，那么我们就得让for循环从每一次遍历之后的位置进行。所以就有`start = i + 1 `。 除此之外，还需要特别考虑对于`[1,1,2,5]`这样本身有重复数字的，我们还得增加一些特别的额外条件。怎么理解 `f(i !== start && nums[i] === nums[i-1])`这个判定条件呢？ 我们就以上述的例子做说明，假设`candidates = [1,1,2,5]`,`target = 10`,如果分析每次的具体函数执行过程，有如下的结果：

- 程序执行backtrack函数，每次遇到backtrack函数回调分别向数组temp添加元素，一直到全部添加完毕[1,1,2,5]

- 因为不满足条件，从temp中一个个出栈,首先是变成`[1,1,2]`，然后执行i+1操作发现等于nums的长度，所以只好再次返回，再次执行出栈，变成`[1,1]`,再次执行i+1,入栈变成`[1,1,5]`,仍不满足条件继续出栈，重复上述过程一直到变回最初开始进行递归之前的`temp = []`。

- 再次进行i+1自增，这时候i已经大于start，然后因为第二个元素`1`和第一个元素相同，所以如果我们不去跳过这个特殊元素，无疑会重复刚才的第一步和第二部操作，如果前两部操作中有满足result的值，那无疑会再次向result中添加同样的结果。所以我们需要对这种情况进行特殊处理。



以上就是对这个题目进行的简短分析，程序代码如下。

```js
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function(candidates, target) {
    let tempList = [], result = [];
    candidates.sort();
    backtrack(tempList, result, candidates, target, 0);
    return result
};

function backtrack(tempList, result, nums, remain, start) {
    if(remain < 0) return
    else if (remain === 0) {
        result.push(tempList.slice());
    }
    else {
        for(let i = start; i < nums.length; i++) {
            if(i !== start && nums[i] === nums[i-1]) continue;
            tempList.push(nums[i]);
            backtrack(tempList, result, nums, remain- nums[i], i+1);
            tempList.pop();
        }
    }

}
```
