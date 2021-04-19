import {removeToken, setToken, getToken} from '@/utils/auth'
import AESCipher from '@/utils/aes'
const key = 'TEST-KEY=ztcmvr8ko2cibtja4wocr5sqkfcdeceu'
const aes = new AESCipher(key)

const user = {
  state: {
    privateKey: 'TEST-KEY=ztcmvr8ko2cibtja4wocr5sqkfcdeceu',
    isLogin: getToken('ADMIN') !== null ? getToken('ADMIN').isLogin : false,
    account: getToken('ADMIN') !== null ? getToken('ADMIN').account : '',
    secret: getToken('ADMIN') !== null ? getToken('ADMIN').secret : ''
  },
  mutations: {
    SET_USER: (state, userInfo) => {
      state.account = userInfo.account
      state.secret = userInfo.secret
      state.isLogin = userInfo.isLogin
    },
    RESET_USER: (state) => {
      state.account = ''
      state.secret = ''
      state.isLogin = false
    }
  },
  actions: {
    // 登录
    Login ({commit}, userInfo) {
      return new Promise(async resolve => {
        if (userInfo) {
          let secret = await aes.encode_data(userInfo.secret)
          if (secret) {
            let user = {
              isLogin: true,
              account: userInfo.account,
              secret
            }
            commit('SET_USER', user)
            setToken('ADMIN', user)
            resolve()
          }
        }
      })
    },
    // 前端 登出
    FedLogOut ({commit}) {
      return new Promise(resolve => {
        commit('RESET_USER')
        removeToken('ADMIN')
        resolve()
      })
    }
  }
}
export default user
