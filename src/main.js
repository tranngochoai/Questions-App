import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'//declare bootstrap
import 'bootstrap/dist/css/bootstrap.css'//declare bootstrap
import 'bootstrap-vue/dist/bootstrap-vue.css'//declare bootstrap

import App from './App.vue'

Vue.use(BootstrapVue)//declare bootstrap
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
