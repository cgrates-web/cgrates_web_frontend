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

describe('Acceptance: TpThresholds.Edit', function () {
  let hooks = setupApplicationTest();
  setupMirage(hooks);
  beforeEach(async function () {
    this.tariffPlan = server.create('tariff-plan', {
      id: '1',
      name: 'Test',
      alias: 'tptest',
    });
    server.create('tp-threshold', {
      id: '1',
      tpid: this.tariffPlan.alias,
      filterIds: 'filter_id1',
      actionIds: 'action_id1',
    });
    server.create('tp-filter', {
      tpid: this.tariffPlan.alias,
      customId: 'filter_id2',
    });
    server.create('tp-action', {
      tpid: this.tariffPlan.alias,
      tag: 'action_id2',
    });
    await authenticateSession({ email: 'user@example.com' });
  });
  describe('fill form with correct data and submit', () =>
    it('sends correct data to the backend', async function () {
      let expectCorrectRequest = () => expect(true).to.be.false;
      server.patch('/tp-thresholds/:id', function (schema, request) {
        expectCorrectRequest = () => {
          const params = JSON.parse(request.requestBody);
          expect(params.data.attributes['tpid']).to.eq('tptest');
          expect(params.data.attributes['tenant']).to.eq('tenant');
          expect(params.data.attributes['custom-id']).to.eq('custom_id');
          expect(params.data.attributes['filter-ids']).to.eq(
            'filter_id1,filter_id2'
          );
          expect(params.data.attributes['action-ids']).to.eq(
            'action_id1,action_id2'
          );
          expect(params.data.attributes['activation-interval']).to.eq(
            'activation_interval'
          );
          expect(params.data.attributes['max-hits']).to.eq(40);
          expect(params.data.attributes['min-hits']).to.eq(10);
          expect(params.data.attributes['min-sleep']).to.eq(5);
          expect(params.data.attributes['weight']).to.eq(10);
          expect(params.data.attributes['async']).to.eq(true);
          expect(params.data.attributes['blocker']).to.eq(true);
        };
        return { data: { id: '1', type: 'tp-threshold' } };
      });
      await visit('/tariff-plans/1/tp-thresholds/1/edit');
      await fillIn('[data-test-tenant] input', 'tenant');
      await fillIn('[data-test-customid] input', 'custom_id');
      await selectSearch(
        '[data-test-select-search-to-str="filter-ids"]',
        'filter_id2'
      );
      await selectChoose(
        '[data-test-select-search-to-str="filter-ids"]',
        'filter_id2'
      );
      await selectSearch(
        '[data-test-select-search-to-str="action-ids"]',
        'action_id2'
      );
      await selectChoose(
        '[data-test-select-search-to-str="action-ids"]',
        'action_id2'
      );
      await fillIn(
        '[data-test-activation-interval] input',
        'activation_interval'
      );
      await fillIn('[data-test-max-hits] input', 40);
      await fillIn('[data-test-min-hits] input', 10);
      await fillIn('[data-test-min-sleep] input', 5);
      await fillIn('[data-test-weight] input', 10);
      await click('[data-test-async] input');
      await click('[data-test-blocker] input');
      await click('[data-test-submit-button]');
      expectCorrectRequest();
    }));
});
