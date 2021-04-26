
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
        <el-input style="margin-top: 10px" v-model="buy.qutity" size="small">
          <template slot="prepend">买入数量</template>
          <template slot="append">STO</template>
        </el-input>
      </div>
      <div class="warp_btn">
        <div class="btn_item" @click="setPrice(0.25, 'buy')">25%</div>
        <div class="btn_item" @click="setPrice(0.5, 'buy')">50%</div>
        <div class="btn_item" @click="setPrice(0.75, 'buy')">75%</div>
        <div class="btn_item" @click="setPrice(1, 'buy')">100%</div>
      </div>
      <div class="gas">
        <p>可用: 1000USDT</p>
        <p>交易额: 6523.73</p>
      </div>
      <div class="buy_btn" onselectstart="javascript:return false;">买入</div>
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
        <el-input style="margin-top: 10px" v-model="sell.qutity" size="small">
          <template slot="prepend">卖出数量</template>
          <template slot="append">STO</template>
        </el-input>
      </div>
      <div class="warp_btn">
        <div class="btn_item" @click="setPrice(0.25, 'sell')">25%</div>
        <div class="btn_item" @click="setPrice(0.5, 'sell')">50%</div>
        <div class="btn_item" @click="setPrice(0.75, 'sell')">75%</div>
        <div class="btn_item" @click="setPrice(1, 'sell')">100%</div>
      </div>
      <div class="gas">
        <p>可用: 1000USDT</p>
        <p>交易额: 6523.73</p>
      </div>
      <div class="sell_btn" onselectstart="javascript:return false;">卖出</div>
    </div>
  </div>
</template>

<script>
import bus from '@/utils/eventBus.js'
export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
    // 这里存放数据
    return {
      buy: {
        price: null,
        qutity: null
      },
      sell: {
        price: null,
        qutity: null
      },
      sum: 100000
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    setPrice (value, item) {
      if (item === 'buy') {
        this.buy.qutity = this.$h.Mul(this.sum, value)
      } else {
        this.sell.qutity = this.$h.Mul(this.sum, value)
      }
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
    textspan.append('USDT')

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
      document.getElementById('sellNumber').lastElementChild.append(span)
      document.getElementById('sellNumber').lastElementChild.prepend(sell)
    })

    bus.$on('handicapMsg', data => {
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
