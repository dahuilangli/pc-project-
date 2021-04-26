<template>
  <div class="container">
    <h2>我是home 页</h2>
  </div>
</template>

<script>
import { formatCoinBalance } from '../utils/ripple'
export default {
  name: 'Home',
  data () {
    return {}
  },
  // 加载账号余额
  created () {
    this.getAccountAssets()
    // this.getHandicap()
  },
  methods: {
    async getAccountAssets () {
      // 加载资产
      var ripple = this.$rippleApi
      if (!ripple.isConnected()) {
        await ripple.connect().then((res) => {})
      }
      await this.$rippleApi.getBalances('rESrgBXFh78Fa2e2DYjMetv5nqURTYozoy').then(res => {
        formatCoinBalance(res)
        console.log(res)
      })
    },
    // 盘口数据
    async getHandicap () {
      var ripple = this.$rippleApi
      if (!ripple.isConnected()) {
        await ripple.connect().then((res) => {})
      }
      var params = {
        taker_gets: {
          currency: 'UST',
          issuer: 'r3FnAL25N4dtSiQntx7jRyCtHoYUApQ6C1'
        },
        taker_pays: {
          currency: 'XRP'
        }
      }
      await this.$rippleApi.request('book_offers', params).then((res) => {
        console.log(res)
      }).catch((e) => { console.log(e) })
    }
  }
}
</script>

<style scoped>
@media only screen and (max-width: 1199px) {
}
</style>
