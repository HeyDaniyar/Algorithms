/**
 * @param {number} n
 * @return {boolean}
 */
var isHappy = function(n) {
    //dont understand why the 7 is happy number
    if(n === 1 || n ===7)  return true
    if(n < 10) return false;
    var numsArray = n.toString().split('');
    var len = numsArray.length;
    var sum = 0, i = 0;
    while(i < len){
         var temp = parseInt(numsArray[i])
         sum += temp*temp;
         i++;
    }
    return isHappy(sum)

};
