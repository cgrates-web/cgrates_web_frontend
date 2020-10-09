import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';
import { setupApplicationTest } from 'ember-mocha';
import { authenticateSession } from 'ember-simple-auth/test-support';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { visit, click, fillIn } from '@ember/test-helpers';
import {
  selectChoose,
  selectSearch,
} from 'ember-power-select/test-support/helpers';

describe('Acceptance: TpAccountActions.Edit', function () {
  let hooks = setupApplicationTest();
  setupMirage(hooks);

  beforeEach(async function () {
    this.tariffPlan = server.create('tariff-plan', {
      id: '1',
      name: 'Test',
      alias: 'tptest',
    });
    server.create('tp-account-action', {
      id: '1',
      tpid: this.tariffPlan.alias,
      actionPlanTag: 'tag_old',
      actionTriggersTag: 'tag_old',
      allowNegative: true,
      disabled: true,
    });
    server.create('tp-action-plan', {
      tpid: this.tariffPlan.alias,
      tag: 'tag-new',
    });
    server.create('tp-action-trigger', {
      tpid: this.tariffPlan.alias,
      tag: 'tag-new',
    });
    await authenticateSession({ email: 'user@example.com' });
  });

  describe('fill form with correct data and submit', () =>
    it('sends correct data to the backend', async function () {
      let expectCorrectRequest = () => expect(true).to.be.false;
      server.patch('/tp-account-actions/:id', function (schema, request) {
        expectCorrectRequest = () => {
          const params = JSON.parse(request.requestBody);
          expect(params.data.attributes['tpid']).to.eq('tptest');
          expect(params.data.attributes['loadid']).to.eq('loadid');
          expect(params.data.attributes['tenant']).to.eq('tenant');
          expect(params.data.attributes['account']).to.eq('account');
          expect(params.data.attributes['action-plan-tag']).to.eq('tag-new');
          expect(params.data.attributes['action-triggers-tag']).to.eq(
            'tag-new'
          );
          expect(params.data.attributes['allow-negative']).to.eq(false);
          expect(params.data.attributes['disabled']).to.eq(false);
        };
        return { data: { id: '1', type: 'tp-account-action' } };
      });

      await visit('/tariff-plans/1/tp-account-actions/1/edit');
      await fillIn('[data-test-loadid] input', 'loadid');
      await fillIn('[data-test-tenant] input', 'tenant');
      await fillIn('[data-test-account] input', 'account');
      await selectSearch(
        '[data-test-select-search-to-str="action-plan-tag"]',
        'tag-new'
      );
      await selectChoose(
        '[data-test-select-search-to-str="action-plan-tag"]',
        'tag-new'
      );
      await selectSearch(
        '[data-test-select-search-to-str="action-trigger-tag"]',
        'tag-new'
      );
      await selectChoose(
        '[data-test-select-search-to-str="action-trigger-tag"]',
        'tag-new'
      );
      await click('[data-test-allow-negative] input');
      await click('[data-test-disabled] input');
      await click('[data-test-submit-button]');
      expectCorrectRequest();
    }));
});
