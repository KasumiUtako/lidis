import { Redis } from 'ioredis';

export enum DBConnectionState {
  USING,
  WAIT
}

export type RedisState = {
  keys: Object[];
  state: DBConnectionState;
  instance: Redis | null;
};
