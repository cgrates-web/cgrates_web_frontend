import { run } from '@ember/runloop';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import { setupModelTest } from 'ember-mocha';

describe('Account', function () {
  setupModelTest('account', () => ({needs: []}));

  return describe('#balance', () =>
    it('returns the sum of values', function () {
      const model = this.subject();
      return run(function () {
        model.set('balanceMap', { '*monetary': [{ value: 10 }, { value: 20 }] });
        expect(model.get('balanceMonetaryValues')).to.deep.equal([10, 20]);
        return expect(model.get('balance')).to.equal(30);
      });
    })
  );
});
