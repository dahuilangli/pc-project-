<template>
  <el-container>
    <el-header>
      <headres />
    </el-header>
    <el-main>
      <hello-metamask />
    </el-main>
    <el-footer>Footer</el-footer>
  </el-container>
</template>

<script>
import helloMetamask from '@/components/hello-metamask'
import headres from '@/components/headres'
export default {
  name: 'casino-dapp',
  components: {
    helloMetamask,
    headres
  }
}
</script>

<style scoped>
.el-header {
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  -webkit-box-pack: justify;
  justify-content: space-between;
}
.el-main {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: 100px;
  -webkit-box-align: center;
  align-items: center;
  flex: 1 1 0%;
  overflow: hidden auto;
  z-index: 1;
}
</style>
