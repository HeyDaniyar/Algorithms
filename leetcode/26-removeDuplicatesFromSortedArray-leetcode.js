/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
  var len = nums.length;
  if (len < 2) return len;
  var id = 1;
  for (var i = 1; i < len; i++) {
    if (nums[i] != nums[i - 1]) nums[id++] = nums[i];
  }
  return id;
};

/*
首先，本题理解题意就花了很长时间；
没有理解不应该重新分配新数组;

其次，当理解好题意后，怎么在for循环中进行操作nums又走了很多弯路。
常规来说，我们会让 i 和i+1进行比较，把相等的情况作为if条件来进行操作，
但是这样不知不觉中就会陷入死循环，此时就应该从另外一个角度出发，尝试比较 i 和i-1,
并考虑是否把if情况变成不相等的条件，这时候可能就会柳暗花明又一村。
*/
