首先这题的表述确实很不清楚，
让人很难把握题意。
题意应该描述清楚“ 12.0 .0” 和“ 12.0” 还有“ 12.0 .0” 是一样大的版本号。

如果比较固定位数的版本号， 那这道题就是小学问题， 本题就是多了不同版本， 所以直接办成了多重条件分类题。

首先我们设定两个版本的较短的为len， 然后将两个版本从高位向低位比较， 只要出现不相等现象， 就可以直接判断出两个版本大小。

剩下来的就是三种情况，

1， 较长的那个版本中剩余的数字全为0， 即两个版本相等。
2， 较长的那个版本中有不为0， 较长的版本大。
3， 两个版本长度一样， 所有数字相同。


第一次提交出现错误， 是没有考虑“ 0000” 和 '0'
应该一样视为0， 坑！

```JavaScript
/**
 * @param {string} version1
 * @param {string} version2
 * @return {number}
 */
var compareVersion = function(version1, version2) {
    var arr1 = version1.split('.'),
        arr2 = version2.split('.'),
        len = 0;

    //取较小版本为len
    arr1.length < arr2.length ? len = arr1.length : len = arr2.length;

    for(var i = 0; i < len; i++) {
        if(parseInt(arr1[i]) > parseInt(arr2[i])) return 1;
        if(parseInt(arr1[i]) < parseInt(arr2[i])) return -1;
    }
    //如果v1是较长版本，看后续版本数字是否全为0
    if(i < arr1.length) {
        while(i < arr1.length) {
            if(parseInt(arr1[i]) !== 0) return 1;
            i++
        }
        return 0;
    }
    //如果v2是较长版本，看后续版本数字是否全为0
    if(i < arr2.length) {
          while(i < arr2.length) {
              console.log('arr2',arr2[i])
            if(parseInt(arr2[i]) !== 0) return -1;
            i++
        }
        return 0;
    }
    //v1和 v2 长度相同，而且每一位都大小相等
    return 0;
};
`
``
