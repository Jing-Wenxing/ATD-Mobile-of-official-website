<template>
  <div>
    <div v-if="inislogin==true">
      <profile></profile>
    </div>
    <div v-if="inislogin==false"
         class="page-middle">
      <login></login>
    </div>
  </div>
</template>

<script>
import login from './Login'
import profile from './Profile'

export default {
  components: {
    login,
    profile,
  },
  data () {
    return {
      inislogin: null,
      userinfo: []
    };
  },
  methods: {
    islogin () {
      const axios = require('axios').default
      axios.defaults.withCredentials = true
      axios({
        method: 'get',
        url: '/api/user/profile',
      })
        .then((response) => {
          if (response.data.Status == 0) {

            this.inislogin = false
          }
          else {
            this.inislogin = true
            this.userinfo = response.data.Result
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
  created () {
    this.islogin()
  }
}
</script>

<style>
</style>