<template>
  <div class="transaction">
    <div class="buy tr">
      <div class="warp_input">
        <el-input-number
          size="small"
          style="width: 100%"
          v-model="buy.price"
          controls-position="right"
          :min="0"
          :max="1000000"
          :precision="4"
          :step="0.0001"
          id="buyNumber"
        />
        <el-input
          style="margin-top: 10px"
          v-model="buy.qutity"
          oninput="value=value.replace(/[^0-9.]/g,'')"
          size="small"
        >
          <template slot="prepend">买入数量</template>
          <template slot="append"> {{ coins[0] }}</template>
        </el-input>
      </div>
      <div class="warp_btn">
        <div class="btn_item" @click="setPrice(0.25, 'buy')">25%</div>
        <div class="btn_item" @click="setPrice(0.5, 'buy')">50%</div>
        <div class="btn_item" @click="setPrice(0.75, 'buy')">75%</div>
        <div class="btn_item" @click="setPrice(1, 'buy')">100%</div>
      </div>
      <div class="gas">
        <p>可用: {{ usdtQuantity | _thousandth }} {{ coins[1] }}</p>
        <p>
          交易额:
          {{ buy.qutity ? $h.Mul(buy.price, buy.qutity) : 0 | _thousandth }}
          {{ coins[1] }}
        </p>
      </div>
      <div
        class="buy_btn"
        onselectstart="javascript:return false;"
        @click="prepareOrder('buy')"
      >
        买入
      </div>
    </div>
    <div class="sell tr">
      <div class="warp_input">
        <el-input-number
          size="small"
          style="width: 100%"
          v-model="sell.price"
          controls-position="right"
          :min="0"
          :max="1000000"
          :precision="4"
          :step="0.0001"
          id="sellNumber"
        />
        <el-input
          style="margin-top: 10px"
          v-model="sell.qutity"
          oninput="value=value.replace(/[^0-9.]/g,'')"
          size="small"
        >
          <template slot="prepend">卖出数量</template>
          <template slot="append">{{ coins[0] }}</template>
        </el-input>
      </div>
      <div class="warp_btn">
        <div class="btn_item" @click="setPrice(0.25, 'sell')">25%</div>
        <div class="btn_item" @click="setPrice(0.5, 'sell')">50%</div>
        <div class="btn_item" @click="setPrice(0.75, 'sell')">75%</div>
        <div class="btn_item" @click="setPrice(1, 'sell')">100%</div>
      </div>
      <div class="gas">
        <p>可用: {{ stoQuantity | _thousandth }} {{ coins[0] }}</p>
        <p>
          交易额:
          {{ sell.qutity ? $h.Mul(sell.price, sell.qutity) : 0 | _thousandth }}
          {{ coins[1] }}
        </p>
      </div>
      <div
        class="sell_btn"
        onselectstart="javascript:return false;"
        @click="prepareOrder('sell')"
      >
        卖出
      </div>
    </div>
  </div>
</template>

