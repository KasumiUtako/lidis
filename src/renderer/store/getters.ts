import { GetterTree } from 'vuex';
import { RootState } from '@/store/state';

export const getters: GetterTree<RootState, RootState> = {
  databaseName: state => {
    return state.connectionConfig.name;
  },
  databaseConfig: state => {
    return state.connectionConfig;
  }
};
