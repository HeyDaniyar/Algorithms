/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} sum
 * @return {number}
 */
var pathSum = function(root, sum) {
  //result must be an object,cant be number
   var result = {res:0};
   pathSumHelper(root,sum,result,false);
   return result.res;
};

var pathSumHelper = function(node,sum,result,parentUsed) {
    if(!node) return;
    if(sum - node.val === 0) result.res++;
    pathSumHelper(node.left,sum - node.val,result,true);
    pathSumHelper(node.right,sum - node.val,result,true);
    //if parent is part of the sum, then we cannot start a new path which jump over this node
    if(parentUsed === false){
        pathSumHelper(node.left,sum,result,false);
        pathSumHelper(node.right,sum,result,false);
    }
}
