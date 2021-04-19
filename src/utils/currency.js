/**
 * 币种信息
 * @type {Map<any, any>}
 */
const currencyMap = new Map()
currencyMap.set('XRP', {
  icon: '@/static/currency-icon/morleystone-ste.png',
  display: 'STE'
})
currencyMap.set('STA', {
  icon: '@/static/currency-icon/morleystone-sto.png',
  display: 'STO',
  issuer: 'rUAU22rLt8TbXo5mcZr2JZZMavfS7MtHwG'
})
currencyMap.set('HUS', {
  icon: '@/static/currency-icon/morleystone-husd.png',
  display: 'HUSD',
  issuer: 'r9FctBtb1p3t3hPQDwhpkEAwrkve5bY8FY'
})
currencyMap.set('UST', {
  icon: '@/static/currency-icon/morleystone-usdt.png',
  display: 'USDT',
  issuer: 'r3FnAL25N4dtSiQntx7jRyCtHoYUApQ6C1'
})

export {
  currencyMap
}
