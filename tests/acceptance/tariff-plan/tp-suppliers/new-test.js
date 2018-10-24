import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';
import { setupApplicationTest } from 'ember-mocha';
import { authenticateSession } from 'ember-simple-auth/test-support';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { visit, find, findAll, click, fillIn } from '@ember/test-helpers';

describe('Acceptance: TpSuppliers.New', function () {
  let hooks = setupApplicationTest();
  setupMirage(hooks);

  beforeEach(async function () {
    this.tariffPlan = server.create('tariff-plan', {name: 'Test', alias: 'tptest'});
    await authenticateSession({email: 'user@example.com'});
  });

  describe('visit /tariff-plans/1/tp-suppliers/new', () =>
    it('renders tp-supplier form', async function () {
      await visit('/tariff-plans/1/tp-suppliers/new');
      expect(findAll('form input').length).to.eq(15);
    })
  );

  describe('go away without save', () =>
    it('removes not saved tp-supplier', async function () {
      await visit('/tariff-plans/1/tp-suppliers/new');
      await click('[data-test-tp-suppliers-link]');
      expect(findAll('table tbody tr').length).to.eq(0);
    })
  );

  describe('submit empty form', function () {
    beforeEach(async function () {
      await visit('/tariff-plans/1/tp-suppliers/new');
      await click('[data-test-submit-button]');
    });
    it('displays tenant error', function () {
      expect(find('[data-test-tenant] input')).to.have.class('is-invalid');
      expect(find('[data-test-tenant] .invalid-feedback')).to.have.class('d-block');
    });
    it('displays custom-id error', function () {
      expect(find('[data-test-custom-id] input')).to.have.class('is-invalid');
      expect(find('[data-test-custom-id] .invalid-feedback')).to.have.class('d-block');
    });
    it('does not displays filter-ids error', function () {
      expect(find('[data-test-filter-ids] input')).to.have.class('is-valid');
      expect(find('[data-test-filter-ids] .invalid-feedback')).not.to.exist;
    });
    it('does not displays sorting error', function () {
      expect(find('[data-test-sorting] input')).to.have.class('is-valid');
      expect(find('[data-test-sorting] .invalid-feedback')).not.to.exist;
    });
    it('does not displays activation-interval error', function () {
      expect(find('[data-test-activation-interval] input')).to.have.class('is-valid');
      expect(find('[data-test-activation-interval] .invalid-feedback')).not.to.exist;
    });
    it('does not displays sorting-params error', function () {
      expect(find('[data-test-sorting-params] input')).to.have.class('is-valid');
      expect(find('[data-test-sorting-params] .invalid-feedback')).not.to.exist;
    });
    it('displays supplier-id error', function () {
      expect(find('[data-test-supplier-id] input')).to.have.class('is-invalid');
      expect(find('[data-test-supplier-id] .invalid-feedback')).to.have.class('d-block');
    });
    it('does not displays supplier-filter-ids error', function () {
      expect(find('[data-test-supplier-filter-ids] input')).to.have.class('is-valid');
      expect(find('[data-test-supplier-filter-ids] .invalid-feedback')).not.to.exist;
    });
    it('does not displays supplier-account-ids error', function () {
      expect(find('[data-test-supplier-account-ids] input')).to.have.class('is-valid');
      expect(find('[data-test-supplier-account-ids] .invalid-feedback')).not.to.exist;
    });
    it('does not displays supplier-ratingplan-ids error', function () {
      expect(find('[data-test-supplier-ratingplan-ids] input')).to.have.class('is-valid');
      expect(find('[data-test-supplier-ratingplan-ids] .invalid-feedback')).not.to.exist;
    });
    it('does not displays supplier-resource-ids error', function () {
      expect(find('[data-test-supplier-resource-ids] input')).to.have.class('is-valid');
      expect(find('[data-test-supplier-resource-ids] .invalid-feedback')).not.to.exist;
    });
    it('does not displays supplier-stat-ids error', function () {
      expect(find('[data-test-supplier-stat-ids] input')).to.have.class('is-valid');
      expect(find('[data-test-supplier-stat-ids] .invalid-feedback')).not.to.exist;
    });
    it('displays supplier-weight error', function () {
      expect(find('[data-test-supplier-weight] input')).to.have.class('is-invalid');
      expect(find('[data-test-supplier-weight] .invalid-feedback')).to.have.class('d-block');
    });
    it('displays weight error', function () {
      expect(find('[data-test-weight] input')).to.have.class('is-invalid');
      expect(find('[data-test-weight] .invalid-feedback')).to.have.class('d-block');
    });
  });

  describe('fill form with correct data and submit', () =>
    it('saves new tp-supplier with correct data', async function () {
      let counter = 0;

      server.post('/tp-suppliers/', function (schema, request) {
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

        return { data: {id: '1', type: 'tp-suppliers'} };
      });
      await visit('/tariff-plans/1/tp-suppliers/new');
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
