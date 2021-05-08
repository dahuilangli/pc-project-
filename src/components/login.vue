<template>
    <el-dialog
      top="25vh"
      :visible.sync="visible"
      :show="show"
      custom-class="warp_dialog"
      append-to-body
      lock-scroll
      @close="$emit('update:show', false)"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        status-icon
        ref="ruleForm"
        label-position="left"
        label-width="0px"
        class="demo-ruleForm login-page"
      >
        <h3 class="title">账户登录</h3>
        <el-form-item prop="account">
          <el-input
            type="text"
            v-model="ruleForm.account"
            auto-complete="off"
            placeholder="账户"
          ></el-input>
        </el-form-item>
        <el-form-item prop="secret">
          <el-input
            type="secret"
            v-model="ruleForm.secret"
            auto-complete="off"
            placeholder="私钥"
          ></el-input>
        </el-form-item>
        <el-form-item style="width: 100%">
          <el-button
            type="primary"
            style="width: 100%"
            @click="handleSubmit"
            :loading="logining"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data () {
    var stoneAccount = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('账户不能为空'))
      }
      setTimeout(() => {
        if (
          value.length >= 25 &&
          value.length <= 35 &&
          value.startsWith('r') &&
          value.indexOf('0') === -1 &&
          value.indexOf('O') === -1 &&
          value.indexOf('I') === -1
        ) {
          callback()
        } else {
          callback(new Error('请输入正确的stone账户'))
        }
      }, 1000)
    }
    return {
      visible: this.show,
      logining: false,
      ruleForm: {
        account: 'rpfPj11MbGwSzvCYzmJ86eiaGsGFBA8bCL',
        secret: 'shPQ3KV9fE4b9vLThfC9poqR4yUS7'
      },
      rules: {
        account: [
          {
            required: true,
            validator: stoneAccount,
            trigger: 'blur'
          }
        ],
        secret: [{ required: true, message: '私钥不能为空', trigger: 'blur' }]
      }
    }
  },
  watch: {
    show () {
      this.visible = this.show
    }
  },
  methods: {
    handleSubmit (event) {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.logining = true
          this.$store
            .dispatch('Login', this.ruleForm)
            .then(() => {
              this.logining = false
              this.visible = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!')
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss">
@import "@/styles/_style.scss";
.warp_dialog {
  width: 30% !important;
  background: $default-bg;
  h3 {
    padding: 0px 0px 10px 0px;
  }
  .el-input__suffix {
    right: 0;
  }
}
@media only screen and (max-width: 1199px) {
  .warp_dialog {
    width: 95% !important;
  }
}
</style>
