/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    var l = nums.length;
    var numsObj = {};
    for(var i = 0; i < l; i++) {
        var curNumber = nums[i];
        var rest = target - curNumber;
        if( numsObj.hasOwnProperty(rest) ) {
            return [i,numsObj[rest]]
        }
        numsObj[curNumber] = i;
    }
};


//best one
var twoSum = function(nums, target) {
    const hmap = {}
    for (var idx=0; idx<nums.length; idx++) {
        var val = nums[idx]
        var delta = target - val
        var deltaIdx = hmap[delta]
        if (deltaIdx !== undefined && deltaIdx !== idx) {
            return [deltaIdx, idx]
        }
        hmap[val] = idx
    }
    return []
};
