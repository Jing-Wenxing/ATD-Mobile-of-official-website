<template>
  <van-row class="top">
    <van-col class="flex justify-center align-center bar-height"
             :style="'background:'+ color +';'"
             span="5">
      <van-button v-if="noBack"
                  round
                  :color="color"
                  type="info"
                  @click="backPage">
        <van-icon name="arrow-left"
                  :color="colorBack" />
      </van-button>
    </van-col>
    <van-col class="flex justify-center align-center bar-height"
             :style="'background:'+ color +';'"
             span="14">
      <span :style="'color:'+ colorTitle +';'">{{title}}</span>
    </van-col>
    <van-col class="flex justify-center align-center bar-height"
             :style="'background:'+ color +';'"
             span="5">

    </van-col>
  </van-row>
</template>

<script>
export default {
  name: 'atdnavbar',
  props: {
    title: {
      type: String,
      default: '页面标题',
    },
    color: {
      type: String,
      default: '#ffffff',
    },
    noBack: {
      type: Boolean,
      default: true,
    },
    colorBack: {
      type: String,
      default: '#000000',
    },
    colorTitle: {
      type: String,
      default: '#000000',
    },
  },
  data () {
    return {
    };
  },
  methods: {
    backPage () {
      this.$router.go(-1)
    }
  }
}
</script>

<style>
.bar-height {
  height: 54px;
}
</style>