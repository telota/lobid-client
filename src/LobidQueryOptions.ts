interface KeyValuePair {
  [key: string]: string;
}

export interface LobidGndQueryOptions {
  query?: string;
  field?: string;
  filter?: KeyValuePair;
  size?: number;
  from?: number;
  format?: string;
}

export const lobidDefaultGndQueryOptions : LobidGndQueryOptions = {
  query: '*',
  size: 100,
  format: 'json',
};

export const allowedLobidGndFormats : string[] = ['json'];

export default LobidGndQueryOptions;
