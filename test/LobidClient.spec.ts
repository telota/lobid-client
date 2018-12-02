import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import { prepareSearchGnd, searchGnd } from '../src/LobidClient';
import { lobidGndApi } from '../src/LobidConstants';

chai.use(chaiAsPromised);
const expect = chai.expect;

describe('LobidClient', () => {
  describe('#prepareSearchGnd', () => {
    it('can prepare a basic query', () => {
      const expectation = `${lobidGndApi}Twain&size=100&format=json`;
      expect(prepareSearchGnd('Twain')).to.equal(expectation);
    });

    it('can prepare a query with additional parameters', () => {
      const queryOptions = {
        filter: {
          type: 'Person',
        },
      };
      const expectation = `${lobidGndApi}Twain&filter=type:Person&size=100&format=json`;
      expect(prepareSearchGnd('Twain', queryOptions)).to.equal(expectation);
    });
  });

  describe('#searchGnd', () => {
    it('can perform a simple query', async () => {
      const response = await searchGnd('Twain');
      expect(response['totalItems']).to.be.greaterThan(100);
    });
  });

  it('can perform a query with additional parameters', async () => {
    const queryOptions = {
      filter: {
        type: 'Person',
      },
    };

    const response = await searchGnd('Twain', queryOptions);
    expect(response['totalItems']).to.be.greaterThan(1);
  });
});
