import { Redis } from 'ioredis';

export enum DBConnectionState {
  USING,
  WAIT
}

export type ItemState = {
  key: string;
  type: string;
};

export type RedisState = {
  keys: ItemState[];
  state: DBConnectionState;
  instance: Redis | null;
};
