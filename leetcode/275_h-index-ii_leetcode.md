## Description

Follow up for H-Index: What if the citations array is sorted in ascending order? Could you optimize your algorithm?

## Solution
继续上一题的followup， 如果数组是有序的，数组长度为N，那我们可以得出，对于数组i,`N-i`就是论文引用次数大于`Num[i]`的文章数目，也就是当前的`H-index`肯定在这个i之后或就是当前i。想到这里，是不是就有点二分查找的影子？是的，没错，二分查找就是道题的解法。


```js
/**
 * @param {number[]} citations
 * @return {number}
 */
 // H-Index II
 // Time complexity: O(logn), Space complexity: O(1)
 public class Solution {
     public int hIndex(int[] citations) {
         final int n = citations.length;
         int begin = 0;
         int end = citations.length;

         while (begin < end) {
             final int mid = begin + (end - begin) / 2;
             if (citations[mid] < n - mid) {
                 begin = mid + 1;
             } else {
                 end = mid;
             }
         }
         return n - begin;
     }
 }
```
