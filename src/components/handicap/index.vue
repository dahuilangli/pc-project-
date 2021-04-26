<template>
  <div class="container">
    <div class="handicap_title">委托订单</div>
    <div class="entrust_list">
      <div class="entrust_option">
        <i
          class="center"
          :class="active === 'center' ? 'active' : ''"
          @click="setActive('center')"
        ></i>
        <i
          class="top"
          :class="active === 'top' ? 'active' : ''"
          @click="setActive('top')"
        ></i>
        <i
          class="bottom"
          :class="active === 'bottom' ? 'active' : ''"
          @click="setActive('bottom')"
        ></i>
      </div>
      <div class="entrust_body">
        <div class="title_wrap">
          <span class="price">价格(USDT)</span
          ><span class="amount">数量(STO)</span>
        </div>
        <div class="body_warp">
          <div class="order-book-list asks">
            <div
              class="sale"
              v-for="ask of asks"
              :key="ask.price"
              @click="sendMessgeToParent({...ask, by: 'asks'})"
            >
              <span class="price">{{ ask.price | _thousandth }}</span>
              <span class="amount">{{ ask.quality | _kquantile }}</span>
              <div
                class="process-bar"
                :style="{
                  width: `${$h.Mul($h.Div(ask.quality, asksSum), 100)}%`,
                }"
              ></div>
            </div>
          </div>
          <div class="ticker_wrap">
            <span class="ticker_price down">33.098</span>
            <i class="icon el-icon-bottom down"></i>
            <span class="local_price">
              <span class="current-local-price"> $33.49 </span>
            </span>
          </div>
          <div class="order-book-list bids">
            <div
              class="sell"
              style="width: 100%"
              v-for="bid of bids"
              :key="bid.price"
              @click="sendMessgeToParent({...bid, by: 'bids'})"
            >
              <span class="price">{{ bid.price | _thousandth }}</span>
              <span class="amount">{{ bid.quality | _kquantile }}</span>
              <div
                class="process-bar"
                :style="{
                  width: `${$h.Mul($h.Div(bid.quality, bidsSum), 100)}%`,
                }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { STO, USDT } from '@/utils/gateway.js'
import bus from '@/utils/eventBus.js'
export default {
  name: 'handicap',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      active: 'center',
      gear: 15,
      asks: [],
      bids: []
    }
  },
  computed: {
    asksSum () {
      return Math.max.apply(
        Math,
        this.asks.map((item) => {
          return item.quality
        })
      )
    },
    bidsSum () {
      return Math.max.apply(
        Math,
        this.bids.map((item) => {
          return item.quality
        })
      )
    }
  },
  watch: {
    show () {
      this.visible = this.show
    }
  },
  created () {
    this.initHandicap()
  },
  methods: {
    initHandicap () {
      this.$rippleApi.connect().then(() => {
        // 'transaction' can be replaced with the relevant `type` from the table above
        this.$rippleApi.connection.on('transaction', (event) => {
          // Do something useful with `event`
          this.subscribePO()
          // if (event) {
          // console.log('有新交易')
          // console.log(event)
          // if (event.type === 'transaction' && event.engine_result === 'tesSUCCESS') {
          //   if (event.transaction.TransactionType === 'OfferCreate') {
          //     if (typeof event.transaction.TakerGets === 'object' && typeof event.transaction.TakerPays === 'object') {
          //       if (event.transaction.TakerGets.currency === 'UST') {
          //         let price = this.$h.Div(event.transaction.TakerGets.value, event.transaction.TakerPays.value)
          //         console.log(price)
          //         this.bids = this.dataChange([...this.bids, { price, quality: event.transaction.TakerPays.value }])
          //       } else {
          //         let price = this.$h.Div(event.transaction.TakerPays.value, event.transaction.TakerGets.value)
          //         console.log(price)

          //         this.bids = this.dataChange([...this.bids, { price, quality: event.transaction.TakerGets.value }])
          //       }
          //     } else if (typeof event.transaction.TakerGets === 'string') {

          //     }
          //   }
          // }
          // }
        })
        this.subscribePO()
      })
    },
    subscribePO () {
      this.$rippleApi
        .request('subscribe', {
          books: [
            {
              taker_pays: STO,
              taker_gets: USDT,
              both: true,
              snapshot: true
            }
          ]
        })
        .then((response) => {
          if (typeof response === 'object') {
            let asks = []
            let bids = []
            response.asks.map((ask) => {
              // eslint-disable-next-line standard/object-curly-even-spacing
              asks.push({
                price: ask.quality,
                quality: Number(parseFloat(ask.TakerGets['value']).toFixed(2))
              })
            })
            this.asks = this.dataChange(asks, 'asks')
            response.bids.map((bid) => {
              // eslint-disable-next-line standard/object-curly-even-spacing
              bids.push({
                price: this.$h.Div(
                  bid.TakerGets['value'],
                  bid.TakerPays['value']
                ),
                quality: Number(parseFloat(bid.TakerPays['value']).toFixed(2))
              })
            })
            this.bids = this.dataChange(bids, 'bids')
          }
        })
        .catch((error) => {
          // Handle `error`
          console.log(error)
        })
    },
    setActive (name) {
      this.active = name
    },
    dataChange (arr, dit) {
      // 设置一个对象放id 一个数组放处理后的数据
      let a = {}
      let b = []
      //  深拷贝源数据
      let arrs = JSON.parse(JSON.stringify(arr))
      // 循环遍历原始数据
      arrs.forEach((item) => {
        // 判断item.id 是否存在在 a 中 无则直接push进b
        if (!a[item.price]) {
          // 直接push b
          b.push(item)
          // 将 对象塞进 a中
          a[item.price] = item
        } else {
          // a中存在 则对b 进行累加
          b.forEach((ss) => {
            if (ss.price === item.price) {
              ss.quality = this.$h.Add(ss.quality, item.quality)
            }
          })
        }
      })

      b.sort((n1, n2) => {
        // return -1; //返回负值  交换顺序
        // return 0 或者 1   //返回正值   保持顺序不变
        return n2.price - n1.price
        // n2 - n1  从大到小
        // n1 - n2  从小到大
      })
      if (dit === 'asks') {
        return b.slice(b.length - this.gear, b.length)
      } else {
        return b.slice(0, this.gear)
      }
    },

    sendMessgeToParent (event) {
      bus.$emit('handicapMsg', event)
    }
  }
}
</script>

