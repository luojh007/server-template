function TreeNode (val, left, right) {
  this.val = (val === undefined ? 0 : val)
  this.left = (left === undefined ? null : left)
  this.right = (right === undefined ? null : right)
}

/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
var constructMaximumBinaryTree = function (nums) {
  if (!nums.length) return null
  return traverse(0, nums.length - 1)

  function traverse (start, end) {
    if (start > end) return null
    let rootIndex = getMaxIndex(start, end)
    let root = new TreeNode(nums[rootIndex])

    root.left = traverse(start, rootIndex - 1)
    root.right = traverse(rootIndex + 1, end)
    return root
  }


  function getMaxIndex (start, end) {
    let maxIndex = start
    for (let i = start; i <= end; i++) {
      if (nums[i] > nums[maxIndex]) {
        maxIndex = i
      }
    }
    return maxIndex
  }
};