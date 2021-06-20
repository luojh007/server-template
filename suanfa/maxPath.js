/**
 * 二叉树的最大路径和
 * 1. 后序遍历。计算左右两节点，比较大小，去较大与root的值相加
 * 2. 注意节点的负数情况,需要调用Math.max函数，并且默认值设置为最小值-Infinity
 * 3. 求的是最大和，而不是最大路径，所以必须遍历整颗树
 */

function maxPath (tree = []) {
  let ans = -Infinity
  // 递归遍历整颗树，比较更新ans
  maxSideNode(tree)
  return ans

  function maxSideNode (node) {
    if (!node) return 0

    var left = Math.max(maxSideNode(node.left), 0)
    var right = Math.max(maxSideNode(node.right), 0)

    // 没遍历一次，更新结果
    ans = Math.max(ans, left + right + node.value)
    return Math.max(left, right) + node.value
  }
}