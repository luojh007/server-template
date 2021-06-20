
/**
 * 根据前序、中序数组输出 构建二叉树
 */

// 解题关键：根据两个数组里的值，递归构建

function TreeNode (val, left, right) {
  this.val = (val === undefined ? 0 : val)
  this.left = (left === undefined ? null : left)
  this.right = (right === undefined ? null : right)
}

/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function (preorder, inorder) {

  let inMap = getInMap(inorder)
  let ans = build(0, preorder.length - 1, 0, inorder.length - 1)
  return ans

  function build (preStart, preEnd, inStart, inEnd) {

    // 终止交易条件
    if (inStart > inEnd || preStart > preEnd) return null

    // 先序遍历
    let root = new TreeNode(preorder[preStart])

    // 最关键的一点：根据当前节点的值，在中序数组中找到对应的下标，进而计算出 左链的长度
    let inRoot = inMap[root.val]
    let numsLeft = inRoot - inStart

    root.left = build(preStart + 1, preStart + numsLeft, inStart, inRoot - 1)
    root.right = build(preStart + numsLeft + 1, preEnd, inRoot + 1, inEnd)

    return root
  }


  function getInMap (arr = []) {
    var map = {}
    for (let i in arr) {
      map[arr[i]] = parseInt(i)
    }
    return map
  }
};


console.log(buildTree([3, 9, 20, 15, 7], [9, 3, 15, 20, 7]))