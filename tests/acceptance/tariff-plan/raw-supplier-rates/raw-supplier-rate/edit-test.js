import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';
import { setupApplicationTest } from 'ember-mocha';
import { authenticateSession } from 'ember-simple-auth/test-support';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { visit, click, fillIn } from '@ember/test-helpers';

describe('Acceptance | Tariff Plan | Raw Supplier Rates | Edit', function () {
  let hooks = setupApplicationTest();
  setupMirage(hooks);

  beforeEach(async function () {
    this.tariffPlan = server.create('tariff-plan', {
      id: '1',
      name: 'Test',
      alias: 'tptest',
    });
    server.create('raw-supplier-rate', { id: '1' });
    await authenticateSession({ email: 'user@example.com' });
  });

  describe('fill form with correct data and submit', () =>
    it('sends correct data to the backend', async function () {
      let counter = 0;

      server.patch('/raw-supplier-rates/:id', function (schema, request) {
        counter = counter + 1;
        const params = JSON.parse(request.requestBody);
        expect(params.data.attributes['rate']).to.eq(0.01);
        expect(params.data.attributes['supplier-name']).to.eq('supplier-name');
        expect(params.data.attributes['prefix']).to.eq('prefix');
        expect(params.data.attributes['description']).to.eq('description');
        return { data: { id: '1', type: 'raw-supplier-rate' } };
      });

      await visit('/tariff-plans/1/raw-supplier-rates/1/edit');
      await fillIn('[data-test-rate] input', 0.01);
      await fillIn('[data-test-supplier-name] input', 'supplier-name');
      await fillIn('[data-test-prefix] input', 'prefix');
      await fillIn('[data-test-description] input', 'description');
      await click('[data-test-submit-button]');
      expect(counter).to.eq(1);
    }));
});
