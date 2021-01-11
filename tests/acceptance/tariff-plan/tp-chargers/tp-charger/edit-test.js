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

describe('Acceptance: TpChargers.Edit', function () {
  let hooks = setupApplicationTest();
  setupMirage(hooks);

  beforeEach(async function () {
    this.tariffPlan = server.create('tariff-plan', {
      id: '1',
      name: 'Test',
      alias: 'tptest',
    });
    server.create('tp-charger', {
      id: '1',
      tpid: this.tariffPlan.alias,
      filterIds: 'filter_id1',
      attributeIds: 'attr_id1',
    });
    server.create('tp-filter', {
      tpid: this.tariffPlan.alias,
      customId: 'filter_id2',
    });
    server.create('tp-attribute', {
      tpid: this.tariffPlan.alias,
      customId: 'attr_id2',
    });
    await authenticateSession({ email: 'user@example.com' });
  });

  describe('fill form with correct data and submit', () =>
    it('sends correct data to the backend', async function () {
      let expectCorrectRequest = () => expect(true).to.be.false;
      server.patch('/tp-chargers/:id', function (schema, request) {
        expectCorrectRequest = () => {
          const params = JSON.parse(request.requestBody);
          expect(params.data.attributes['tpid']).to.eq('tptest');
          expect(params.data.attributes['tenant']).to.eq('tenant');
          expect(params.data.attributes['custom-id']).to.eq('custom_id');
          expect(params.data.attributes['filter-ids']).to.eq(
            'filter_id1,filter_id2'
          );
          expect(params.data.attributes['attribute-ids']).to.eq(
            'attr_id1,attr_id2'
          );
          expect(params.data.attributes['activation-interval']).to.eq(
            'activation_interval'
          );
          expect(params.data.attributes['run-id']).to.eq('run_id');
          expect(params.data.attributes['weight']).to.eq(10);
        };
        return { data: { id: '1', type: 'tp-charger' } };
      });

      await visit('/tariff-plans/1/tp-chargers/1/edit');
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
      await fillIn(
        '[data-test-attribute-ids]',
        'attr_id2'
      );
      await fillIn(
        '[data-test-activation-interval] input',
        'activation_interval'
      );
      await fillIn('[data-test-run-id] input', 'run_id');
      await fillIn('[data-test-weight] input', 10);
      await click('[data-test-submit-button]');
      expectCorrectRequest();
    }));
});
