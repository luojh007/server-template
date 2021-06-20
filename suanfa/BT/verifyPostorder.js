/**
 * @param {number[]} postorder
 * @return {boolean}
 */
var verifyPostorder = function (postorder) {

  let ans = true
  traverse(0, postorder.length - 1)
  return ans

  function traverse (start, end) {
    if (!ans || start >= end) return null

    let rootVal = postorder[end]
    // 找到右节点
    let rightIndex
    for (let i = end - 1; i > start; i--) {
      if (postorder[i] > rootVal) {
        rightIndex = i
        break
      }
    }

    // 找到左节点
    let leftIndex
    for (let i = end - 1; i >= start; i--) {
      if (postorder[i] < rootVal) {
        leftIndex = i
        break
      }
    }

    if (rightIndex && leftIndex && (leftIndex > rightIndex)) {
      ans = false
      return null
    }

    leftIndex && traverse(start, leftIndex)
    rightIndex && traverse(leftIndex + 1, rightIndex)

  }
};

console.log(verifyPostorder([1, 2, 5, 10, 6, 9, 4, 3]))