import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/panel',
      name: 'panel-page',
      component: () => import('Views/PanelView')
    },
    {
      path: '/',
      name: 'login-page',
      component: () => import('Views/LoginView')
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
