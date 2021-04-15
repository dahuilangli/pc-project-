import { RippleAPI } from 'ripple-lib'

export const wsUrl = 'wss://wss.mystone.io'
// 系统数据备份还原服务器地址
export const rippleAccount = {
  account: 'rESrgBXFh78Fa2e2DYjMetv5nqURTYozoy',
  secret: ''
}
const api = new RippleAPI({
  server: wsUrl
})

export default {
  wsUrl,
  rippleAccount,
  api
}
