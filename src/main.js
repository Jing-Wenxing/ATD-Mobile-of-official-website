import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

Vue.config.productionTip = false

/***** axios ******/
import axios from 'axios'
Vue.prototype.$http = axios

const baseURL = ""
export default axios.create({
  baseURL: baseURL
  // You can add your headers here
})
/***** ******/

/***** Vant ******/
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);
/***** ******/

/***** ElementUI ******/
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
/***** ******/

/***** Vuesax ******/
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css' //Vuesax styles
Vue.use(Vuesax, {
  // options here
})

/***** ******/

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')