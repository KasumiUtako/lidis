import { Redis } from 'ioredis';

export enum DBConnectionState {
  USING,
  WAIT
}

export interface ItemState {
  key: string;
  type: string;
}

export interface CurrentState extends ItemState {
  data: string | string[] | {};
}

export type RedisState = {
  keys: ItemState[];
  state: DBConnectionState;
  instance: Redis | null;
  current: CurrentState;
};
