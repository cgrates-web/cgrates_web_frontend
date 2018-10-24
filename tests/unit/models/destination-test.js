import { run } from '@ember/runloop';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import { setupModelTest } from 'ember-mocha';

describe('Destination', function () {
  setupModelTest('destination', () => ({needs: []}));

  return describe('#prefixesString', function () {
    describe('get', () =>
      it('joins all prefixes', function () {
        const model = this.subject();
        return run(function () {
          model.set('prefixes', ['+7', '+44']);
          return expect(model.get('prefixesString')).to.equal('+7, +44');
        });
      })
    );

    return describe('set', () =>
      it('sets prefixes array', function () {
        const model = this.subject();
        return run(function () {
          model.set('prefixesString', '+77, +44,+7');
          expect(model.get('prefixes')).to.include('+77');
          expect(model.get('prefixes')).to.include('+44');
          return expect(model.get('prefixes')).to.include('+7');
        });
      })
    );
  });
});
