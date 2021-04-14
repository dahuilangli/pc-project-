<template>
  <div class="headers">
    <div class="left"></div>
    <div class="right" style="pointer-events: auto">
      <button class="wallet" @click="login">
        <p>{{ users.isconnect ? users.account : "Connect to a wallet" }}</p>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'headers',
  data () {
    return {
      account: null
    }
  },
  computed: {
    users () {
      return this.$store.state.user
    }
  },
  methods: {
    login () {
      this.$store.dispatch('login')
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
  padding: 1rem;
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

p {
  flex: 1 1 auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0px 0.5rem 0px 0.25rem;
  font-size: 1rem;
  width: fit-content;
  font-weight: 500;
}
@media only screen and (max-width: 1199px) {
}
</style>
