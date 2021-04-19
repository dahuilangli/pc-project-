import { RippleAPI } from 'ripple-lib'

export const wsUrl = 'wss://wss.mystone.io'
// 系统数据备份还原服务器地址
const api = new RippleAPI({
  server: wsUrl
})

export default api
