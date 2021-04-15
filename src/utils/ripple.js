
/**
 * 格式化xrp显示余额
 * @param xrpBalance
 * @returns {string}
 */
export function formatXrpBalanceToShow (xrpBalance) {
  return formatBalanceToShow(Number(xrpBalance) / Math.pow(10, 6))
}

/**
 * 保留小数
 * @param balance
 * @returns {string}
 */
export function formatBalanceToShow (balance) {
  return Number(balance).toFixed(6)
}
