export interface ConnectionConfig {
  name: string;
  host: string;
  port: number;
  password: string;
}

const getDefaultConnectionConfig = (): ConnectionConfig => ({
  name: 'YA Cute Redis Server',
  host: '127.0.0.1',
  port: 8000,
  password: ''
});

export interface RootState {
  connectionConfig: ConnectionConfig;
}

export const state = {
  connectionConfig: getDefaultConnectionConfig()
};
