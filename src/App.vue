<template>
  <div id="app">
    <el-container>
      <el-header>
        <headres />
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script>
import headres from '@/components/headres'
export default {
  name: 'App',
  components: {
    headres
  }
}
</script>

<style lang="scss">
@import "@/styles/_style.scss";
body {
  background: $default-bg;
}
#app {
  .container {
    width: 100%;
    background: $default-card-body;
  }
}
</style>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
  width: 100vw;
}

.el-header {
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  -webkit-box-pack: justify;
  justify-content: space-between;
  background: #12132a;
}
.el-main {
  display: flex;
  flex-direction: column;
  width: 100%;
  -webkit-box-align: center;
  align-items: center;
  flex: 1 1 0%;
  overflow: hidden auto;
  z-index: 1;
  padding: unset;
}
.el-textarea__inner,
.el-input__inner,
.el-input-number .el-input__inner {
  background: transparent;
  text-align: left;
}

.el-input-number__decrease,
.el-input-number__increase {
  background: transparent;
  text-align: center;
}
.el-input__suffix {
  right: 38px;
}
</style>
