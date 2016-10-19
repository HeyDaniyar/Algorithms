/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
 var arr = [];
var invertTree = function(root) {
    swap(root);
    return root
};
//递归法
var swap = function (node) {
  if (node !== null) {
       swap(node.left);
       swap(node.right);
       var temp = node.left;
       node.left = node.right;
       node.right = temp;
  }
}

//非递归 栈方法
var invertTree = function (root) {
    if(root === null) return
    var stack = [];
    stack.push(root);
    while(stack.length > 0){
        var node = stack.pop();
        var tempLeft = node.left;
        node.left = node.right;
        node.right = tempLeft;
        if(node.left !== null)  stack.push(node.left);
        if(node.right !== null) stack.push(node.right);
    }
    return root
}

//非递归 队列方法
var invertTree = function (root) {
    if( root === null) return
    var queue = [];
    queue.push(root);
    while(queue.length > 0 ){
      var node = queue.shift();
      var tempLeft = node.left;
      node.left = node.right;
      node.right = tempLeft;
      if(node.left !== null) queue.push(node.left);
      if(node.right !== null) queue.push(node.right);
    }
    return root;
}
