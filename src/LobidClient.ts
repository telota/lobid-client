import axios from 'axios';
import * as _ from 'lodash';
import { LobidGndQueryOptions } from './LobidQueryOptions';
import { buildLobidGndQuery } from './LobidQueryBuilder';

/**
 * Prepare the query URI
 * @param query Query string passed in by the user
 * @param queryOptions Optional additional query options
 */
export function prepareSearchGnd(query: string, queryOptions: LobidGndQueryOptions = {}) : string {
  let userQueryOptions: LobidGndQueryOptions = {
    query,
  };

  userQueryOptions = _.merge(userQueryOptions, queryOptions);
  return buildLobidGndQuery(userQueryOptions);
}

/**
 * 
 * @param query Query string passed in by the user
 * @param queryOptions Optional additional query options
 */
export function searchGnd(
    query: string,
    queryOptions: LobidGndQueryOptions = {},
  ) : Promise<any> {
  const queryUri = prepareSearchGnd(query, queryOptions);

  return axios.get(queryUri)
    .then((response)  => {
      const { data } = response;
      return data;
    });
}

export default searchGnd;
