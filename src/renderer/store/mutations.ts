import { MutationTree } from 'vuex';
import { RootState, ConnectionConfig } from '@/store/state';

export const mutations: MutationTree<RootState> = {
  updateDatabaseConfig: (state, payload: ConnectionConfig) => {
    state.connectionConfig = { ...payload };
  }
};
