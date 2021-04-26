<template>
  <div class="transactions">
    <div class="title_warp">
      <div class="warp_currency">
        <i class="el-icon-s-unfold"></i>
        STO/USDT
      </div>
      <div class="warp_lastbox">
        <span class="last">53,944.3</span>
        <span class="chg">+1.76%</span>
      </div>
      <div class="warp_topbox">
        <div class="warp_item">
          <span class="label">美元价格</span
          ><span class="value">$54,174.17</span>
        </div>
        <div class="warp_item">
          <span class="label">24小时最低价</span
          ><span class="value">52,777.0</span>
        </div>
        <div class="warp_item">
          <span class="label">24小时最高价</span
          ><span class="value">56,345.7</span>
        </div>
        <div class="warp_item">
          <span class="label">24小时成交量(BTC)</span
          ><span class="value">1.46万 </span>
        </div>
      </div>
    </div>
    <div class="body_opt">
      <div class="left" ref="element">
        <kine />
        <transaction />
      </div>
      <div class="right">
        <handicap/>
      </div>
    </div>
    <div class="body_bottom">
      <commission />
    </div>
  </div>
</template>

<script>
import handicap from '@/components/handicap'
import kine from '@/components/tradingview'
import transaction from '@/components/transaction'
import commission from '@/components/commission'
export default {
  name: 'Home',
  components: {
    handicap,
    kine,
    transaction,
    commission
  },
  data () {
    return {}
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/_style.scss";
.transactions {
  background: $default-bg;
  width: 100%;
  height: 100%;
  .title_warp {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: fit-content;
    padding: 5px 10px;
    background: $default-card-body;
    width: 100%;
    .warp_currency {
      font-size: 16px;
      font-weight: 600;
      i {
      }
    }

    .warp_lastbox {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      margin-left: 35px;
      span.last {
        font-weight: 600;
        font-size: 14px;
      }

      span.chg {
      }
    }

    .warp_topbox {
      display: flex;
      margin-left: 35px;
      .warp_item {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        font-weight: 400;
        font-size: 12px;
        line-height: 16px;
        color: #ffffff;
        span.label {
          opacity: 0.5;
        }

        span.value {
          font-weight: 500;
        }
      }
      .warp_item:not(:first-child) {
        margin-left: 35px;
      }
    }
  }

  .body_opt {
    display: flex;
    margin: 5px;
    .left {
      flex: 1;
      flex-direction: column;
    }

    .right {
      flex: 0.33;
      margin-left: 5px;
      background: $default-card-body;
    }
  }

  .body_bottom {
    margin: 0px 5px 10px 5px;
  }
}

@media only screen and (max-width: 1199px) {
}
</style>

<style>
.el-input-number .el-input__inner {
  padding-left: 62.5px !important;
  padding-right: 50px;
}
.el-input-group__append,
.el-input-group__prepend {
  background-color: transparent;
  color: #c0c4cc;
  padding: 0 3px;
}
.el-input__inner {
  padding: 0 3px;
  color: #ffffff;
}
.el-input__prefix {
  left: 0;
  padding: 0 3.5px;
  border-right: 1px solid #dcdfe6;
}
</style>
