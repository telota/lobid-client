import axios from 'axios';
import * as _ from 'lodash';
import { LobidGndQueryOptions } from './LobidQueryOptions';
import { buildLobidGndQuery } from './LobidQueryBuilder';

export function prepareSearchGnd(query: string, queryOptions: LobidGndQueryOptions = {}) : string {
  let userQueryOptions: LobidGndQueryOptions = {
    query,
  };

  userQueryOptions = _.merge(userQueryOptions, queryOptions);
  return buildLobidGndQuery(userQueryOptions);
}

export async function searchGnd(
    query: string,
    queryOptions: LobidGndQueryOptions = {},
  ) : Promise<any> {
  const queryUri = prepareSearchGnd(query, queryOptions);

  return await axios.get(queryUri)
    .then((response)  => {
      const { data } = response;
      return data;
    })
    .catch(error => error);
}

export default searchGnd;
