/**
 * 最长回文字符串
 * 输入 字符串 S，长度 为len
 */

/**
 * 
 * @param {String} str 
 * @return {String} 
 */
function palindrmoe (str) {
  let len = str.length
  // 初始化dp数组
  let dp = [new Array(len)]
  for (let i = 0; i < len; i++) {
    dp[i].push(new Array(len))
  }
  // 默认1
  let maxLength = 1
  let begin = 0
  for (let L = 2; i <= len; i++) {

    for (let i = 0; i <= len - L; i++) {
      let end = i + L - 1
      if (S[i] !== S[end]) {
        dp[i][end] = false
      } else {
        if (L <= 3) {
          dp[i][end] = true
        } else {
          dp[i][end] = dp[i + 1][end - 1]
        }
      }
      // 更新最大情况
      if (L > maxLength && dp[i][end]) {
        maxLength = L
        begin = i
      }
    }
  }
  return str.slice(begin, begin + maxLength)
}