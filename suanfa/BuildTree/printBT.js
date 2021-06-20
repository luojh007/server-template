/**
 * 二分搜索，输出二叉树
 */
function TreeNode (val, left, right) {
  this.val = (val === undefined ? 0 : val)
  this.left = (left === undefined ? null : left)
  this.right = (right === undefined ? null : right)
}

var r1 = new TreeNode(1, r2,)
var r2 = new TreeNode(2,)
// var r3 = TreeNode(3, r5, r6)
// var r4 = TreeNode(4)
// var r5 = TreeNode(5)
// var r6 = TreeNode(6)
var printTree = function (root) {

  let ans = []
  let m = getDeep(root)
  let n = Math.pow(2, m) - 1
  // 构造能容纳满二叉树的二维数组
  for (let i = 0; i < m; i++) {
    ans[i] = []
    for (let j = 0; j < n; j++) {
      ans[i][j] = ''
    }
  }

  traverse(root, 0, 0, n - 1)
  return ans

  function getDeep (root) {
    if (!root) return 0
    return Math.max(getDeep(root.left), getDeep(root.right)) + 1
  }
  function traverse (root, deep, start, end) {
    if (!root) return
    if (start > end) return
    else if (start === end) ans[deep][start] = root.val
    else {
      var middle = Math.floor((end - start) / 2 + start)
      ans[deep][middle] = String(root.val)
      traverse(root.left, deep++, start, middle)
      traverse(root.right, deep++, middle + 1, end)
    }

  }

};

printTree(r1)