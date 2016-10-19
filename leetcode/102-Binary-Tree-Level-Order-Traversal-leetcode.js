
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */

 var levelOrder = function(root){
   var result = [];
   if(root === null) return [];
   var queue = [], temp = [], curLvlCnt = 1, nextLvlCnt = 0;
   queue.push(root);
   //curLvlCnt is  to deside whether add to result push
   while(queue.length > 0) {
     var node = queue.shift();
     temp.push(node.val);
     curLvlCnt --;

     if(node.left){
       queue.push(node.left);
       nextLvlCnt ++;
     }

     if(node.right){
       queue.push(node.right);
       nextLvlCnt ++;
     }

     if(curLvlCnt === 0){
       result.push(temp);
       curLvlCnt = nextLvlCnt;
       nextLvlCnt = 0;
       temp = []
     }
   }
   return result
 }
