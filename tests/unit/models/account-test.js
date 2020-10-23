import { describe, it } from 'mocha';
import { expect } from 'chai';
import { setupTest } from 'ember-mocha';

describe('Unit | Model | Account', function () {
  setupTest('account', () => ({ needs: [] }));

  describe('#balance', () =>
    it('returns the sum of values', function () {
      this.store = this.owner.lookup('service:store');
      const model = this.store.createRecord('account', {
        balanceMap: { '*monetary': [{ value: 10 }, { value: 20 }] },
      });
      expect(model.balanceMonetaryValues).to.deep.equal([10, 20]);
      expect(model.balance).to.equal(30);
    }));
});
