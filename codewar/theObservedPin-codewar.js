//mine

function getPINs(observed) {
  var arr = observed.split(''),len = arr.length;
  var result = [];
  for(var i = 0; i < len; i++) {
  	var nearNum = getNearNum(arr[i]);
   	result = bindArray(result,nearNum);
  }
  return result
}

function bindArray(x,y) {
   var lenX = x.length,lenY = y.length, result = [];
   if(lenX === 0) return y
   for(var i = 0; i < lenX; i++){
   		for(var j = 0; j < lenY; j++) {
        result.push(x[i] + y[j]);
      }
   }
   return result
}

function getNearNum(n){
	var result = [];
  switch(n){
  	case '1':
    	result = ['1','2','4']
      break;
    case '2':
    	result = ['1','2','5','3']
      break;
    case '3':
    	result = ['2','3','6']
      break;
    case '4':
    	result = ['1','4','5','7']
      break;
     case '5':
     	result = ['2','4','5','6','8']
      break;
     case '6':
     	result = ['3','5','6','9']
      break;
     case '7':
     	result = ['4','7','8']
      break;
     case '8':
     	result = ['7','5','8','9','0']
      break;
     case '9':
     	result = ['8','9','6']
      break;
     case '0':
     	result = ['8','0']
      break;
  }
  return result
}


//others
function getPINs(observed) {
  var adjacent = [
    /* 0 */ [0, 8],
    /* 1 */ [1, 2, 4],
    /* 2 */ [1, 2, 3, 5],
    /* 3 */ [2, 3, 6],
    /* 4 */ [1, 4, 5, 7],
    /* 5 */ [2, 4, 5, 6, 8],
    /* 6 */ [3, 5, 6, 9],
    /* 7 */ [4, 7, 8],
    /* 8 */ [5, 7, 8, 9, 0],
    /* 9 */ [6, 8, 9]
  ];

  return observed
    .split('')
    .map(function(d) { return adjacent[d|0]; })
    .reduce(function(pa, da) {
      return da.reduce(function(pv, d) {
        return pv.concat(pa.map(function(p) {
          return '' + p + d;
        }));
      }, []);
    }, ['']);
}

//others
function mixNMatch(add, addTo) {
  var out = [];
  add.forEach(function(v, i) {addTo.forEach(function(w, j) {out.push(v + w);});});
  return out;
}

function getPINs(observed) {
  var map = {1:['1','2','4'], 2:['1','2','3','5'], 3:['2','3','6'], 4:['1','4','5','7'], 5:['2','4','5','6','8'],
             6:['3','5','6','9'], 7:['4','7','8'], 8:['5','7','8','9','0'], 9:['6','8','9'], 0:['8','0']};
  return observed.length == 1 ? map[observed[0]] : mixNMatch(map[observed[0]], getPINs(observed.slice(1)));
}
