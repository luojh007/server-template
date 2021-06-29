/**
 * 凑零钱
 */

/**
 * 
 * @param {Array} coins 
 * @param {Number} amount 
 * @return {Number}
 */

function collectChange (coins = [], amount) {

  let dp = []
  // 初始化最大值
  for (let i = 0; i < amount; i++) {
    dp[i] = amount + 1
  }
  for (let i = 0; i <= amount; i++) {
    for (let coin of coins) {
      let x = i - coin
      if (x < 0) continue;
      dp[i] = Math.min(dp[x] + 1, dp[i])
    }
  }
  return dp[amount] === amount + 1 ? -1 : dp[amount]
}