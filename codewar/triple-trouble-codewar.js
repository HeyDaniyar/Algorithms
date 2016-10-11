/*Description:

Write a function

tripledouble(num1,num2)
which takes in numbers num1 and num2 and returns 1 if there is a straight triple of a number at any place in num1 and also a straight double of the same number in num2.
For example:
tripledouble(451999277, 41177722899) == 1 // num1 has straight triple 999s and
                                          // num2 has straight double 99s

tripledouble(1222345, 12345) == 0 // num1 has straight triple 2s but num2 has only a single 2

tripledouble(12345, 12345) == 0

tripledouble(666789, 12345667) == 1
If this isn't the case, return 0

*/



function tripledouble(num1, num2) {
 		var numA = num1.toString().split(''), numB = num2.toString().split('');
    var lenA = numA.length, lenB = numB.length;
   	for (var i = 2; i < lenA; i ++) {
    	if(numA[i-1] === numA[i] && numA[i]=== numA[i-2]) {
         for (var j = 1; j < lenB; j ++) {
    				if(numB[j] === numB[j-1] && numB[j] === numA[i]) return 1;
    			}
    		}
    }
    return 0;
}


//others
function tripledouble(num1, num2) {
  for (let i = 0; i < 10; i++) {
    if (new RegExp(`${i}{3}`).test(num1) && new RegExp(`${i}{2}`).test(num2)) {
      return 1;
    }
  }
  return 0;
}
