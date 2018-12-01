export interface LobidQueryOptions {
  query: string;
  field?: string;
  filter?: object;
  size?: number;
  from?: number;
  format?: string;
}

export const lobidDefaultQueryOptions : LobidQueryOptions = {
  query: '*',
  size: 100,
  format: 'json',
};

export default LobidQueryOptions;
