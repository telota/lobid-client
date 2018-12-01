import { expect } from 'chai';
import LobidClient from '../src/LobidClient';

describe('LobidClient', () => {
  describe('basic query', () => {
    it('can perform a basic query', () => {
      expect(LobidClient.search('hello')).to.equal('hello');
    });
  });
});
