import { currencyMap } from './currency'
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

/**
 * 格式化币种信息
 * @param data
 */
export function formatCoinBalance (data) {
  var responseData = []
  data.forEach(function (obj) {
    if (obj.currency === 'XRP' || (currencyMap.has(obj.currency) && obj.counterparty === currencyMap.get(obj.currency).issuer)) {
      obj['display'] = currencyMap.get(obj.currency).display
      obj['icon'] = currencyMap.get(obj.currency).icon
      responseData.push(obj)
    }
  })
  return responseData
}
