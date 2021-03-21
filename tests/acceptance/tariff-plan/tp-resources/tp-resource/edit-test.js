import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';
import { setupApplicationTest } from 'ember-mocha';
import { authenticateSession } from 'ember-simple-auth/test-support';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { visit, click, fillIn } from '@ember/test-helpers';
import {
  selectSearch,
  selectChoose,
} from 'ember-power-select/test-support/helpers';

describe('Acceptance: TpResources.Edit', function () {
  let hooks = setupApplicationTest();
  setupMirage(hooks);
  beforeEach(async function () {
    this.tariffPlan = server.create('tariff-plan', {
      id: '1',
      name: 'Test',
      alias: 'tptest',
    });
    server.create('tp-resource', {
      id: '1',
      tpid: this.tariffPlan.alias,
      filterIds: 'test_id1',
      thresholdIds: 'test_id1',
    });
    server.create('tp-filter', {
      tpid: this.tariffPlan.alias,
      customId: 'test_id2',
    });
    server.create('tp-threshold', {
      tpid: this.tariffPlan.alias,
      customId: 'test_id3',
    });
    const user = server.create('user');
    await authenticateSession({ email: 'user@example.com', user_id: user.id });
  });
  describe('fill form with correct data and submit', () =>
    it('sends correct data to the backend', async function () {
      let expectCorrectRequest = () => expect(true).to.be.false;
      server.patch('/tp-resources/:id', function (schema, request) {
        expectCorrectRequest = () => {
          const params = JSON.parse(request.requestBody);
          expect(params.data.attributes['tpid']).to.eq('tptest');
          expect(params.data.attributes['tenant']).to.eq('tenant');
          expect(params.data.attributes['custom-id']).to.eq('custom_id');
          expect(params.data.attributes['filter-ids']).to.eq(
            'test_id1,test_id2'
          );
          expect(params.data.attributes['threshold-ids']).to.eq(
            'test_id1,test_id3'
          );
          expect(params.data.attributes['activation-interval']).to.eq(
            'activation_interval'
          );
          expect(params.data.attributes['usage-ttl']).to.eq('usage_ttl');
          expect(params.data.attributes['limit']).to.eq('limit');
          expect(params.data.attributes['allocation-message']).to.eq(
            'allocation_message'
          );
          expect(params.data.attributes['weight']).to.eq(10);
        };
        return { data: { id: '1', type: 'tp-resource' } };
      });
      await visit('/tariff-plans/1/tp-resources/1/edit');
      await fillIn('[data-test-tenant] input', 'tenant');
      await fillIn('[data-test-customid] input', 'custom_id');
      await selectSearch(
        '[data-test-select-search-to-str="filter-ids"]',
        'test_id2'
      );
      await selectChoose(
        '[data-test-select-search-to-str="filter-ids"]',
        'test_id2'
      );
      await selectSearch(
        '[data-test-select-search-to-str="threshold-ids"]',
        'test_id3'
      );
      await selectChoose(
        '[data-test-select-search-to-str="threshold-ids"]',
        'test_id3'
      );
      await fillIn(
        '[data-test-activation-interval] input',
        'activation_interval'
      );
      await fillIn('[data-test-usage-ttl] input', 'usage_ttl');
      await fillIn('[data-test-limit] input', 'limit');
      await fillIn(
        '[data-test-allocation-message] input',
        'allocation_message'
      );
      await fillIn('[data-test-weight] input', 10);
      await click('[data-test-stored] input');
      await click('[data-test-blocker] input');
      await click('[data-test-submit-button]');
      expectCorrectRequest();
    }));
});
