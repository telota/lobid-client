import { LobidGndQueryOptions } from './LobidQueryOptions';
/**
 * Prepare the query URI
 * @param query Query string passed in by the user
 * @param queryOptions Optional additional query options
 */
export declare function prepareSearchGnd(query: string, queryOptions?: LobidGndQueryOptions): string;
/**
 *
 * @param query Query string passed in by the user
 * @param queryOptions Optional additional query options
 */
export declare function searchGnd(query: string, queryOptions?: LobidGndQueryOptions): Promise<any>;
export default searchGnd;
