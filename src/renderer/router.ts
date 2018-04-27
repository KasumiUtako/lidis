import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

import Database from '@/views/DataBase.vue';
import Config from '@/views/Config.vue';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  { path: '/db', component: Database },
  { path: '/config', component: Config },
  { path: '/', redirect: '/db' }
];

export default new VueRouter({
  routes
});
