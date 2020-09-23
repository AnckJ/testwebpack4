import Vue from 'vue'
import App from './app.vue'
import router from './router'
import store from './store'

import './assets/css/global.styl'
import './assets/css/style.css'

export default new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