<style lang="css" scope>
.container .handicap_title {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  background: #12132B;
  font-size: 14px;
}
.container,
.entrust_list {
  background: #141631;
}
.entrust_list {
  padding: 5px 0;
}
.entrust_list .entrust_option {
  padding: 0 10px;
  display: flex;
}
.entrust_list .entrust_option i {
  display: flex;
  width: 16px;
  height: 16px;
  background-repeat: no-repeat;
  background-size: 204px 16px;
  background-image: url(/static/A427CA526A32D775.png);
  cursor: pointer;
}
.entrust_list .entrust_option i:not(:first-child) {
  margin-left: 9px;
}
.entrust_list .entrust_option .center {
  background-position: -102px 0;
}
.entrust_list .entrust_option .center.active {
  background-position: -68px 0;
}

.entrust_list .entrust_option .top {
  background-position: -34px 0;
}
.entrust_list .entrust_option .top.active {
  background-position: 0 0;
}

.entrust_list .entrust_option .bottom {
  background-position: -171px 0;
}
.entrust_list .entrust_option .bottom.active {
  background-position: -137px 0;
}
.entrust_list .entrust_body {
  position: relative;
  padding: 5px 10px;
  flex: 1;
  min-width: calc(100% - 32px);
  height: calc(100% - 16px);
  overflow-y: auto;
}
.entrust_list .entrust_body .title_wrap {
  display: flex;
  min-width: 150px;
}
.price {
  text-align: left;
}
.amount {
  text-align: right;
}
.entrust_list .entrust_body .title_wrap span {
  flex: 1;
  min-width: 50px;
  line-height: 16px;
  font-size: 12px;
  color: #7b8293;
}
.entrust_list .entrust_body .body_warp {
  position: relative;
  flex: 1;
  min-width: calc(100% - 32px);
  height: calc(100% - 16px);
  overflow-y: auto;
}
.entrust_list .entrust_body .body_warp .order-book-list {
  flex: 1;
  min-width: 150px;
  min-height: calc(100% - 16px);
}
.entrust_list .entrust_body .body_warp .sale,
.entrust_list .entrust_body .body_warp .sell {
  position: relative;
  min-width: 150px;
  display: flex;
  cursor: pointer;
}
.entrust_list .entrust_body .body_warp .sale span,
.entrust_list .entrust_body .body_warp .sell span {
  flex: 1;
  min-width: 50px;
  line-height: 16px;
  font-size: 12px;
  color: #7b8293;
}
.entrust_list .entrust_body .body_warp .sale .process-bar,
.entrust_list .entrust_body .body_warp .sell .process-bar {
  position: absolute;
  right: 0;
  height: 100%;
}
.entrust_list .entrust_body .body_warp .asks .process-bar {
  background: rgba(227, 94, 94, 0.1);
}
.entrust_list .entrust_body .body_warp .bids .process-bar {
  background: rgba(46, 173, 101, 0.1);
}
.entrust_list .entrust_body .body_warp .sale span {
  color: #e35e5d;
}
.entrust_list .entrust_body .body_warp .sell span {
  color: #2fad65;
}
.entrust_list .entrust_body .body_warp .sale:hover,
.entrust_list .entrust_body .body_warp .sell:hover {
  font-weight: 550;
}
.entrust_list .entrust_body .body_warp .ticker_wrap {
  position: sticky;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  min-width: 150px;
  height: 32px;
  z-index: 1;
}
.entrust_list .entrust_body .body_warp .ticker_wrap .ticker_price {
  line-height: 20px;
  font-size: 14px;
  font-weight: 600;
}
.ticker_wrap .down {
  color: #e35e5e;
}
.entrust_list .entrust_body .body_warp .ticker_wrap .icon {
  margin: 0 6px 0 2px;
  display: inline-block;
  font-size: 12px;
}
.entrust_list .entrust_body .body_warp .ticker_wrap .local_price {
  line-height: 16px;
  font-size: 12px;
  color: #7b8293;
}
@media only screen and (max-width: 1199px) {
}
</style>
