<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="当前委托" name="current">
      <el-table :data="currentCommission" style="width: 100%">
        <el-table-column
          label="类型"
          align="left"
        >
          <template slot-scope="scope">
            <div>
              {{ scope.row.specification.direction === 'sell' ? '卖出' : '买入' }}
              {{ $util.replaceCurrency(scope.row.specification.quantity.currency) }} / {{ $util.replaceCurrency(scope.row.specification.totalPrice.currency) }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="委托价格" align="center">
          <template slot-scope="scope">
            {{ scope.row.specification.direction === 'sell' ? scope.row.properties.makerExchangeRate : $h.Div(scope.row.specification.totalPrice.value, scope.row.specification.quantity.value) }}
          </template>
        </el-table-column>
        <el-table-column prop="quantity" label="委托数量" align="center">
          <template slot-scope="scope">
            {{ scope.row.specification.quantity.value }}
          </template>
        </el-table-column>
        <el-table-column prop="sum" label="成交总额" align="center">
          <template slot-scope="scope">
            {{ scope.row.specification.totalPrice.value }}
          </template>
        </el-table-column>
        <!-- <el-table-column prop="avg" label="成交均价" align="center">
        </el-table-column>
        <el-table-column prop="t_number" label="成交数量" align="center">
        </el-table-column>-->
        <el-table-column label="操作" align="right">
          <template slot-scope="scope">
            <a href="javascript:void(0);" @click="orderCancell(scope)" style="color: #4F57EA;">撤单</a>
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="历史委托" name="history">历史委托</el-tab-pane>
  </el-tabs>
</template>

<script>
import AESCipher from '@/utils/aes'
export default {
  data () {
    return {
      aes: new AESCipher(this.$store.state.user.privateKey),
      activeName: 'current',
      currentCommission: [],
      tableData: [
        {
          name: '买入 STO/USDT',
          date: '12/10 15:34',
          price: '3.8575',
          quantity: '0.124',
          sum: '0.1283',
          avg: '3.5402',
          t_number: '0.0032'
        }
      ]
    }
  },
  created () {
    this.getOrders()
    // this.getOrderbook()
  },
  methods: {
    handleClick (tab) {
      if (tab.paneName === 'current') {
        this.getOrders()
      } else {}
    },
    async getOrders () {
      // eslint-disable-next-line standard/object-curly-even-spacing
      console.log(this.$store.state.user.account)
      await this.$rippleApi.getOrders('rH9eX7MFdV9wbNRX1BRTvyGh22Av4iQfUT').then(result => {
        this.currentCommission = result.reverse()
        console.log(this.currentCommission)
      }).catch((err) => {
        console.log(err)
      })
    },
    async orderCancell (scope) {
      console.log(scope.row)
      const address = 'rH9eX7MFdV9wbNRX1BRTvyGh22Av4iQfUT'
      console.log(address)
      const orderCancellation = { orderSequence: scope.row.properties.sequence }
      console.log(orderCancellation)
      await this.$rippleApi.prepareOrderCancellation(address, orderCancellation).then(async prepared => {
        let txJSON = prepared.txJSON
        let secret = await this.aes.decode_data(this.$store.state.user.secret)
        const txSigned = await this.$rippleApi.sign(txJSON, secret)
        console.log('撤单开始')
        await this.$rippleApi.submit(txSigned.signedTransaction).then(async s => {
          if (s.resultCode === 'tesSUCCESS') {
            console.log('撤单完成')
            await this.getOrders()
          }
          console.log('撤单失败')
        }).catch(err => {
          console.log(err)
        })
      })
    }
  }
}
</script>
<style lang="scss">
@import "@/styles/_style.scss";
.el-tabs__header {
  font-size: 14px;
  margin: 0;
  color: #ffffff;
  background: $default-card-body;
  padding: 0px 15px;
}
.el-tabs__item {
  color: #ffffff;
  opacity: 0.5;
}
.el-tabs__item.is-active {
  opacity: unset;
  color: unset;
}
.el-tabs__item:hover {
  color: unset;
}
.el-tabs__nav-wrap::after {
  background-color: unset;
}
.el-table {
  box-shadow: 0 15px 40px rgba(0, 0, 0, 1);
  color: #fff;
  font-size: 12px;
  background: $default-card-body;
}
/* .el-table__header-wrapper {
  padding: 0px 15px;
} */
/* .el-table__body-wrapper {
  padding: 0px 15px;
} */
.el-table th {
  color: rgba(255, 255, 255, 0.5);
  background-color: unset;
}
.el-table tr {
  background-color: unset;
}
.el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: $default-card-title;
}
</style>
