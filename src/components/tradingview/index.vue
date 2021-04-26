<template>
  <div class="container" id="tv_chart_container"></div>
</template>

<script>
import TVjsApi from './api/index'
let jsApi = null // TODO: 图表配置项
export default {
  mounted () {
    jsApi = new TVjsApi('GXC-USDT')
    jsApi.init() // 图表初始化
  },
  methods: {
    // eslint-disable-next-line no-unused-vars
    changetranspair (val, old) {
      console.log('切换交易对....')
      console.log(val)
      console.log(old)
      // if (jsApi) {
      //     // this._jsApi.widgets.chart().setSymbol(val);
      //     jsApi.switchtranspair(val, old).then((res) => {
      //         jsApi.widgets.chart().setSymbol(val);
      //     });
      // }
    }
  },
  destroyed () {
    jsApi.destoryinstance().then((bool) => {
      if (bool) {
        jsApi = null
      }
    })
  }
}
</script>

<style lang="scss">
#tv_chart_container {
  height: 468px;
}
</style>
