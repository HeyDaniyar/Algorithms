

//mine
function list(names){
  var len = names.length, str = '';
  names.map(function(item,i) {
  	if(i + 1 === len) str += item.name ;
  	if(i + 2 === len) str += item.name + " & ";
  	if(i + 2 < len) str += item.name + ', ';
  })
  return str
}



//others
function list(names){
  return names.reduce(function(prev, current, index, array){
    if (index === 0){
      return current.name;
    }
    else if (index === array.length - 1){
      return prev + ' & ' + current.name;
    }
    else {
      return prev + ', ' + current.name;
    }
  }, '');
 }

 function list(names) {
   var xs = names.map(p => p.name)
   var x = xs.pop()
   return xs.length ? xs.join(", ") + " & " + x : x || ""
 }
