'use strict';
const fs = require('fs'),
    lineReader = require('line-reader');

const fileName = "242-ValidAnagram-leetcode",
fileSrc = '../leetcode/'+ fileName + '.md';

fs.readFile(fileSrc, 'utf-8', function(err, data) {
    let fileInfo = data.split('====')[1];
    const Info = {};
    // console.log('fileInfo',fileInfo);
    // console.log(fileInfo.split('\n'));
    fileInfo.split('\n').forEach((line) =>{
      if(line) {
        let lineArr = line.split(':');
        const key = lineArr[0].toLowerCase(), value = lineArr[1];
        Info[key] = value;
      }
    })

    const catolgInfo = "|" +Info.id + "|" + "[" + Info.name + "]" +  "[" + Info.language + "]" +
    "(" + fileSrc +")" + "[" + Info.level  + "]" + "[" + Info.tags +"]";
     console.log('catolgInfo',catolgInfo)
});
