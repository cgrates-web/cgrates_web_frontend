import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';
import { setupApplicationTest } from 'ember-mocha';
import { authenticateSession } from 'ember-simple-auth/test-support';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import {
  selectChoose,
  selectSearch,
} from 'ember-power-select/test-support/helpers';
import { visit, find, findAll, click, fillIn } from '@ember/test-helpers';

describe('Acceptance: TpDerivedChargers.New', function () {
  let hooks = setupApplicationTest();
  setupMirage(hooks);

  beforeEach(async function () {
    this.tariffPlan = server.create('tariff-plan', {
      id: '1',
      name: 'Test',
      alias: 'tptest',
    });
    server.create('tp-destination', {
      tpid: this.tariffPlan.alias,
      tag: 'tag-1',
    });
    await authenticateSession({ email: 'user@example.com' });
  });

  describe('go away without save', () =>
    it('removes not saved tp-derived-charger', async function () {
      await visit('/tariff-plans/1/tp-derived-chargers/new');
      await click('[data-test-tp-derived-chargers-link]');
      expect(findAll('table tbody tr').length).to.eq(0);
    }));

  describe('submit empty form', function () {
    beforeEach(async function () {
      await visit('/tariff-plans/1/tp-derived-chargers/new');
      await click('[data-test-submit-button]');
    });
    it('displays loadid error', async function () {
      expect(find('[data-test-loadid] input')).to.have.class('is-invalid');
      expect(find('[data-test-loadid] .invalid-feedback')).to.have.class(
        'd-block'
      );
    });
    it('displays direction error', async function () {
      expect(find('[data-test-direction] input')).to.have.class('is-invalid');
      expect(find('[data-test-direction] .invalid-feedback')).to.have.class(
        'd-block'
      );
    });
    it('displays tenant error', async function () {
      expect(find('[data-test-tenant] input')).to.have.class('is-invalid');
      expect(find('[data-test-tenant] .invalid-feedback')).to.have.class(
        'd-block'
      );
    });
    it('displays category error', async function () {
      expect(find('[data-test-category] input')).to.have.class('is-invalid');
      expect(find('[data-test-category] .invalid-feedback')).to.have.class(
        'd-block'
      );
    });
    it('displays account error', async function () {
      expect(find('[data-test-account] input')).to.have.class('is-invalid');
      expect(find('[data-test-account] .invalid-feedback')).to.have.class(
        'd-block'
      );
    });
    it('displays subject error', async function () {
      expect(find('[data-test-subject] input')).to.have.class('is-invalid');
      expect(find('[data-test-subject] .invalid-feedback')).to.have.class(
        'd-block'
      );
    });
    it('displays destination-ids error', function () {
      expect(
        find('[data-test-select-search-to-str="destination-ids"] div')
      ).to.have.class('is-invalid');
      expect(
        find(
          '[data-test-select-search-to-str="destination-ids"] .invalid-feedback'
        )
      ).to.exist;
    });
    it('displays runid error', async function () {
      expect(find('[data-test-runid] input')).to.have.class('is-invalid');
      expect(find('[data-test-runid] .invalid-feedback')).to.have.class(
        'd-block'
      );
    });
    it('displays run-filters error', async function () {
      expect(find('[data-test-run-filters] input')).to.have.class('is-invalid');
      expect(find('[data-test-run-filters] .invalid-feedback')).to.have.class(
        'd-block'
      );
    });
    it('displays req-type-field error', async function () {
      expect(find('[data-test-req-type-field] input')).to.have.class(
        'is-invalid'
      );
      expect(
        find('[data-test-req-type-field] .invalid-feedback')
      ).to.have.class('d-block');
    });
    it('displays direction-field error', async function () {
      expect(find('[data-test-direction-field] input')).to.have.class(
        'is-invalid'
      );
      expect(
        find('[data-test-direction-field] .invalid-feedback')
      ).to.have.class('d-block');
    });
    it('displays tenant-field error', async function () {
      expect(find('[data-test-tenant-field] input')).to.have.class(
        'is-invalid'
      );
      expect(find('[data-test-tenant-field] .invalid-feedback')).to.have.class(
        'd-block'
      );
    });
    it('displays category-field error', async function () {
      expect(find('[data-test-category-field] input')).to.have.class(
        'is-invalid'
      );
      expect(
        find('[data-test-category-field] .invalid-feedback')
      ).to.have.class('d-block');
    });
    it('displays account-field error', async function () {
      expect(find('[data-test-account-field] input')).to.have.class(
        'is-invalid'
      );
      expect(find('[data-test-account-field] .invalid-feedback')).to.have.class(
        'd-block'
      );
    });
    it('displays subject-field error', async function () {
      expect(find('[data-test-subject-field] input')).to.have.class(
        'is-invalid'
      );
      expect(find('[data-test-subject-field] .invalid-feedback')).to.have.class(
        'd-block'
      );
    });
    it('displays destination-field error', async function () {
      expect(find('[data-test-destination-field] input')).to.have.class(
        'is-invalid'
      );
      expect(
        find('[data-test-destination-field] .invalid-feedback')
      ).to.have.class('d-block');
    });
    it('displays setup-time-field error', async function () {
      expect(find('[data-test-setup-time-field] input')).to.have.class(
        'is-invalid'
      );
      expect(
        find('[data-test-setup-time-field] .invalid-feedback')
      ).to.have.class('d-block');
    });
    it('displays pdd-field error', async function () {
      expect(find('[data-test-pdd-field] input')).to.have.class('is-invalid');
      expect(find('[data-test-pdd-field] .invalid-feedback')).to.have.class(
        'd-block'
      );
    });
    it('displays answer-time-field error', async function () {
      expect(find('[data-test-answer-time-field] input')).to.have.class(
        'is-invalid'
      );
      expect(
        find('[data-test-answer-time-field] .invalid-feedback')
      ).to.have.class('d-block');
    });
    it('displays usage-field error', async function () {
      expect(find('[data-test-usage-field] input')).to.have.class('is-invalid');
      expect(find('[data-test-usage-field] .invalid-feedback')).to.have.class(
        'd-block'
      );
    });
    it('displays supplier-field error', async function () {
      expect(find('[data-test-supplier-field] input')).to.have.class(
        'is-invalid'
      );
      expect(
        find('[data-test-supplier-field] .invalid-feedback')
      ).to.have.class('d-block');
    });
    it('displays disconnect-cause-field error', async function () {
      expect(find('[data-test-disconnect-cause-field] input')).to.have.class(
        'is-invalid'
      );
      expect(
        find('[data-test-disconnect-cause-field] .invalid-feedback')
      ).to.have.class('d-block');
    });
    it('displays rated-field error', async function () {
      expect(find('[data-test-rated-field] input')).to.have.class('is-invalid');
      expect(find('[data-test-rated-field] .invalid-feedback')).to.have.class(
        'd-block'
      );
    });
    it('displays cost-field error', async function () {
      expect(find('[data-test-cost-field] input')).to.have.class('is-invalid');
      expect(find('[data-test-cost-field] .invalid-feedback')).to.have.class(
        'd-block'
      );
    });
  });

  describe('fill form with correct data and submit', () =>
    it('sends correct data to the backend', async function () {
      let expectCorrectRequest = () => expect(true).to.be.false;
      server.post('/tp-derived-chargers', function (schema, request) {
        expectCorrectRequest = () => {
          const params = JSON.parse(request.requestBody);
          expect(params.data.attributes['tpid']).to.eq('tptest');
          expect(params.data.attributes['loadid']).to.eq('loadid');
          expect(params.data.attributes['direction']).to.eq('1234567');
          expect(params.data.attributes['tenant']).to.eq('tenant');
          expect(params.data.attributes['category']).to.eq('category');
          expect(params.data.attributes['account']).to.eq('account');
          expect(params.data.attributes['subject']).to.eq('subject');
          expect(params.data.attributes['destination-ids']).to.eq('tag-1');
          expect(params.data.attributes['run-filters']).to.eq('run-filters');
          expect(params.data.attributes['req-type-field']).to.eq(
            'req-type-field'
          );
          expect(params.data.attributes['direction-field']).to.eq(
            'direction-field'
          );
          expect(params.data.attributes['tenant-field']).to.eq('tenant-field');
          expect(params.data.attributes['category-field']).to.eq(
            'category-field'
          );
          expect(params.data.attributes['account-field']).to.eq(
            'account-field'
          );
          expect(params.data.attributes['subject-field']).to.eq(
            'subject-field'
          );
          expect(params.data.attributes['destination-field']).to.eq(
            'destination-field'
          );
          expect(params.data.attributes['destination-field']).to.eq(
            'destination-field'
          );
          expect(params.data.attributes['setup-time-field']).to.eq(
            'setup-time-field'
          );
          expect(params.data.attributes['pdd-field']).to.eq('pdd-field');
          expect(params.data.attributes['answer-time-field']).to.eq(
            'answer-time-field'
          );
          expect(params.data.attributes['usage-field']).to.eq('usage-field');
          expect(params.data.attributes['supplier-field']).to.eq(
            'supplier-field'
          );
          expect(params.data.attributes['disconnect-cause-field']).to.eq(
            'disconnect-cause-field'
          );
          expect(params.data.attributes['rated-field']).to.eq('rated-field');
          expect(params.data.attributes['cost-field']).to.eq('cost-field');
        };
        return { data: { id: '1', type: 'tp-derived-charger' } };
      });

      await visit('/tariff-plans/1/tp-derived-chargers/new');
      await fillIn('[data-test-loadid] input', 'loadid');
      await fillIn('[data-test-direction] input', '1234567');
      await fillIn('[data-test-tenant] input', 'tenant');
      await fillIn('[data-test-category] input', 'category');
      await fillIn('[data-test-account] input', 'account');
      await fillIn('[data-test-subject] input', 'subject');
      await selectSearch(
        '[data-test-select-search-to-str="destination-ids"]',
        'tag-1'
      );
      await selectChoose(
        '[data-test-select-search-to-str="destination-ids"]',
        'tag-1'
      );
      await fillIn('[data-test-runid] input', 'runid');
      await fillIn('[data-test-run-filters] input', 'run-filters');
      await fillIn('[data-test-req-type-field] input', 'req-type-field');
      await fillIn('[data-test-direction-field] input', 'direction-field');
      await fillIn('[data-test-tenant-field] input', 'tenant-field');
      await fillIn('[data-test-category-field] input', 'category-field');
      await fillIn('[data-test-account-field] input', 'account-field');
      await fillIn('[data-test-subject-field] input', 'subject-field');
      await fillIn('[data-test-destination-field] input', 'destination-field');
      await fillIn('[data-test-setup-time-field] input', 'setup-time-field');
      await fillIn('[data-test-pdd-field] input', 'pdd-field');
      await fillIn('[data-test-answer-time-field] input', 'answer-time-field');
      await fillIn('[data-test-usage-field] input', 'usage-field');
      await fillIn('[data-test-supplier-field] input', 'supplier-field');
      await fillIn(
        '[data-test-disconnect-cause-field] input',
        'disconnect-cause-field'
      );
      await fillIn('[data-test-rated-field] input', 'rated-field');
      await fillIn('[data-test-cost-field] input', 'cost-field');
      await click('[data-test-submit-button]');
      expectCorrectRequest();
    }));
});
