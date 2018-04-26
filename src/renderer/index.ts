import Vue from 'vue';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/black-green-dark.css';

import App from '@/App.vue';
import store from '@/store';

Vue.use(VueMaterial);

new Vue({
  el: '#app',
  store,
  components: { App },
  template: '<App/>'
});
