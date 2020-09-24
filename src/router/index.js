import Vue from 'vue'
import Router from 'vue-router'
import Test from '@/views/test.jsx'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/test',
      component: Test
    }
  ]
})
