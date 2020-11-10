import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';
import { setupApplicationTest } from 'ember-mocha';
import { authenticateSession } from 'ember-simple-auth/test-support';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { visit, click, fillIn } from '@ember/test-helpers';
import { selectChoose } from 'ember-power-select/test-support/helpers';

describe('Acceptance: TpFilter.Edit', function () {
  let hooks = setupApplicationTest();
  setupMirage(hooks);

  beforeEach(async function () {
    this.tariffPlan = server.create('tariff-plan', {
      id: '1',
      name: 'Test',
      alias: 'tptest',
    });
    this.tpFilter = server.create('tp-filter', {
      id: '1',
      tpid: this.tariffPlan.alias,
    });
    await authenticateSession({ email: 'user@example.com' });
  });

  describe('fill form with correct data and submit', () =>
    it('sends correct data to the backend', async function () {
      let counter = 0;

      server.patch('/tp-filters/:id', function (schema, request) {
        counter = counter + 1;
        const params = JSON.parse(request.requestBody);
        expect(params.data.attributes['tpid']).to.eq('tptest');
        expect(params.data.attributes['tenant']).to.eq('Test');
        expect(params.data.attributes['custom-id']).to.eq('Test');
        expect(params.data.attributes['activation-interval']).to.eq('Test');
        return { data: { id: '1', type: 'tp-filter' } };
      });

      await visit('/tariff-plans/1/tp-filters/1/edit');
      await fillIn('[data-test-tenant] input', 'Test');
      await fillIn('[data-test-custom-id] input', 'Test');
      await fillIn('[data-test-activation-interval] input', 'Test');
      await click('[data-test-submit-button]');
      expect(counter).to.eq(1);
    }));
});
