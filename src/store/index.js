import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user
  },
  getters: {
    account: state => state.user.account,
    secret: state => state.user.secret,
    balances: state => state.user.balances
  }
})

export default store
