/*Description:

Implement the function unique_in_order which takes as argument a sequence and returns a list of items without any elements with the same value next to each other and preserving the original order of elements.

For example:


uniqueInOrder('AAAABBBCCDAABBB') == ['A', 'B', 'C', 'D', 'A', 'B']
uniqueInOrder('ABBCcAD')         == ['A', 'B', 'C', 'c', 'A', 'D']
uniqueInOrder([1,2,2,3,3])       == [1,2,3]

*/


//mine
var uniqueInOrder = function(iterable) {
  //your code here - remember iterable can be a string or an array
  if (typeof(iterable) === 'string')
    var iterable = iterable.split('');
  var len = iterable.length;
  if (len === 0) return [];
  var newArray = [iterable[0]];
  for (var i = 1; i < len; i++) {
    var temp = iterable[i];
    if (temp !== iterable[i - 1]) {
      newArray.push(temp);
    }
  }
  return newArray;
}


//others
var uniqueInOrder = function(iterable) {
  return [].filter.call(iterable, (function(a, i) {
    return iterable[i - 1] !== a
  }));
}

//others
function uniqueInOrder(it) {
  var result = []
  var last

  for (var i = 0; i < it.length; i++) {
    if (it[i] !== last) {
      result.push(last = it[i])
    }
  }

  return result
}
