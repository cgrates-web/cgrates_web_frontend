import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';
import { setupApplicationTest } from 'ember-mocha';
import { authenticateSession } from 'ember-simple-auth/test-support';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { visit, find, findAll, click, fillIn } from '@ember/test-helpers';

describe('Acceptance | Tariff Plan | Raw Supplier Rates | New', function () {
  let hooks = setupApplicationTest();
  setupMirage(hooks);

  beforeEach(async function () {
    this.tariffPlan = server.create('tariff-plan', {id: '1', name: 'Test', alias: 'tptest'});
    await authenticateSession({email: 'user@example.com'});
  });

  describe('visit /tariff-plans/1/raw-supplier-rates/new', () =>
    it('renders raw-supplier-rate form', async function () {
      await visit('/tariff-plans/1/raw-supplier-rates/new');
      expect(findAll('form input').length).to.eq(4);
    })
  );

  describe('go away without save', () =>
    it('removes not saved raw-supplier-rate', async function () {
      await visit('/tariff-plans/1/raw-supplier-rates/new');
      await click('[data-test-supplier-rates-link]');
      expect(findAll('table tbody tr').length).to.eq(0);
    })
  );

  describe('submit empty form', function () {
    beforeEach(async function () {
      await visit('/tariff-plans/1/raw-supplier-rates/new');
      await click('[data-test-submit-button]');
    });
    it('displays rate error', function () {
      expect(find('[data-test-rate] input')).to.have.class('is-invalid');
      expect(find('[data-test-rate] .invalid-feedback')).to.have.class('d-block');
    });
    it('displays supplier-name error', function () {
      expect(find('[data-test-supplier-name] input')).to.have.class('is-invalid');
      expect(find('[data-test-supplier-name] .invalid-feedback')).to.have.class('d-block');
    });
    it('displays prefix error', function () {
      expect(find('[data-test-prefix] input')).to.have.class('is-invalid');
      expect(find('[data-test-prefix] .invalid-feedback')).to.have.class('d-block');
    });
    it('does not displays description error', function () {
      expect(find('[data-test-description] input')).not.to.have.class('is-invalid');
      expect(find('[data-test-description] .invalid-feedback')).not.to.exist;
    });
  });

  describe('fill form with correct data and submit', () =>
    it('saves new raw-supplier-rate with correct data', async function () {
      let counter = 0;

      server.post('/raw-supplier-rates/', function (schema, request) {
        counter = counter + 1;
        const params = JSON.parse(request.requestBody);
        expect(params.data.attributes['rate']).to.eq(0.01);
        expect(params.data.attributes['supplier-name']).to.eq('supplier-name');
        expect(params.data.attributes['prefix']).to.eq('prefix');
        expect(params.data.attributes['description']).to.eq('description');
        return { data: {id: '1', type: 'raw-supplier-rate'} };
      });

      await visit('/tariff-plans/1/raw-supplier-rates/new');
      await fillIn('[data-test-rate] input', 0.01);
      await fillIn('[data-test-supplier-name] input', 'supplier-name');
      await fillIn('[data-test-prefix] input', 'prefix');
      await fillIn('[data-test-description] input', 'description');
      await click('[data-test-submit-button]');
      expect(counter).to.eq(1);
    })
  );
});
