/*Description:

Bob is preparing to pass IQ test. The most frequent task in this test is to find out which one of the given numbers differs from the others. Bob observed that one number usually differs from the others in evenness. Help Bob — to check his answers, he needs a program that among the given numbers finds one that is different in evenness, and return a position of this number.

! Keep in mind that your task is to help Bob solve a real IQ test, which means indexes of the elements start from 1 (not 0)

Examples :

iqTest("2 4 7 8 10") => 3 // Third number is odd, while the rest of the numbers are even

iqTest("1 2 1 1") => 2 // Second number is even, while the rest of the numbers are odd

*/
function iqTest(numbers){
  var numsArray = numbers.split(' ');
  console.log('numsArray',numsArray);
  var i = 1, numsLength = numsArray.length;
  while (i < (numsLength + 1)){
    var num = parseInt(numsArray[i]);
    var numBefore = parseInt(numsArray[i-1]);
    if(num%2 !== numBefore%2){
      var numAfter = parseInt(numsArray[i+1]);
      if(numAfter%2 !== num%2) return i+1;
      return i;
    }
    i++;
  }
}

//best
function iqTest(numbers){
  numbers = numbers.split(' ')
  var evens = []
  var odds = []

  for (var i = 0; i < numbers.length; i++) {
    if (numbers[i] & 1) {
      odds.push(i + 1)
    } else {
      evens.push(i + 1)
    }
  }
  return evens.length === 1 ? evens[0] : odds[0]
}

function iqTest(numbers){
  var nums = numbers.split(" ").map(x => x % 2);
  var sum = nums.reduce((a,b) => a + b);
  var target = sum > 1 ? 0 : 1;

  return nums.indexOf(target) + 1;
}

function iqTest(numbers){
  numbers = numbers.split(" ").map(function(el){return parseInt(el)});

  var odd = numbers.filter(function(el){ return el % 2 === 1});
  var even = numbers.filter(function(el){ return el % 2 === 0});

  return odd.length < even.length ? (numbers.indexOf(odd[0]) + 1) : (numbers.indexOf(even[0]) + 1);
}
