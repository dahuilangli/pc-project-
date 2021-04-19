<template>
  <div class="headers">
    <div class="left">
      <a href="." class="logo"
        ><div class="sc-eMigcr gttaSL">
          <img width="24px" alt="logo" /></div
      ></a>
      <div class="menulist">
        <router-link
          v-for="(item, index) in navigations"
          :key="item.value"
          :to="{ path: item.path, query: { item: index } }"
          :class="{ ACTIVE: ind == index }"
          @click.native="changeBgc(index)"
          class="ekMhAQ"
        >
          {{ item.label }}
        </router-link>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="http://www.baidu.com"
          class="jhGKTi"
        >
          Charts <span style="font-size: 11px">↗</span>
        </a>
      </div>
    </div>
    <div class="right" style="pointer-events: auto">
      <button class="wallet" @click="gotologin">
        <p v-if="!users.isLogin">登录</p>
        <el-dropdown
         v-else
         >
          <p class="el-dropdown-link">{{ users.account }}</p>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>狮子头</el-dropdown-item>
            <el-dropdown-item>螺蛳粉</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </button>
    </div>
    <login :show.sync="show" />
  </div>
</template>

<script>
import { getUrlKey } from '../utils/util'
import login from './login'
export default {
  name: 'headers',
  components: {
    login
  },
  data () {
    return {
      show: false,
      ind: 0,
      navigations: [
        {
          label: '首页',
          path: '/home'
        },
        {
          label: '交易',
          path: '/transaction'
        },
        {
          label: 'K线',
          path: '/kline'
        },
        {
          label: '矿池',
          path: '/pool'
        }
      ]
    }
  },
  computed: {
    users () {
      return this.$store.state.user
    }
  },
  mounted () {
    if (this.$route.query.item) {
      this.ind = this.$route.query.item
    } else if (getUrlKey('item', location.href) <= this.navigations.length) {
      this.ind = getUrlKey('item', location.href)
    } else {
      this.$router.push({
        path: '/home',
        query: {
          item: 0
        }
      })
      this.ind = 0
    }
  },
  methods: {
    gotologin () {
      if (!this.users.isLogin) {
        this.show = true
      } else {
      }
    },
    changeBgc (index) {
      this.ind = index
    }
  }
}
</script>
<style scoped>
.headers {
  display: grid;
  grid-template-columns: 1fr 120px;
  -webkit-box-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  align-items: center;
  flex-direction: row;
  width: 100%;
  top: 0px;
  position: relative;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 0rem;
  z-index: 2;
}
.headers .left {
  box-sizing: border-box;
  margin: 0px;
  min-width: 0px;
  display: flex;
  padding: 0px;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: start;
  justify-content: flex-start;
  width: fit-content;
}
.headers .left .logo {
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  pointer-events: auto;
  justify-self: flex-start;
  margin-right: 12px;
}
.headers .left .menulist {
  box-sizing: border-box;
  margin: 0px;
  min-width: 0px;
  width: 100%;
  display: flex;
  padding: 0px;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
}
.ekMhAQ {
  display: flex;
  flex-flow: row nowrap;
  border-radius: 3rem;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: rgb(86, 90, 105);
  font-size: 1rem;
  width: fit-content;
  margin: 0px 12px;
  font-weight: 500;
}
.ekMhAQ.ACTIVE {
  border-radius: 12px;
  font-weight: 600;
  color: rgb(0, 0, 0);
}
.jhGKTi {
  display: flex;
  flex-flow: row nowrap;
  border-radius: 3rem;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: rgb(86, 90, 105);
  font-size: 1rem;
  width: fit-content;
  margin: 0px 12px;
  font-weight: 500;
}
.jhGKTi:hover,
.jhGKTi:focus {
  color: rgb(0, 0, 0);
  outline: none;
  text-decoration: underline;
}
.headers .right {
  display: flex;
  flex-direction: row;
  -webkit-box-align: center;
  align-items: center;
  background-color: rgb(255, 255, 255);
  border-radius: 12px;
  white-space: nowrap;
  width: 100%;
  cursor: pointer;
}
.headers .right .wallet {
  text-align: center;
  outline: none;
  text-decoration: none;
  -webkit-box-pack: center;
  justify-content: center;
  position: relative;
  z-index: 1;
  font-size: 16px;
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  -webkit-box-align: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 12px;
  cursor: pointer;
  user-select: none;
  font-weight: 500;
  background-color: rgb(253, 243, 234);
  border: 1px solid rgb(253, 234, 241);
  color: rgb(255, 0, 122);
}
.headers .right .wallet:hover {
  border: 1px solid rgb(241, 201, 218);
  color: rgb(230, 0, 110);
}

p, .el-dropdown  {
  flex: 1 1 auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0px 0.5rem 0px 0.25rem;
  font-size: 1rem;
  width: fit-content;
  font-weight: 500;
  color: rgb(255, 0, 122);
}
.el-dropdown-link {
  width: unset;
}
.el-dropdown-menu {
  width: 200px;
}
@media only screen and (max-width: 1199px) {
}
</style>
