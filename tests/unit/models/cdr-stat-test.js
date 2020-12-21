import { expect } from 'chai';
import { describe, it, beforeEach } from 'mocha';
import { setupTest } from 'ember-mocha';

describe('Unit | Model | cdr stat', function () {
  setupTest();

  let store;

  beforeEach(function () {
    store = this.owner.lookup('service:store');
  });

  describe('#answeredCount', function () {
    it('returns a difference between totalCount and totalErrors', function () {
      const model = store.createRecord('cdr-stat', {
        totalCount: 10,
        totalErrors: 2,
        totalNormalClearingDisconnects: 1,
        totalUnspecifiedDisconnects: 2,
        totalRejectedDisconnects: 2,
      });
      expect(model.answeredCount).to.eq(3);
    });
  });

  describe('#asr', function () {
    it('returns percents of answered call', function () {
      const model = store.createRecord('cdr-stat', {
        totalCount: 10,
        totalErrors: 2,
        totalNormalClearingDisconnects: 1,
        totalUnspecifiedDisconnects: 2,
        totalRejectedDisconnects: 2,
      });
      expect(model.asr).to.eq(30);
    });
  });
});
