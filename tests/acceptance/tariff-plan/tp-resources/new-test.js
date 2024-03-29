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

describe('Acceptance: TpResources.New', function () {
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
      customId: 'test_id1',
    });
    server.create('tp-threshold', {
      tpid: this.tariffPlan.alias,
      customId: 'test_id2',
    });
    const user = server.create('user');
    await authenticateSession({ email: 'user@example.com', user_id: user.id });
  });
  describe('visit /tariff-plans/1/tp-resources/new', () =>
    it('renders tp-resources form', async function () {
      await visit('/tariff-plans/1/tp-resources/new');
      expect(findAll('form input').length).to.eq(11);
    }));
  describe('go away without save', () =>
    it('removes not saved tp-resources', async function () {
      await visit('/tariff-plans/1/tp-resources/new');
      await click('[data-test-tp-resources-link]');
      expect(findAll('table tbody tr').length).to.eq(0);
    }));
  describe('submit empty form', function () {
    beforeEach(async function () {
      await visit('/tariff-plans/1/tp-resources/new');
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
    it('displays activation-interval error', async function () {
      expect(find('[data-test-activation-interval] input')).to.have.class(
        'is-invalid'
      );
      expect(
        find('[data-test-activation-interval] .invalid-feedback')
      ).to.have.class('d-block');
    });
    it('displays usage-ttl error', async function () {
      expect(find('[data-test-usage-ttl] input')).to.have.class('is-invalid');
      expect(find('[data-test-usage-ttl] .invalid-feedback')).to.have.class(
        'd-block'
      );
    });
    it('displays limit error', async function () {
      expect(find('[data-test-limit] input')).to.have.class('is-invalid');
      expect(find('[data-test-limit] .invalid-feedback')).to.have.class(
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
      server.post('/tp-resources', function (schema, request) {
        expectCorrectRequest = () => {
          const params = JSON.parse(request.requestBody);
          expect(params.data.attributes['tpid']).to.eq('tptest');
          expect(params.data.attributes['tenant']).to.eq('tenant');
          expect(params.data.attributes['custom-id']).to.eq('custom_id');
          expect(params.data.attributes['filter-ids']).to.eq('test_id1');
          expect(params.data.attributes['threshold-ids']).to.eq(
            '*none,test_id2'
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
      await visit('/tariff-plans/1/tp-resources/new');
      await fillIn('[data-test-tenant] input', 'tenant');
      await fillIn('[data-test-customid] input', 'custom_id');
      await selectSearch(
        '[data-test-select-search-to-str="filter-ids"]',
        'test_id1'
      );
      await selectChoose(
        '[data-test-select-search-to-str="filter-ids"]',
        'test_id1'
      );
      await selectSearch(
        '[data-test-select-search-to-str="threshold-ids"]',
        'test_id2'
      );
      await selectChoose(
        '[data-test-select-search-to-str="threshold-ids"]',
        'test_id2'
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
