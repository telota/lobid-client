import * as _ from 'lodash';
import {
  LobidGndQueryOptions,
  lobidDefaultGndQueryOptions,
  allowedLobidGndFormats,
} from './LobidQueryOptions';
import { lobidGndApi } from './LobidConstants';

/**
 * Build the query URI for LOBID
 * @param queryOptions QueryOptions passed in by the user
 */
export function buildLobidGndQuery(queryOptions: LobidGndQueryOptions) : string {
  let lobidQueryUri: string = lobidGndApi;

  const preparedQueryOptions: LobidGndQueryOptions = prepareQueryOptions(queryOptions);

  // Prepend the preferred field, if specified
  if (preparedQueryOptions.field) {
    lobidQueryUri += `${queryOptions.field}:`;
  }

  // Append the query string
  lobidQueryUri += preparedQueryOptions.query;

  // Append filters if there are any
  lobidQueryUri += buildFilters(preparedQueryOptions);

  // Append from and size pagination parameters if ther are any
  lobidQueryUri += buildPagination(preparedQueryOptions);

  // Append format
  lobidQueryUri += buildFormat(preparedQueryOptions);

  return lobidQueryUri;
}

/**
 * Make sure the query options are valid, i.e. no unallowed field names
 * @param queryOptions Query Options passed in by the user
 */
export function validateQueryOptions(queryOptions: LobidGndQueryOptions) : LobidGndQueryOptions {
  const validatedOptions : LobidGndQueryOptions = queryOptions;

  if (_.has(queryOptions, 'format')) {
    if (!_.includes(allowedLobidGndFormats, queryOptions.format)) {
      try {
        throw new TypeError(`The return format "${queryOptions.format}" does not` +
          `match any of the allowed formats: ${allowedLobidGndFormats}`,
        );
      } catch (e) {
        validatedOptions.format = 'json';
      }
    }
  }

  return validatedOptions;
}

/**
 * Insert some default values in case the user did not specify any
 * @param userQueryOptions Query Options passed in by the user
 */
export function prepareQueryOptions(userQueryOptions: LobidGndQueryOptions) : LobidGndQueryOptions {
  const preparedOptions : LobidGndQueryOptions = validateQueryOptions(userQueryOptions);

  if (!_.has(userQueryOptions, 'size')) {
    preparedOptions.size = lobidDefaultGndQueryOptions.size;
  }

  if (!_.has(userQueryOptions, 'format')) {
    preparedOptions.format = lobidDefaultGndQueryOptions.format;
  }

  return preparedOptions;
}

/**
 * Chain all filters together
 * @param userQueryOptions Query options passed in by the user
 */
export function buildFilters(userQueryOptions: LobidGndQueryOptions) : string {
  if (!_.has(userQueryOptions, 'filter')) {
    return '';
  }

  const filters: string = _.keys(userQueryOptions.filter).map((filterKey: string) => {
    const value = userQueryOptions.filter[filterKey];
    return `${filterKey}:${value}`;
  }).join(' AND ');

  return `&filter=${filters}`;
}

/**
 * Build the pagination parameter substring
 * @param userQueryOptions Query options passed in by the user
 */
export function buildPagination(userQueryOptions: LobidGndQueryOptions) : string {
  let pagination = '';

  if (_.has(userQueryOptions, 'from')) {
    pagination += `&from=${userQueryOptions.from}`;
  }

  // Size will always be set when querying since it will
  // be inserted by default if not set by the user
  pagination += `&size=${userQueryOptions.size}`;

  return pagination;
}

/**
 * Build the format parameter
 * @param userQueryOptions Query options passed in by the user
 */
export function buildFormat(userQueryOptions: LobidGndQueryOptions) : string {
  let format = `&format=${userQueryOptions.format}`;

  if (_.has(userQueryOptions, 'formatFields') && (userQueryOptions.format === 'json')) {
    format += ':';
    format += userQueryOptions.formatFields.join(',');
  }

  return format;
}

export default buildLobidGndQuery;
