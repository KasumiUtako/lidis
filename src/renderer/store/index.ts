import Vue from 'vue';
import Vuex, { Store } from 'vuex';

import { RootState, state } from '@/store/state';
import { getters } from '@/store/getters';
import { mutations } from '@/store/mutations';
import { actions } from '@/store/actions';

import { redis } from '@/store/modules/redis';

Vue.use(Vuex);

export default new Store<RootState>({
  state,
  getters,
  mutations,
  actions,

  modules: {
    redis
  }
});
