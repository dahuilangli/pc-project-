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

  /**
  * 转换UTC时间
  *
  **/
  static formatDateT (dataTime) {
    dataTime = (dataTime + 946684800) * 1000
    const newDate = new Date(dataTime + 8 * 3600 * 1000)
    // if (newDate % 2 === 0) {
    //   return newDate.toISOString()
    // }
    return newDate.toISOString().slice(0, 19).replace('T', ' ')
  }
  /**
   * 格式化UTC时间
   **/
  static formatUTC (UTC, pattern) {
    const date = new Date(UTC)
    const format = pattern || '{y}-{m}-{d} {h}:{i}:{s}'
    const formatObj = {
      y: date.getFullYear(),
      m: date.getMonth() + 1,
      d: date.getDate(),
      h: date.getHours(),
      i: date.getMinutes(),
      s: date.getSeconds(),
      a: date.getDay()
    }
    const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
      let value = formatObj[key]
      // Note: getDay() returns 0 on Sunday
      if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
      if (result.length > 0 && value < 10) {
        value = '0' + value
      }
      return value || 0
    })
    return timeStr
  }
  static checkTime (i) {
    if (i < 10) {
      i = '0' + i
    }
    return i
  }
}
