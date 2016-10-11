/*In this kata you have to create all permutations of an input string and remove duplicates, if present. This means, you have to shuffle all letters from the input in all possible orders.

Examples:

permutations('a'); // ['a']
permutations('ab'); // ['ab', 'ba']
permutations('aabb'); // ['aabb', 'abab', 'abba', 'baab', 'baba', 'bbaa']
The order of the permutations doesn't matter.
*/

function permutations(string) {
  var arr = string.split(''), tmp = arr.slice(), heads = [], out = [];
  if(string.length == 1) return [string];
  arr.forEach(function(v, i, arr) {
    if(heads.indexOf(v) == -1) {
      heads.push(v);
      tmp.splice(tmp.indexOf(v), 1);
      permutations(tmp.join('')).forEach(function(w) {out.push(v + w);});
      tmp.push(v);
    }
  });
  return out;
}

//others
function permutations(string) {
  var head = string[0];
  var tail = string.split('');
  tail.splice(0,1);
  return g(r(head,tail.join('')));
}

function r(x,str){
  if(!str){return [x]}
  var head = str[0];
  var tail = str.split('');
  tail.splice(0,1);
  var before = r(head,tail.join(''));
  var rst = [];
  for(var i = 0; i < before.length;i++){
    for(var j = 0; j <= before[i].length; j++){
      var tmp = before[i].split('');
      tmp.splice(j,0,x)
      rst.push(tmp.join(''))
    }
  }
  return rst;
}

function g(a){
  var b = [];
  a.forEach(function(v,index){
    if(a.indexOf(v) === index) b.push(v);
  })
  return b;
