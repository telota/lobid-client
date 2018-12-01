import { LobidQueryOptions, lobidDefaultQueryOptions } from './LobidQueryOptions';
import { lobidApi } from './LobidConstants';

/**
 * Build the query URI for LOBID
 * @param queryOptions QueryOptions passed in by the user
 */
export function buildLobidQuery(queryOptions: LobidQueryOptions) : string {
  let lobidQueryUri : string = lobidApi;

  // Prepend the preferred field, if specified
  if (queryOptions.field) {
    lobidQueryUri += `${queryOptions.field}:`;
  }

  // Append the query string
  lobidQueryUri += queryOptions.query;

  return lobidQueryUri;
}

/**
 * Make sure the query options are valid, i.e. no unallowed field names
 * @param queryOptions Query Options passed in by the user
 */
export function validateQueryOptions(queryOptions: LobidQueryOptions) : LobidQueryOptions {
  const validatedOptions : LobidQueryOptions = queryOptions;

  return validatedOptions;
}

/**
 * Insert some default values in case the user did not specify any
 * @param userQueryOptions Query Options passed in by the user
 */
export function prepareQueryOptions(userQueryOptions: LobidQueryOptions) : LobidQueryOptions {
  const preparedOptions : LobidQueryOptions = userQueryOptions;

  if (!userQueryOptions.size) {
    preparedOptions.size = lobidDefaultQueryOptions.size;
  }

  if (!userQueryOptions.format) {
    preparedOptions.format = lobidDefaultQueryOptions.format;
  }

  return preparedOptions;
}

export default buildLobidQuery;
