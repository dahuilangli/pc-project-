// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'

import global from './utils/global'
import util from './utils/util'

import ElementUI from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
Vue.prototype.$rippleApi = global
Vue.prototype.$util = util

Vue.config.productionTip = false

// 处理精度
Vue.prototype.$h = {
  // 除法函数，用来得到精确的除法结果
  // 说明：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。
  // 调用：$h.Div(arg1,arg2)
  // 返回值：arg1除以arg2的精确结果
  Div: function (arg1, arg2) {
    arg1 = parseFloat(arg1)
    arg2 = parseFloat(arg2)
    let t1 = 0
    let t2 = 0
    let r1
    let r2
    try {
      t1 = arg1.toString().split('.')[1].length
    } catch (e) {
      // console.log(e)
    }
    try {
      t2 = arg2.toString().split('.')[1].length
    } catch (e) {
      // console.log(e)
    }
    // eslint-disable-next-line prefer-const
    r1 = Number(arg1.toString().replace('.', ''))
    // eslint-disable-next-line prefer-const
    r2 = Number(arg2.toString().replace('.', ''))
    return this.Mul(r1 / r2, Math.pow(10, t2 - t1))
  },
  // 加法函数，用来得到精确的加法结果
  // 说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
  // 调用：$h.Add(arg1,arg2)
  // 返回值：arg1加上arg2的精确结果
  Add: function (arg1, arg2) {
    arg2 = parseFloat(arg2)
    let r1, r2
    let m = null
    try {
      r1 = arg1.toString().split('.')[1].length
    } catch (e) {
      r1 = 0
    }
    try {
      r2 = arg2.toString().split('.')[1].length
    } catch (e) {
      r2 = 0
    }
    m = Math.pow(100, Math.max(r1, r2))
    return (this.Mul(arg1, m) + this.Mul(arg2, m)) / m
  },
  // 减法函数，用来得到精确的减法结果
  // 说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的减法结果。
  // 调用：$h.Sub(arg1,arg2)
  // 返回值：arg1减去arg2的精确结果
  Sub: function (arg1, arg2) {
    arg1 = parseFloat(arg1)
    arg2 = parseFloat(arg2)
    var r1, r2, s, n
    try {
      r1 = arg1.toString().split('.')[1].length
    } catch (e) {
      r1 = 0
    }
    try {
      r2 = arg2.toString().split('.')[1].length
    } catch (e) {
      r2 = 0
    }
    s = Math.pow(10, Math.max(r1, r2))
    // 动态控制精度长度
    n = (r1 >= r2) ? r1 : r2
    return ((this.Mul(arg1, s) - this.Mul(arg2, s)) / s).toFixed(n)
  },
  // 乘法函数，用来得到精确的乘法结果
  // 说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
  // 调用：$h.Mul(arg1,arg2)
  // 返回值：arg1乘以arg2的精确结果
  Mul: function (arg1, arg2) {
    arg1 = parseFloat(arg1)
    arg2 = parseFloat(arg2)
    let m = 0

    const s1 = arg1.toString()
    const s2 = arg2.toString()
    try {
      m += s1.split('.')[1].length
    } catch (e) {
      // console.log(e)
    }
    try {
      m += s2.split('.')[1].length
    } catch (e) {
      // console.log(e)
    }
    return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m)
  }
}

// 声明千分位过滤器
Vue.filter('_thousandth', (num, digits = 4) => {
  if (num === '-') {
    return num
  }
  num = parseFloat(Number(num).toFixed(digits))
  // eslint-disable-next-line prefer-const
  let [integer, decimal] = String.prototype.split.call(num, '.')
  integer = integer.replace(/\d(?=(\d{3})+$)/g, '$&,') // 正则先行断言
  return `${integer}${decimal ? '.' + decimal : ''}`
})

Vue.filter('_kquantile', (num, digits = 3) => {
  const si = [
    { value: 1, symbol: '' },
    { value: 1E3, symbol: 'K' },
    { value: 1E6, symbol: 'M' },
    { value: 1E9, symbol: 'G' },
    { value: 1E12, symbol: 'T' },
    { value: 1E15, symbol: 'P' },
    { value: 1E18, symbol: 'E' }
  ]
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/
  let i
  for (i = si.length - 1; i > 0; i--) {
    if (num >= si[i].value) {
      break
    }
  }
  return (num / si[i].value).toFixed(digits).replace(rx, '$1') + si[i].symbol
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
