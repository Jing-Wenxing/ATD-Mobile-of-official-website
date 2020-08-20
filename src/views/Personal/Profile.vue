<template>
  <div>
    <div class="basemsg">
      <div class="mengban shadow">
        <div class="flex justify-center align-center padding-top-xl">
          <el-avatar :size="80"
                     icon="el-icon-user-solid"
                     :src="avateruri"></el-avatar>
        </div>
        <div class="flex justify-center align-center margin-top-xs">
          <span class="text-20 text-bold color-white">{{userinfo.username}}</span>
          <el-button type="text"
                     icon="el-icon-user"
                     style="color: #f0f0f0; padding: 5px;"
                     @click="logout">退出</el-button>
        </div>
        <div class="flex justify-center align-center padding-top-xs">
          <div style="margin-right: 20px;">
            <i class="el-icon-s-promotion text-15 color-white">233</i>
          </div>
          <div>
            <i class="el-icon-s-opportunity text-15 color-white">122</i>
          </div>
        </div>
        <div class="flex justify-between align-center padding-tb-xs padding-lr">
          <div>
            <!-- <van-tag round
                     color="#ff9999"
                     style="margin: 0 2.5px;"
                     size="medium">办公综合部</van-tag>
            <van-tag round
                     color="#5eb2b9"
                     style="margin: 0 2.5px;"
                     size="medium">信息服务部</van-tag> -->
            <van-tag round
                     color="#6a8ec0"
                     style="margin: 0 2.5px;"
                     size="medium">技术部</van-tag>
            <van-tag round
                     color="#c0c8d3"
                     style="margin: 0 2.5px; font-style:italic;"
                     size="medium"
                     @click="topath('/personal/level')">Lv.1</van-tag>
          </div>
          <div style="margin-right: 2.5px;">
            <van-button type="default"
                        size="mini"
                        style="background: rgba(255,255,255,0.5);"
                        round>
              <span class="color-white"
                    style="padding: 5px 7.5px;">设置</span>
            </van-button>
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-center align-center">
      <div class="width-90 margin-top-sm padding-tb-xs padding-lr-sm bg-white border-radius-15 shadow"
           style="height: 75px; background: linear-gradient(45deg, #294D7C, #303030)">
        <van-row>
          <van-col span="16">
            <div class="text-20 text-bold"><span class="color-white">签到标题</span></div>
            <div class="text-15 margin-top-xs"><span class="color-white">签到说明</span></div>
          </van-col>
          <van-col span="8"
                   class="flex justify-center align-center"
                   style="height: 55px;">
            <van-button type="default"
                        style="background: transparent;"
                        block>
              <span class="color-white">快速签到</span>
            </van-button>
          </van-col>
        </van-row>
      </div>
    </div>

    <div class="flex justify-center align-center margin-tb-sm">
      <div class="width-90 padding-tb-xs bg-white border-radius-15 shadow">
        <van-grid :column-num="3"
                  :border="false">
          <van-grid-item icon="idcard"
                         text="我的信息" />
          <van-grid-item icon="orders-o"
                         text="我的任务" />
          <van-grid-item icon="after-sale"
                         text="我的兑换" />
        </van-grid>
      </div>
    </div>

    <div class="flex justify-center align-center margin-bottom-sm">
      <div class="width-90 padding-tb-xs bg-white border-radius-15 shadow">
        <van-cell title="意见反馈"
                  is-link />
        <van-cell title="常见问题"
                  is-link />
        <van-cell title="版本信息"
                  value="V 2.0.1 "
                  is-link />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userinfo: [],
      avateruri: 'https://pic.gksec.com/2020/07/08/79d1c6f44b144/9809a0604ca7bd0dbfbf1427e46d743e.jpg',
    };
  },
  methods: {
    // 页面跳转
    topath (url) {
      this.$router.push({ path: url })
    },
    // 登录验证
    profile () {
      const axios = require('axios').default
      axios.defaults.withCredentials = true
      axios({
        method: 'get',
        url: '/api/user/profile',
      })
        .then((response) => {
          this.userinfo = response.data.Result
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    logout () {
      const axios = require('axios').default
      axios.defaults.withCredentials = true

      axios({
        method: 'post',
        url: '/api/user/logout',
      })
        .then((response) => {
          this.inislogin = false
          location.reload()
        })
        .catch(function (error) {
          console.log(error)
        });
    },
  },
  created () {
    this.profile()
  }
}
</script>

<style>
.mengban {
  background: rgba(0, 0, 0, 0.1);
}

.basemsg {
  background: url(https://pic.gksec.com/2020/08/18/5ee54f5f31a5f/bg_gaitubao_700x505.jpg)
    no-repeat center top;
}
</style>