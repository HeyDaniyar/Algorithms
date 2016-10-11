/*
Description:

Is Prime

Define a function isPrime that takes one integer argument and returns true or false depending on if the integer is a prime.

Per Wikipedia, a prime number (or a prime) is a natural number greater than 1 that has no positive divisors other than 1 and itself.

Example

isPrime(5)
=> true
*/

//mine
//actually is wrong ,because the negative number is all not true;
function isPrime(num) {
  num = Math.abs(num);
  if(num === 0 || num === 1) return false;
  var i = 2;
  while(i < num){
    if( num % i === 0){
      return false;
    }
    i++;
  }
  return true;
}


//others
//how brief this is
function isPrime(num) {
  num = Math.sqrt(num);
  for (var i = 2; i < num; i++) if (num % i == 0) return false;
  return num >= 2;
}
