import { RootState } from '@/store/state';

export const getters = {
  databaseName(state: RootState) {
    return state.connectionConfig.name;
  }
};