<script>
import bus from '@/utils/eventBus.js'
import AESCipher from '@/utils/aes'
export default {
  // import引入的组件需要注入到对象中才能使用
  props: {
    coin: {
      type: String,
      default: 'STO/USDT'
    }
  },
  components: {},
  data () {
    // 这里存放数据
    return {
      aes: new AESCipher(this.$store.state.user.privateKey),
      buy: {
        price: null,
        qutity: null
      },
      sell: {
        price: null,
        qutity: null
      }
    }
  },
  // 监听属性 类似于data概念
  computed: {
    usdtQuantity () {
      let balance = this.$store.getters.balances.find(
        (x) => x.display === 'USDT'
      )
      if (balance) {
        return balance.value
      }
      return 0
    },
    stoQuantity () {
      let balance = this.$store.getters.balances.find(
        (x) => x.display === 'STO'
      )
      if (balance) {
        return balance.value
      }
      return 0
    },
    coins () {
      console.log(this.coin)
      return this.coin.split('/')
    }
  },
  // 监控data中的数据变化
  watch: {
    coin () {
      // this.subscribePO()
      this.$forceUpdate()
    }
  },
  // 方法集合
  methods: {
    setPrice (value, item) {
      if (item === 'buy') {
        if (this.buy.price > 0) {
          this.buy.qutity = this.$h
            .Mul(this.$h.Div(this.usdtQuantity, this.buy.price), value)
            .toFixed(2)
        } else {
          this.buy.qutity = 0
        }
      } else {
        if (this.sell.price > 0) {
          this.sell.qutity = this.$h
            .Mul(this.$h.Div(this.usdtQuantity, this.sell.price), value)
            .toFixed(2)
        } else {
          this.sell.qutity = 0
        }
      }
    },
    async prepareOrder (scope) {
      console.log(scope)
      const address = this.$store.getters.account
      console.log(address)
      let order = {}
      if (scope === 'buy') {
        order = {
          direction: 'buy',
          quantity: {
            currency: 'STA',
            counterparty: 'rUAU22rLt8TbXo5mcZr2JZZMavfS7MtHwG',
            value: Number(this.buy.qutity).toString()
          },
          totalPrice: {
            currency: 'UST',
            counterparty: 'r3FnAL25N4dtSiQntx7jRyCtHoYUApQ6C1',
            value: Number(
              this.buy.qutity ? this.$h.Mul(this.buy.price, this.buy.qutity) : 0
            ).toString()
          }
          // passive: false,
          // fillOrKill: true
        }
      } else {
        order = {
          direction: 'sell',
          quantity: {
            currency: 'STA',
            counterparty: 'rUAU22rLt8TbXo5mcZr2JZZMavfS7MtHwG',
            value: Number(this.sell.qutity).toString()
          },
          totalPrice: {
            currency: 'UST',
            counterparty: 'r3FnAL25N4dtSiQntx7jRyCtHoYUApQ6C1',
            value: Number(
              this.sell.qutity
                ? this.$h.Mul(this.sell.price, this.sell.qutity)
                : 0
            ).toString()
          }
          // passive: false,
          // fillOrKill: true
        }
      }
      console.log(order)
      await this.$rippleApi
        .prepareOrder(address, order)
        .then(async (prepared) => {
          let txJSON = prepared.txJSON
          let secret = await this.aes.decode_data(this.$store.getters.secret)
          const txSigned = await this.$rippleApi.sign(txJSON, secret)
          await this.$rippleApi
            .submit(txSigned.signedTransaction)
            .then(async (s) => {
              if ((await s.resultCode) === 'tesSUCCESS') {
                this.$message({ message: '委托成功', type: 'success' })
              } else {
                this.$message({ message: '委托成功', type: 'success' })
              }
            })
            .catch((err) => {
              console.log(err)
            })
        })
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    const prefix = document.createElement('span')
    const innerprefix = document.createElement('span')
    const textprefix = document.createElement('span')

    prefix.setAttribute('class', 'el-input__prefix')
    prefix.setAttribute(
      'style',
      'left:0; padding: 0 3.5px; border-right: 1px solid #DCDFE6;'
    )
    innerprefix.setAttribute('class', 'el-input__prefix-inner')

    prefix.append(innerprefix)
    innerprefix.append(textprefix)
    textprefix.append('买入价格')

    const span = document.createElement('span')
    const innerspan = document.createElement('span')
    const textspan = document.createElement('span')

    span.setAttribute('class', 'el-input__suffix')
    span.setAttribute('style', 'right:38px !important')
    innerspan.setAttribute('class', 'el-input__suffix-inner')

    span.append(innerspan)
    innerspan.append(textspan)
    textspan.append(this.coins[1])

    const span1 = document.createElement('span')
    const innerspan1 = document.createElement('span')
    const textspan1 = document.createElement('span')

    span1.setAttribute('class', 'el-input__suffix')
    span1.setAttribute('style', 'right:38px !important')
    innerspan1.setAttribute('class', 'el-input__suffix-inner')

    span1.append(innerspan1)
    innerspan1.append(textspan1)
    textspan1.append(this.coins[1])

    const sell = document.createElement('span')
    const innerpresell = document.createElement('span')
    const textpresell = document.createElement('span')

    sell.setAttribute('class', 'el-input__prefix')
    sell.setAttribute(
      'style',
      'left:0; padding: 0 3.5px; border-right: 1px solid #DCDFE6;'
    )
    innerpresell.setAttribute('class', 'el-input__prefix-inner')

    sell.append(innerpresell)
    innerpresell.append(textpresell)
    textpresell.append('卖出价格')

    this.$nextTick(() => {
      document.getElementById('buyNumber').lastElementChild.append(prefix)
      document.getElementById('buyNumber').lastElementChild.prepend(span)
      document.getElementById('sellNumber').lastElementChild.append(span1)
      document.getElementById('sellNumber').lastElementChild.prepend(sell)
    })

    bus.$on('handicapMsg', (data) => {
      if (data) {
        this.buy.price = data.price
        this.sell.price = data.price
      }
    })
  },
  beforeCreate () {}, // 生命周期 - 创建之前
  beforeMount () {}, // 生命周期 - 挂载之前
  beforeUpdate () {}, // 生命周期 - 更新之前
  updated () {}, // 生命周期 - 更新之后
  beforeDestroy () {}, // 生命周期 - 销毁之前
  destroyed () {}, // 生命周期 - 销毁完成
  activated () {} // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='scss' scoped>
@import "@/styles/_style.scss";
.transaction {
  display: flex;
  background: $default-bg;
  margin: 5px 0px 0px 0px;
  .buy {
    flex: 1;
    background: $default-card-body;
    padding: 15px;
    .warp_input {
      display: flex;
      flex-direction: column;
    }
    .warp_btn {
      display: flex;
      margin-top: 10px;
      .btn_item {
        font-size: 12px;
        width: 25%;
        background: $btn-percentage;
        cursor: pointer;
        padding: 5px 0;
        border-radius: 4px;
        user-select: none;
      }
      .btn_item:not(:first-child) {
        margin-left: 5px;
      }
    }
    .gas {
      margin-top: 10px;
      font-size: 12px;
      font-weight: 400;
      text-align: left;
    }
    .buy_btn {
      margin-top: 10px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      padding: 8px 93px;
      background: $buy-btn;
      cursor: pointer;
      transition: 0.1s;
    }
    .buy_btn:active {
      position: relative;
      box-shadow: inset 0 3px 5px 0 rgba(0, 0, 0, 0.2);
      outline: 0;
    }
  }

  .sell {
    flex: 1;
    background: $default-card-body;
    padding: 15px;
    .warp_input {
      display: flex;
      flex-direction: column;
    }
    .warp_btn {
      display: flex;
      margin-top: 10px;
      .btn_item {
        font-size: 12px;
        width: 25%;
        background: $btn-percentage;
        cursor: pointer;
        padding: 5px 0;
        border-radius: 4px;
      }
      .btn_item:not(:first-child) {
        margin-left: 5px;
      }
    }
    .gas {
      margin-top: 10px;
      font-size: 12px;
      font-weight: 400;
      text-align: left;
    }
    .sell_btn {
      margin-top: 10px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      padding: 8px 93px;
      background: $sell-btn;
      cursor: pointer;
    }
    .sell_btn:active {
      position: relative;
      box-shadow: inset 0 3px 5px 0 rgba(0, 0, 0, 0.2);
      outline: 0;
    }
  }
  .tr:not(:first-child) {
    margin-left: 5px;
  }
}
</style>
