import { expect } from 'chai';
import { prepareSearchGnd, searchGnd } from '../src/LobidClient';
import { lobidGndApi } from '../src/LobidConstants';

describe('LobidClient', () => {
  describe('#prepareSearchGnd', () => {
    it('can prepare a basic query', () => {
      const expectation = `${lobidGndApi}Twain&size=100&format=json`;
      expect(prepareSearchGnd('Twain')).to.equal(expectation);
    });
  });

  describe('#searchGnd', () => {
    it('can perform a simple query', async () => {
      const response = await searchGnd('Twain');
      expect(response['totalItems']).to.be.greaterThan(100);
    });
  });
});
