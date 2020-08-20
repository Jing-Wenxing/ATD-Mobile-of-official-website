<template>
  <div class="flex justify-center align-center">
    <div class="padding-top-sm bg-white width-80 border-radius-15">
      <div class="padding-lr-sm">
        <span>忘记密码了？重置一下吧</span>
      </div>

      <div class="padding-tb-sm">
        <el-steps :active="active"
                  align-center
                  finish-status="success">
          <el-step title="确认账号"></el-step>
          <el-step title="重置密码"></el-step>
          <el-step title="重置成功"></el-step>
        </el-steps>
      </div>

      <div class="padding-sm"
           v-if="active==0">
        <el-input class="margin-bottom-sm"
                  v-model="mail"
                  prefix-icon="el-icon-message"
                  placeholder="邮箱"></el-input>
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
                      @click="login">
            <span class="padding-lr-xs">
              返回登录
            </span>
          </van-button>
          <van-button color="#294D7C"
                      @click="forgetemail">
            <span class="padding-lr-xs">验证邮箱</span>
          </van-button>
        </div>

      </div>

      <div class="padding-sm"
           v-if="active==1">
        <el-input class="margin-bottom-sm"
                  v-model="password"
                  :show-password="true"
                  prefix-icon="el-icon-lock"
                  placeholder="密码"></el-input>
        <el-input class="margin-bottom-sm"
                  v-model="confirmpassword"
                  :show-password="true"
                  prefix-icon="el-icon-lock"
                  placeholder="确认密码"></el-input>
        <el-input class="margin-bottom-sm"
                  v-model="mailverification"
                  prefix-icon="el-icon-reading"
                  placeholder="邮箱验证码"></el-input>
        <van-button color="#294D7C"
                    block
                    @click="forgetpassword">注册</van-button>
      </div>

      <div class="padding-sm"
           v-if="active==2">
        <div class="margin-bottom-sm flex justify-center">
          <img style="height: 175px;"
               src="https://pic.gksec.com/2020/05/05/9563af8e7b3da/u_3645534457,2437765577_fm_26_gp_0.png">
        </div>
        <van-button color="#294D7C"
                    block
                    @click="login">返回登录</van-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: 0,
      mail: '',
      password: '',
      confirmpassword: '',
      mailverification: '',
      verification: '',
      verification_image: '',
    };
  },
  methods: {
    next () {
      this.active++
    },
    refimg_get () {
      var num = Math.ceil(Math.random() * 10000);
      this.verification_image = "/api/user/captcha?" + num;
    },
    login () {
      this.$router.push({ path: '/personal' })
    },
    forgetemail () {
      const axios = require('axios').default
      axios.defaults.withCredentials = true

      axios({
        method: 'post',
        url: '/api/user/forgetEmail',
        data: {
          email: this.mail,
          code: this.verification,
        }
      })
        .then((response) => {
          if (response.data["Status"] == "0") {
            this.$notify.error({ title: '操作失败', message: response.data.Result['msg'] })
          }
          else if (response.data["Status"] == "1") {
            this.$notify({ title: '账号确认成功', message: '请在你的邮箱查看你的验证码' })
            setTimeout(() => {
              this.$notify({ title: '提示', message: '如未在收件箱中找到邮件，请在垃圾箱中寻找' })
            }, 2000);
            this.next()
          }
        })
        .catch(function (error) {
          console.log(error)
        });
    },
    forgetpassword () {
      if (this.password != this.confirmpassword)
        this.$notify.error({ title: '密码错误', message: '两次密码不一致' })
      else {
        const axios = require('axios').default
        axios.defaults.withCredentials = true
        axios({
          method: 'post',
          url: '/api/user/forgetPass',
          data: {
            newpass: this.confirmpassword,
            emailCode: this.mailverification,
          }
        })
          .then((response) => {
            if (response.data["Status"] == "0") {
              this.$notify.error({ title: '操作失败', message: response.data.Result['msg'] })
            }
            else if (response.data["Status"] == "1") {
              this.$notify({ title: '重置成功', message: response.data.Result['msg'] })
              this.next()
            }
          })
          .catch(function (error) {
            console.log(error)
          });
      }


    }
  },
  created () {
    this.refimg_get()
  }
}
</script>