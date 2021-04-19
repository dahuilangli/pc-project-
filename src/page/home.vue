<template>
  <div class="home">
    <h2>我是home 页</h2>
  </div>
</template>

<script>
// import { formatXrpBalanceToShow, formatBalanceToShow } from '../utils/ripple'
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
      this.$rippleAccount.account = 'rESrgBXFh78Fa2e2DYjMetv5nqURTYozoy'
      var account = this.$rippleAccount.account
      var ripple = this.$rippleApi
      if (!ripple.isConnected()) {
        await ripple.connect().then((res) => {})
      }
      await this.$rippleApi.getBalances(account).then(res => {
        console.log(res)
        // this.$rippleApi.request('account_lines', {
        //   'account': account
        // }).then((res) => {
        //   var lines = res.lines
        //   lines.forEach(function (value) {
        //     console.log(value.account + ' => ' + formatBalanceToShow(value.balance))
        //   })
        // })
      })
      // await this.$rippleApi.request('account_info', {
      //   'account': account
      // }).then((res) => {
      //   var xrpBalance = formatXrpBalanceToShow(res.account_data.Balance)
      //   console.log('xrp => ' + xrpBalance)
      //   this.$rippleApi.request('account_lines', {
      //     'account': account
      //   }).then((res) => {
      //     var lines = res.lines
      //     lines.forEach(function (value) {
      //       console.log(value.account + ' => ' + formatBalanceToShow(value.balance))
      //     })
      //   })
      // }).catch((e) => {
      //   alert(e.message)
      // })
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
