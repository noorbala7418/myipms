import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import BootstrapVue from 'bootstrap-vue'
import CryptoJs from 'crypto-js'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.config.productionTip = false
window.axios = axios
window.md5 = CryptoJs.MD5

new Vue({
  render: h => h(App),
}).$mount('#app')
