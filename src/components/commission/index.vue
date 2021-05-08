<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="当前委托" name="current">
      <el-table
        :data="currentIntrust"
        style="width: 100%"
        element-loading-background="rgba(0, 0, 0, 0.8)"
      >
        <el-table-column label="类型" align="left">
          <template slot-scope="scope">
            <div>
              {{
                scope.row.specification.direction === "sell" ? "卖出" : "买入"
              }}
              {{
                $util.replaceCurrency(scope.row.specification.quantity.currency)
              }}
              /
              {{
                $util.replaceCurrency(
                  scope.row.specification.totalPrice.currency
                )
              }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="委托价格" align="center">
          <template slot-scope="scope">
            {{
              scope.row.specification.direction === "sell"
                ? scope.row.properties.makerExchangeRate
                : $h.Div(
                    scope.row.specification.totalPrice.value,
                    scope.row.specification.quantity.value
                  )
            }}
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
            <a
              href="javascript:void(0);"
              @click="orderCancell(scope)"
              style="color: #4f57ea"
              >撤单</a
            >
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="历史成交" name="history">
      <el-table
        :data="historyIntrust"
        style="width: 100%"
        element-loading-background="rgba(0, 0, 0, 0.8)"
      >
        <el-table-column label="类型" align="left">
          <template slot-scope="scope">
            <div>
              {{
                scope.row.specification.direction === "sell" ? "卖出" : "买入"
              }}
              {{$util.replaceCurrency(scope.row.specification.quantity.currency)}}/
              {{ $util.replaceCurrency(scope.row.specification.totalPrice.currency)}}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="成交时间" align="center">
          <template slot-scope="scope">
            {{
              $util.formatUTC(
                scope.row.outcome.timestamp,
                "{y}-{m}-{d} {h}:{i}:{s}"
              )
            }}
          </template>
        </el-table-column>
        <el-table-column label="委托价格" align="center">
          <template slot-scope="scope">
            {{ scope.row.unit.uPrice }}
          </template>
        </el-table-column>
        <el-table-column label="委托数量" align="center">
          <template slot-scope="scope">
            {{ scope.row.unit.quantity }}
          </template>
        </el-table-column>
        <el-table-column label="成交总额" align="center">
          <template slot-scope="scope">
            {{ scope.row.unit.tPrice }}
          </template>
        </el-table-column>
        <!-- <el-table-column prop="avg" label="成交均价" align="center">
        </el-table-column>
        <el-table-column prop="t_number" label="成交数量" align="center">
        </el-table-column>-->
        <!-- <el-table-column label="操作" align="right">
          <template slot-scope="scope">
            <a href="javascript:void(0);" @click="orderCancell(scope)" style="color: #4F57EA;">撤单</a>
          </template>
        </el-table-column> -->
      </el-table>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import AESCipher from '@/utils/aes'
export default {
  data () {
    return {
      aes: new AESCipher(this.$store.state.user.privateKey),
      activeName: 'current',
      currentIntrust: [],
      historyIntrust: []
    }
  },
  mounted () {},
  created () {
    this.getTransactions()
    setInterval(() => {
      this.getOrders()
    }, 2000)
  },
  computed: {
    users () {
      return this.$store.state.user
    }
  },
  methods: {
    handleClick (tab) {
      if (tab.paneName === 'current') {
        this.getOrders()
      } else {
        this.getTransactions()
      }
    },
    async getOrders () {
      // eslint-disable-next-line standard/object-curly-even-spacing
      const address = this.users.account
      await this.$rippleApi
        .getOrders(address)
        .then((result) => {
          this.currentIntrust = result.reverse()
        })
        .catch((err) => {
          console.log(err)
        })
    },
    async orderCancell (scope) {
      const address = this.users.account
      const orderCancellation = {
        orderSequence: scope.row.properties.sequence
      }
      await this.$rippleApi
        .prepareOrderCancellation(address, orderCancellation)
        .then(async (prepared) => {
          let txJSON = prepared.txJSON
          let secret = await this.aes.decode_data(this.users.secret)
          const txSigned = await this.$rippleApi.sign(txJSON, secret)
          console.log('撤单开始')
          await this.$rippleApi
            .submit(txSigned.signedTransaction)
            .then(async (s) => {
              if ((await s.resultCode) === 'tesSUCCESS') {
                this.$message({
                  message: '撤单成功',
                  type: 'success'
                })
              } else {
                this.$message.error('撤单失败')
              }
            })
            .catch((err) => {
              console.log(err)
            })
        })
    },
    async getTransactions () {
      const address = this.users.account
      const options = {
        excludeFailures: true,
        types: ['order']
      }
      await this.$rippleApi.getTransactions(address, options).then((result) => {
        console.log(result)
        if (result.length > 0) {
          let order = []
          result.map((x) => {
            if (x.outcome.orderbookChanges[this.users.account]) {
              x.outcome.orderbookChanges[this.users.account].map((t) => {
                if (t.status !== 'created') {
                  let unit = {}
                  if (this.$util.replaceCurrency(t.totalPrice.currency) === 'USDT' || this.$util.replaceCurrency(t.totalPrice.currency) === 'HUSD') {
                    unit.uPrice = this.$h.Div(t.totalPrice.value, t.quantity.value).toString()
                    unit.quantity = t.totalPrice.value.toString()
                    unit.tPrice = t.quantity.value.toString()
                  } else {
                    unit.uPrice = this.$h.Div(t.quantity.value, t.totalPrice.value).toString()
                    unit.quantity = t.quantity.value.toString()
                    unit.tPrice = t.totalPrice.value.toString()
                  }
                  x.unit = unit
                  order.push(x)
                }
              })
            }
          })
          this.historyIntrust = order
        }
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
.el-table td {
  border-bottom: unset;
}
.el-table tr {
  background-color: unset;
}
.el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: $default-card-title;
}
</style>
