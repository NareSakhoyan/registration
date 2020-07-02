import Vue from 'vue'
import Buefy from 'buefy'
import App from './App.vue'

import router from "./router";
import store from "./sotre/store";
import api from "./utils/api"

import 'buefy/dist/buefy.css';

Vue.use(Buefy)

Vue.prototype.$api = api
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
