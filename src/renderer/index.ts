import Vue from 'vue';
import VueMaterial from 'vue-material';
import VeeValidate from 'vee-validate';

import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/black-green-light.css';

import App from '@/App.vue';
import store from '@/store';
import router from '@/router';

Vue.use(VueMaterial);
Vue.use(VeeValidate);

new Vue({
  el: '#app',
  store,
  router,
  components: {
    App
  },
  template: '<App />'
});
