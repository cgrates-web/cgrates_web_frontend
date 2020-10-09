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

describe('Acceptance: TpThresholds.New', function () {
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
    server.create('tp-action', {
      tpid: this.tariffPlan.alias,
      tag: 'test_id2',
    });
    await authenticateSession({ email: 'user@example.com' });
  });
  describe('visit /tariff-plans/1/tp-thresholds/new', () =>
    it('renders tp-thresholds form', async function () {
      await visit('/tariff-plans/1/tp-thresholds/new');
      expect(findAll('form input').length).to.eq(11);
    }));
  describe('go away without save', () =>
    it('removes not saved tp-thresholds', async function () {
      await visit('/tariff-plans/1/tp-thresholds/new');
      await click('[data-test-tp-thresholds-link]');
      expect(findAll('table tbody tr').length).to.eq(0);
    }));
  describe('submit empty form', function () {
    beforeEach(async function () {
      await visit('/tariff-plans/1/tp-thresholds/new');
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
    it('displays action-ids error', function () {
      expect(
        find('[data-test-select-search-to-str="action-ids"] div')
      ).to.have.class('is-invalid');
      expect(
        find('[data-test-select-search-to-str="action-ids"] .invalid-feedback')
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
    it('displays max-hits error', async function () {
      expect(find('[data-test-max-hits] input')).to.have.class('is-invalid');
      expect(find('[data-test-max-hits] .invalid-feedback')).to.have.class(
        'd-block'
      );
    });
    it('displays min-hits error', async function () {
      expect(find('[data-test-min-hits] input')).to.have.class('is-invalid');
      expect(find('[data-test-min-hits] .invalid-feedback')).to.have.class(
        'd-block'
      );
    });
    it('displays min-sleep error', async function () {
      expect(find('[data-test-min-sleep] input')).to.have.class('is-invalid');
      expect(find('[data-test-min-sleep] .invalid-feedback')).to.have.class(
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
      server.post('/tp-thresholds', function (schema, request) {
        expectCorrectRequest = () => {
          const params = JSON.parse(request.requestBody);
          expect(params.data.attributes['tpid']).to.eq('tptest');
          expect(params.data.attributes['tenant']).to.eq('tenant');
          expect(params.data.attributes['custom-id']).to.eq('custom_id');
          expect(params.data.attributes['filter-ids']).to.eq('test_id1');
          expect(params.data.attributes['action-ids']).to.eq('test_id2');
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
      await visit('/tariff-plans/1/tp-thresholds/new');
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
        '[data-test-select-search-to-str="action-ids"]',
        'test_id2'
      );
      await selectChoose(
        '[data-test-select-search-to-str="action-ids"]',
        'test_id2'
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
