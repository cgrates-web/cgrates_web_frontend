import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';
import { setupApplicationTest } from 'ember-mocha';
import { authenticateSession } from 'ember-simple-auth/test-support';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { visit, find, findAll, click, fillIn } from '@ember/test-helpers';
import {
  selectSearch,
  selectChoose,
} from 'ember-power-select/test-support/helpers';

describe('Acceptance: TpChargers.New', function () {
  let hooks = setupApplicationTest();
  setupMirage(hooks);

  beforeEach(async function () {
    this.tariffPlan = server.create('tariff-plan', {
      id: '1',
      name: 'Test',
      alias: 'tptest',
    });
    server.create('tp-filter', {
      tpid: this.tariffPlan.alias,
      customId: 'filter_id',
    });
    server.create('tp-attribute', {
      tpid: this.tariffPlan.alias,
      customId: 'attribute_id',
    });
    await authenticateSession({ email: 'user@example.com' });
  });

  describe('visit /tariff-plans/1/tp-chargers/new', () =>
    it('renders tp-charger form', async function () {
      await visit('/tariff-plans/1/tp-chargers/new');
      expect(findAll('form input').length).to.eq(7);
    }));

  describe('go away without save', () =>
    it('removes not saved tp-chargers', async function () {
      await visit('/tariff-plans/1/tp-chargers/new');
      await click('[data-test-tp-chargers-link]');
      expect(findAll('table tbody tr').length).to.eq(0);
    }));

  describe('submit empty form', function () {
    beforeEach(async function () {
      await visit('/tariff-plans/1/tp-chargers/new');
      await click('[data-test-submit-button]');
    });
    it('displays tenant error', async function () {
      expect(find('[data-test-tenant] input')).to.have.class('is-invalid');
      expect(find('[data-test-tenant] .invalid-feedback')).to.have.class(
        'd-block'
      );
    });
    it('displays custom-id error', async function () {
      expect(find('[data-test-customid] input')).to.have.class('is-invalid');
      expect(find('[data-test-customid] .invalid-feedback')).to.have.class(
        'd-block'
      );
    });
    it('displays filter-ids error', function () {
      expect(
        find('[data-test-select-search-to-str="filter-ids"] div')
      ).to.have.class('is-invalid');
      expect(
        find('[data-test-select-search-to-str="filter-ids"] .invalid-feedback')
      ).to.exist;
    });
    it('displays attribute-ids error', function () {
      expect(
        find('[data-test-select-search-to-str="attribute-ids"] div')
      ).to.have.class('is-invalid');
      expect(
        find(
          '[data-test-select-search-to-str="attribute-ids"] .invalid-feedback'
        )
      ).to.exist;
    });
    it('displays activation-interval error', async function () {
      expect(find('[data-test-activation-interval] input')).to.have.class(
        'is-invalid'
      );
      expect(
        find('[data-test-activation-interval] .invalid-feedback')
      ).to.have.class('d-block');
    });
    it('displays run-id error', async function () {
      expect(find('[data-test-run-id] input')).to.have.class('is-invalid');
      expect(find('[data-test-run-id] .invalid-feedback')).to.have.class(
        'd-block'
      );
    });
    it('displays weight error', async function () {
      expect(find('[data-test-weight] input')).to.have.class('is-invalid');
      expect(find('[data-test-weight] .invalid-feedback')).to.have.class(
        'd-block'
      );
    });
  });

  describe('fill form with correct data and submit', () =>
    it('sends correct data to the backend', async function () {
      let expectCorrectRequest = () => expect(true).to.be.false;
      server.post('/tp-chargers', function (schema, request) {
        expectCorrectRequest = () => {
          const params = JSON.parse(request.requestBody);
          expect(params.data.attributes['tpid']).to.eq('tptest');
          expect(params.data.attributes['tenant']).to.eq('tenant');
          expect(params.data.attributes['custom-id']).to.eq('custom_id');
          expect(params.data.attributes['filter-ids']).to.eq('filter_id');
          expect(params.data.attributes['attribute-ids']).to.eq('attribute_id');
          expect(params.data.attributes['activation-interval']).to.eq(
            'activation_interval'
          );
          expect(params.data.attributes['run-id']).to.eq('run_id');
          expect(params.data.attributes['weight']).to.eq(10);
        };
        return { data: { id: '1', type: 'tp-charger' } };
      });

      await visit('/tariff-plans/1/tp-chargers/new');
      await fillIn('[data-test-tenant] input', 'tenant');
      await fillIn('[data-test-customid] input', 'custom_id');
      await selectSearch(
        '[data-test-select-search-to-str="filter-ids"]',
        'filter_id'
      );
      await selectChoose(
        '[data-test-select-search-to-str="filter-ids"]',
        'filter_id'
      );
      await selectSearch(
        '[data-test-select-search-to-str="attribute-ids"]',
        'attribute_id'
      );
      await selectChoose(
        '[data-test-select-search-to-str="attribute-ids"]',
        'attribute_id'
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
