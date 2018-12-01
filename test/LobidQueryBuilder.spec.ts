import { expect } from 'chai';
import { buildLobidQuery, prepareQueryOptions } from '../src/LobidQueryBuilder';
import { lobidApi } from '../src/LobidConstants';

describe('LobidQueryBuilder', () => {

  describe('#prepareQueryOptions', () => {
    it('sets the default size and format', () => {

    });
  });

  describe('#validateQueryOptions', () => {

  });

  describe('#buildQuery', () => {

    it('builds a simple query with only the query parameter', () => {
      const queryOptions = {
        query: 'Twain',
      };
      const expectation = `${lobidApi}Twain`;
      expect(buildLobidQuery(queryOptions)).to.equal(expectation);
    });

    it('builds a query within a given field', () => {
      const queryOptions = {
        query: 'Twain',
        field: 'preferredName',
      };

      const expectation = `${lobidApi}preferredName:Twain`;
      expect(buildLobidQuery(queryOptions)).to.equal(expectation);
    });

  });
});
