import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';
import { setupApplicationTest } from 'ember-mocha';
import { authenticateSession } from 'ember-simple-auth/test-support';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { visit, click, fillIn } from '@ember/test-helpers';

describe('Acceptance: TpSupplier.Edit', function () {
  let hooks = setupApplicationTest();
  setupMirage(hooks);

  beforeEach(async function () {
    this.tariffPlan = server.create('tariff-plan', {id: '1', name: 'Test', alias: 'tptest'});
    this.tpSupplier = server.create('tp-supplier', {id: '1', tpid: this.tariffPlan.alias});
    await authenticateSession({email: 'user@example.com'});
  });

  describe('fill form with correct data and submit', () =>
    it('saves new tp-supplier with correct data', async function () {
      let counter = 0;

      server.patch('/tp-suppliers/:id', function (schema, request) {
        counter = counter + 1;
        const params = JSON.parse(request.requestBody);
        expect(params.data.attributes['tenant']).to.eq('tenant');
        expect(params.data.attributes['custom-id']).to.eq('custom-id');
        expect(params.data.attributes['filter-ids']).to.eq('1,2');
        expect(params.data.attributes['sorting']).to.eq('ASC');
        expect(params.data.attributes['activation-interval']).to.eq('Test');
        expect(params.data.attributes['sorting-parameters']).to.eq('sort');
        expect(params.data.attributes['supplier-id']).to.eq('Hansa');
        expect(params.data.attributes['supplier-filter-ids']).to.eq('1');
        expect(params.data.attributes['supplier-account-ids']).to.eq('2');
        expect(params.data.attributes['supplier-ratingplan-ids']).to.eq('3');
        expect(params.data.attributes['supplier-resource-ids']).to.eq('4');
        expect(params.data.attributes['supplier-stat-ids']).to.eq('5');
        expect(params.data.attributes['supplier-weight']).to.eq(1);
        expect(params.data.attributes['weight']).to.eq(100);
        expect(params.data.attributes['supplier-blocker']).to.eq(true);

        return { data: {id: '1', type: 'tp-supplier'} };
      });
      await visit('/tariff-plans/1/tp-suppliers/1/edit');
      await fillIn('[data-test-tenant] input', 'tenant');
      await fillIn('[data-test-custom-id] input', 'custom-id');
      await fillIn('[data-test-filter-ids] input', '1,2');
      await fillIn('[data-test-sorting] input', 'ASC');
      await fillIn('[data-test-activation-interval] input', 'Test');
      await fillIn('[data-test-sorting-params] input', 'sort');
      await fillIn('[data-test-supplier-id] input', 'Hansa');
      await fillIn('[data-test-supplier-filter-ids] input', '1');
      await fillIn('[data-test-supplier-account-ids] input', '2');
      await fillIn('[data-test-supplier-ratingplan-ids] input', '3');
      await fillIn('[data-test-supplier-resource-ids] input', '4');
      await fillIn('[data-test-supplier-stat-ids] input', '5');
      await fillIn('[data-test-supplier-weight] input', 1);
      await fillIn('[data-test-weight] input', 100);
      await click('[data-test-supplier-blocker] input');
      await click('[data-test-submit-button]');
      expect(counter).to.eq(1);
    })
  );
});
