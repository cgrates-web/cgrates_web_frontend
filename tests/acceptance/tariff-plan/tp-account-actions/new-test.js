import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';
import { setupApplicationTest } from 'ember-mocha';
import { authenticateSession } from 'ember-simple-auth/test-support';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { visit, find, findAll, click, fillIn } from '@ember/test-helpers';
import {
  selectChoose,
  selectSearch,
} from 'ember-power-select/test-support/helpers';

describe('Acceptance: TpAccountActions.New', function () {
  let hooks = setupApplicationTest();
  setupMirage(hooks);

  beforeEach(async function () {
    this.tariffPlan = server.create('tariff-plan', {
      id: '1',
      name: 'Test',
      alias: 'tptest',
    });
    server.create('tp-action-plan', {
      tpid: this.tariffPlan.alias,
      tag: 'tag-1',
    });
    server.create('tp-action-trigger', {
      tpid: this.tariffPlan.alias,
      tag: 'tag-1',
    });
    await authenticateSession({ email: 'user@example.com' });
  });

  describe('go away without save', () =>
    it('removes not saved tp-account-action', async function () {
      await visit('/tariff-plans/1/tp-account-actions/new');
      await click('[data-test-tp-account-actions-link]');
      expect(findAll('table tbody tr').length).to.eq(0);
    }));

  describe('submit empty form', function () {
    beforeEach(async function () {
      await visit('/tariff-plans/1/tp-account-actions/new');
      await click('[data-test-submit-button]');
    });
    it('displays loadid error', async function () {
      expect(find('[data-test-loadid] input')).to.have.class('is-invalid');
      expect(find('[data-test-loadid] .invalid-feedback')).to.have.class(
        'd-block'
      );
    });
    it('displays tenant error', async function () {
      expect(find('[data-test-tenant] input')).to.have.class('is-invalid');
      expect(find('[data-test-tenant] .invalid-feedback')).to.have.class(
        'd-block'
      );
    });
    it('displays account error', async function () {
      expect(find('[data-test-account] input')).to.have.class('is-invalid');
      expect(find('[data-test-account] .invalid-feedback')).to.have.class(
        'd-block'
      );
    });
    it('does not displays actions-tag error', function () {
      expect(
        find('[data-test-select-search-to-str="action-plan-tag"] div')
      ).not.to.have.class('is-invalid');
      expect(
        find(
          '[data-test-select-search-to-str="action-plan-tag"] .invalid-feedback'
        )
      ).not.to.exist;
    });
    it('does not displays actions-tag error', function () {
      expect(
        find('[data-test-select-search-to-str="action-trigger-tag"] div')
      ).not.to.have.class('is-invalid');
      expect(
        find(
          '[data-test-select-search-to-str="action-trigger-tag"] .invalid-feedback'
        )
      ).not.to.exist;
    });
  });

  describe('fill form with correct data and submit', () =>
    it('sends correct data to the backend', async function () {
      let expectCorrectRequest = () => expect(true).to.be.false;
      server.post('/tp-account-actions', function (schema, request) {
        expectCorrectRequest = () => {
          const params = JSON.parse(request.requestBody);
          expect(params.data.attributes['tpid']).to.eq('tptest');
          expect(params.data.attributes['loadid']).to.eq('loadid');
          expect(params.data.attributes['tenant']).to.eq('tenant');
          expect(params.data.attributes['account']).to.eq('account');
          expect(params.data.attributes['action-plan-tag']).to.eq('tag-1');
          expect(params.data.attributes['action-triggers-tag']).to.eq('tag-1');
          expect(params.data.attributes['allow-negative']).to.eq(true);
          expect(params.data.attributes['disabled']).to.eq(true);
        };
        return { data: { id: '1', type: 'tp-account-action' } };
      });

      await visit('/tariff-plans/1/tp-account-actions/new');
      await fillIn('[data-test-loadid] input', 'loadid');
      await fillIn('[data-test-tenant] input', 'tenant');
      await fillIn('[data-test-account] input', 'account');
      await selectSearch(
        '[data-test-select-search-to-str="action-plan-tag"]',
        'tag-1'
      );
      await selectChoose(
        '[data-test-select-search-to-str="action-plan-tag"]',
        'tag-1'
      );
      await selectSearch(
        '[data-test-select-search-to-str="action-trigger-tag"]',
        'tag-1'
      );
      await selectChoose(
        '[data-test-select-search-to-str="action-trigger-tag"]',
        'tag-1'
      );
      await click('[data-test-allow-negative] input');
      await click('[data-test-disabled] input');
      await click('[data-test-submit-button]');
      expectCorrectRequest();
    }));
});
