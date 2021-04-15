import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: resolve => require(['@/page/home'], resolve)
    },
    {
      path: '/kline',
      name: 'kline',
      component: resolve => require(['@/page/kline'], resolve)
    },
    {
      path: '/transaction',
      name: 'transaction',
      component: resolve => require(['@/page/transaction'], resolve)
    },
    {
      path: '/pool',
      name: 'pool',
      component: resolve => require(['@/page/pool'], resolve)
    }
  ]
})
