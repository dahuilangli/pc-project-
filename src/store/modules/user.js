import {removeToken, setToken} from '@/utils/auth'

const user = {
  state: {
    userId: '',
    privateKey: ''
  },
  mutations: {
    SET_USER: (state, userInfo) => {
      state.userId = userInfo.userId
      state.privateKey = userInfo.privateKey
    },
    RESET_USER: (state) => {
      state.userId = ''
      state.privateKey = ''
    }
  },
  actions: {
    // 登录
    Login ({commit, state}) {
      return new Promise(resolve => {
        setToken()
        resolve()
      })
    },
    // 前端 登出
    FedLogOut ({commit}) {
      return new Promise(resolve => {
        commit('RESET_USER')
        removeToken()
        resolve()
      })
    }
  }
}
export default user
