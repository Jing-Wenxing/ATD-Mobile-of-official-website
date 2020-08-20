<template>
  <div class="flex justify-center align-center">
    <div class="padding-top-sm bg-white width-80 border-radius-15">
      <div class="padding-lr-sm">
        <span>欢迎来到ATD, 请登录您的账号</span>
      </div>

      <div class="padding-sm">
        <el-input class="margin-bottom-sm"
                  v-model="username"
                  prefix-icon="el-icon-message"
                  placeholder="用户名"></el-input>
        <el-input class="margin-bottom-sm"
                  v-model="password"
                  :show-password="true"
                  prefix-icon="el-icon-reading"
                  placeholder="密码">
          <el-button slot="append"
                     @click="forget">找回密码</el-button>
        </el-input>
        <el-input class="margin-bottom-sm"
                  v-model="verification"
                  prefix-icon="el-icon-reading"
                  placeholder="验证码"></el-input>
        <van-row class="margin-bottom-sm">
          <van-col span="16"
                   class="flex align-center">
            <img :src="verification_image">
          </van-col>
          <van-col span="8"
                   class="flex align-center">
            <van-button type="default"
                        icon="replay"
                        round
                        click="refimg_get"
                        @click="refimg_get">刷新</van-button>
          </van-col>
        </van-row>
        <div class="flex justify-between">
          <van-button color="#294D7C"
                      @click="register">
            <span class="padding-lr-sm">
              注册
            </span>
          </van-button>
          <van-button color="#294D7C"
                      @click="login">
            <span class="padding-lr-sm">
              登录
            </span>
          </van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      password: '',
      verification: '',
      verification_image: '',
    };
  },
  methods: {
    refimg_get () {
      var num = Math.ceil(Math.random() * 10000);
      this.verification_image = "/api/user/captcha?" + num;
    },
    register () {
      this.$router.push({ path: '/personal/register' })
    },
    forget () {
      this.$router.push({ path: '/personal/forget' })
    },
    login () {
      // 使用全局axios进行后端请求
      const axios = require('axios').default
      axios.defaults.withCredentials = true

      axios({
        method: 'post',
        url: '/api/user/login',
        data: {
          username: this.username,
          password: this.password,
          code: this.verification,
          rememberMe: '0'
        }
      })
        .then((response) => {
          if (response.data["Status"] == "0") {
            this.$notify.error({ title: '登录失败', message: response.data.Result['msg'] })
          }
          else if (response.data["Status"] == "1") {
            this.$notify({ title: '登录成功', message: '欢迎来到ATD', type: 'success' })
            this.$router.push({ path: '/' })
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  },
  created () {
    this.refimg_get()
  }
}
</script>