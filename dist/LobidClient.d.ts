import { LobidGndQueryOptions } from './LobidQueryOptions';
export declare function prepareSearchGnd(query: string, queryOptions?: LobidGndQueryOptions): string;
export declare function searchGnd(query: string, queryOptions?: LobidGndQueryOptions): Promise<any>;
export default searchGnd;
