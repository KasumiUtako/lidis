import { Module, ActionTree, MutationTree, GetterTree } from 'vuex';
import { RootState } from '@/store/state';
import { Redis, default as IORedis } from 'ioredis';
import { RedisState, DBConnectionState } from '@/store/modules/redisState';

const state: RedisState = {
  keys: [],
  state: DBConnectionState.WAIT,
  instance: null
};

const actions: ActionTree<RedisState, RootState> = {
  getItemsByKey: async ({ state: { instance }, commit }, payload: string) => {
    if (instance) {
      const keys = await instance.keys(payload);
      commit('setKeys', keys);
    }
  },

  connectRedis: ({ rootState: { connectionConfig }, commit }) => {
    const opts = {
      port: connectionConfig.port,
      host: connectionConfig.host,
      password: connectionConfig.password
    };
    const redisInstance = new IORedis(opts);
    commit('updateStatu', DBConnectionState.USING);
    commit('updateInstance', redisInstance);
  }
};

const mutations: MutationTree<RedisState> = {
  setKeys: (state, paylaod: Object[]) => (state.keys = paylaod),
  updateStatu: (state, payload: DBConnectionState) => (state.state = payload),
  updateInstance: (state, payload: Redis) => (state.instance = payload)
};

const getters: GetterTree<RedisState, RootState> = {
  keys: state => state.keys
};

export const redis: Module<RedisState, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
