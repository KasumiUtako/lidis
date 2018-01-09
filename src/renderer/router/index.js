import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/panel',
      name: 'panel-page',
      component: () => import('@/components/PanelPage/index.vue')
    },
    {
      path: '/',
      name: 'login-page',
      component: () => import('@/components/LoginPage/index.vue')
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
