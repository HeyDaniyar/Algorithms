## Description

Given an array of citations (each citation is a non-negative integer) of a researcher, write a function to compute the researcher's h-index.

According to the definition of h-index on Wikipedia: "A scientist has index h if h of his/her N papers have at least h citations each, and the other N − h papers have no more than h citations each."

For example, given citations = [3, 0, 6, 1, 5], which means the researcher has 5 papers in total and each of them had received 3, 0, 6, 1, 5 citations respectively. Since the researcher has 3 papers with at least 3 citations each and the remaining two with no more than 3 citations each, his h-index is 3.

Note: If there are several possible values for h, the maximum one is taken as the h-index


## Solution

因为论文的发表数肯定不大，所以采取计数算法。算法复杂度O(N)



##### 解法一
```js
/**
 * @param {number[]} citations
 * @return {number}
 */
var hIndex = function(citations) {
    const nums = sort(citations);
    return getIndex(nums);
};

function sort(array) {
    let count = [], min = array[0], max = array[0],nums = [];
    for(let i = 0; i < array.length; i++) {
        if(min >= array[i]) min = array[i]
        if(max <= array[i]) max = array[i]
        count[array[i]] = count[array[i]] ? count[array[i]] + 1 : 1;
    }
    for(let j = max; j >= min; j--) {
        while(count[j]-- > 0) {
            nums.push(j);
        }
    }
    return nums

}
function getIndex(nums) {
    if(nums.length < 1) return 0
    if(nums.length === 1) return Math.min(nums[0],1)
    let temp = [];
    for(let i = 0; i < nums.length; i++) {
      if(temp.length >= nums[i]) {
           return Math.min(temp.length, temp.pop() || 0);
       }
       temp.push(nums[i]);
    }
    return  Math.min(temp.length, temp.pop() || 0)
}
```
但是写完这个算法好发现怎么和discuss里的答案相比那么复杂？观察了一下原因在于我的计数排序算法用的方法不对啊，排序最后生成的数组count完全就可以判断h-index得到结果，非得再去判断一次，臃肿。


#### 解法二：

这才是计数法的巧妙用处！！！首先，要时刻记住count的index记录的是sort数组的元素，值是出现的次数。按照H-index的定义，是不是H-index的max值就应该是这个数组的length。所以只要是大于length的值，我们都不需考虑数值，只需要考虑次数。最后，就是这个算法最tricky的部分，从len开始回退记录每个index的出现的次数。只要出现的次数大于当前index，okay，那最小值就是这个。为什么？因为count[len] = len 说明的是整个数组所有元素(即论文)都有len次引用，同理count[len-1] = 1说明有一篇论文有len-1次引用,那当我总的文章数(total)如果大于当前的引用次数，那是不是就是意味着H-index就是当前的引用次数？别的不说，佩服这个清晰的思路。


```js
var hIndex = function(citations) {
  const len = citations.length;
  let count = [];

  for(let i = 0; i < len; i++) {
    const c = citations[i];
    if(c > len) count[len] ++
    else count[c] ++
  }
  let total = 0;
  for(let i = len; i >= 0; i-- ) {
    total += count[i];
    if(total >= i) return i
  }
}
```
