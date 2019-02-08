import { LobidGndQueryOptions } from './LobidQueryOptions';
/**
 * Build the query URI for LOBID
 * @param queryOptions QueryOptions passed in by the user
 */
export declare function buildLobidGndQuery(queryOptions: LobidGndQueryOptions): string;
/**
 * Make sure the query options are valid, i.e. no unallowed field names
 * @param queryOptions Query Options passed in by the user
 */
export declare function validateQueryOptions(queryOptions: LobidGndQueryOptions): LobidGndQueryOptions;
/**
 * Insert some default values in case the user did not specify any
 * @param userQueryOptions Query Options passed in by the user
 */
export declare function prepareQueryOptions(userQueryOptions: LobidGndQueryOptions): LobidGndQueryOptions;
/**
 * Chain all filters together
 * @param userQueryOptions Query options passed in by the user
 */
export declare function buildFilters(userQueryOptions: LobidGndQueryOptions): string;
/**
 * Build the pagination paraemter substring
 * @param userQueryOptions Query options passed in by the user
 */
export declare function buildPagination(userQueryOptions: LobidGndQueryOptions): string;
export default buildLobidGndQuery;
