import Vue from 'vue';
import Vuex, { Store } from 'vuex';

import { RootState, state } from '@/store/state';
import { getters } from '@/store/getters';

Vue.use(Vuex);

export default new Store<RootState>({
  state,
  getters
});
