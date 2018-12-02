import { expect } from 'chai';
import {
  buildLobidGndQuery,
  prepareQueryOptions,
  buildFilters,
  buildPagination,
  validateQueryOptions,
} from '../src/LobidQueryBuilder';
import { lobidGndApi } from '../src/LobidConstants';
import { it } from 'mocha';

describe('LobidQueryBuilder', () => {

  describe('#validateQueryOptions', () => {
    it('throws an error if the format is not json', () => {
      const queryOptions = {
        query: 'Twain',
        format: 'xml',
      };

      expect(validateQueryOptions(queryOptions).format).to.equal('json');
    });
  });

  describe('#prepareQueryOptions', () => {
    it('sets the default size and format', () => {
      const queryOptions = {
        query: 'Twain',
      };

      const expectation = {
        query: 'Twain',
        size: 100,
        format: 'json',
      };

      expect(prepareQueryOptions(queryOptions)).to.deep.equal(expectation);
    });
  });

  describe('#buildFilters', () => {
    it('builds a simple filter', () => {
      const queryOptions = {
        query: 'Twain',
        filter: {
          type: 'Person',
        },
      };

      const expectation = '&filter=type:Person';
      expect(buildFilters(queryOptions)).to.equal(expectation);
    });

    it('chains two filters', () => {
      const queryOptions = {
        query: 'Twain',
        filter: {
          type: 'Person',
          dateOfBirth: '1965',
        },
      };

      const expectation = '&filter=type:Person AND dateOfBirth:1965';
      expect(buildFilters(queryOptions)).to.equal(expectation);
    });

  });

  describe('#buildPagination', () => {
    it('builds the pagination with from and size', () => {
      const queryOptions = {
        query: 'Twain',
        from: 200,
        size: 50,
      };

      const expectation = '&from=200&size=50';
      expect(buildPagination(queryOptions)).to.equal(expectation);
    });
  });

  describe('#buildQuery', () => {

    const defaultParameters = '&size=100&format=json';

    it('builds a simple query with only the query parameter', () => {
      const queryOptions = {
        query: 'Twain',
      };
      const expectation = `${lobidGndApi}Twain${defaultParameters}`;
      expect(buildLobidGndQuery(queryOptions)).to.equal(expectation);
    });

    it('builds a query within a given field', () => {
      const queryOptions = {
        query: 'Twain',
        field: 'preferredName',
      };

      const expectation = `${lobidGndApi}preferredName:Twain${defaultParameters}`;
      expect(buildLobidGndQuery(queryOptions)).to.equal(expectation);
    });

    it('build a query with a filter', () => {
      const queryOptions = {
        query: 'Twain',
        field: 'preferredName',
        filter: {
          type: 'Person',
        },
      };

      const expectation = `${lobidGndApi}preferredName:Twain&filter=type:Person`
        + `${defaultParameters}`;
      expect(buildLobidGndQuery(queryOptions)).to.equal(expectation);
    });

    it('build a complete query uri and corrects the format', () => {
      const queryOptions = {
        query: 'Twain',
        field: 'preferredName',
        filter: {
          type: 'Person',
          dateOfBirth: '1965',
        },
        size: 50,
        from: 200,
        format: 'xml',
      };

      const expectation = `${lobidGndApi}preferredName:Twain`
        + '&filter=type:Person AND dateOfBirth:1965'
        + '&from=200&size=50&format=json';
      expect(buildLobidGndQuery(queryOptions)).to.equal(expectation);
    });

  });
});
