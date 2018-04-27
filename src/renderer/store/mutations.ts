import { MutationTree } from 'vuex';
import { RootState, ConnectionConfig, DBState } from '@/store/state';

export const mutations: MutationTree<RootState> = {
  updateDatabaseConfig: (state, payload: ConnectionConfig) => {
    state.connectionConfig = { ...payload };
  }
};
