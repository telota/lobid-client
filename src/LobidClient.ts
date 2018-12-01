import axios from 'axios';
import { lobidApi } from './LobidConstants';

class LobidClient {

  private performQuery(queryOptions: QueryOptions) : boolean {
    return false;
  }

  static search(query: string, queryOptions?: QueryOptions) : string {
    return query;
  }

}

export default LobidClient;
