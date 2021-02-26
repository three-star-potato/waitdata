import Vue from 'vue'
import App from './App.vue'
import store from './store'
import * as echarts from 'echarts'
import BootstrapVue from 'bootstrap-vue'
import UUID from "vue-uuid";
Vue.use(UUID);
Vue.use(BootstrapVue)
Vue.prototype.$echarts=echarts
Vue.config.productionTip = false

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
