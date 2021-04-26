export default class {
  // 转换货币单位
  static replaceCurrency (currency) {
    let cu
    switch (currency) {
      case 'STA':
        cu = 'STO'
        break
      case 'UST':
        cu = 'USDT'
        break
      case 'HUS':
        cu = 'HUSD'
        break
      default:
        cu = 'STE'
        break
    }
    return cu
  }

  static getUrlKey (name, url) {
    // eslint-disable-next-line no-sparse-arrays
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(url) || [, ''])[1].replace(/\+/g, '%20')) || null
  }
}
