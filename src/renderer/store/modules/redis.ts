import { Module, ActionTree, MutationTree, GetterTree } from 'vuex';
import { RootState } from '@/store/state';
import { Redis, default as IORedis } from 'ioredis';
import {
  RedisState,
  DBConnectionState,
  ItemState
} from '@/store/modules/redisState';
import { map } from '@/lib/asyncro';

const state: RedisState = {
  keys: [],
  state: DBConnectionState.WAIT,
  instance: null
};

const actions: ActionTree<RedisState, RootState> = {
  getItemsByKey: async ({ state: { instance }, commit }, payload: string) => {
    if (instance) {
      const keys = await instance.keys(payload);
      const data = await map(keys, async key => ({
        key,
        type: await instance.type(key)
      }));
      commit('setKeys', data);
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
  setKeys: (state, paylaod: ItemState[]) => (state.keys = paylaod),
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
