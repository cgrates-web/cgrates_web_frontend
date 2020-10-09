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

describe('Acceptance: TpActionTriggers.Edit', function () {
  let hooks = setupApplicationTest();
  setupMirage(hooks);

  beforeEach(async function () {
    this.tariffPlan = server.create('tariff-plan', {
      id: '1',
      name: 'Test',
      alias: 'tptest',
    });
    server.create('tp-action-trigger', {
      id: '1',
      tpid: this.tariffPlan.alias,
      actionsTag: null,
      balanceTimingTags: null,
      balanceDestinationTags: null,
      recurrent: true,
      balanceBlocker: true,
      balanceDisabled: true,
    });
    server.createList('tp-action', 2, {
      tpid: this.tariffPlan.alias,
      tag: 'tag-1',
    });
    server.createList('tp-timing', 2, {
      tpid: this.tariffPlan.alias,
      tag: 'timing-tag',
    });
    server.createList('tp-destination', 2, {
      tpid: this.tariffPlan.alias,
      tag: 'destination-tag',
    });
    await authenticateSession({ email: 'user@example.com' });
  });

  describe('fill form with correct data and submit', () =>
    it('sends correct data to the backend', async function () {
      let expectCorrectRequest = () => expect(true).to.be.false;
      server.patch('/tp-action-triggers/:id', function (schema, request) {
        expectCorrectRequest = () => {
          const params = JSON.parse(request.requestBody);
          expect(params.data.attributes['tpid']).to.eq('tptest');
          expect(params.data.attributes['tag']).to.eq('tag');
          expect(params.data.attributes['unique-id']).to.eq('unique-id');
          expect(params.data.attributes['threshold-type']).to.eq(
            '*max_balance'
          );
          expect(params.data.attributes['threshold-value']).to.eq(20);
          expect(params.data.attributes['min-sleep']).to.eq('min-sleep');
          expect(params.data.attributes['expiry-time']).to.eq('expiry-time');
          expect(params.data.attributes['activation-time']).to.eq(
            'activation-time'
          );
          expect(params.data.attributes['min-queued-items']).to.eq(33);
          expect(params.data.attributes['actions-tag']).to.eq('tag-1');
          expect(params.data.attributes['weight']).to.eq(10);
          expect(params.data.attributes['balance-tag']).to.eq('MONETARY');
          expect(params.data.attributes['balance-type']).to.eq('*monetary');
          expect(params.data.attributes['balance-categories']).to.eq(
            'balance-categories'
          );
          expect(params.data.attributes['balance-directions']).to.eq('*out');
          expect(params.data.attributes['balance-shared-groups']).to.eq(
            'balance-shared-groups'
          );
          expect(params.data.attributes['balance-rating-subject']).to.eq(
            'balance-rating-subject'
          );
          expect(params.data.attributes['balance-expiry-time']).to.eq(
            'balance-expiry-time'
          );
          expect(params.data.attributes['balance-weight']).to.eq('bw12');
          expect(params.data.attributes['balance-timing-tags']).to.eq(
            'timing-tag'
          );
          expect(params.data.attributes['balance-destination-tags']).to.eq(
            'destination-tag'
          );
          expect(params.data.attributes['recurrent']).to.eq(false);
          expect(params.data.attributes['balance-blocker']).to.eq(false);
          expect(params.data.attributes['balance-disabled']).to.eq(false);
        };
        return { data: { id: '1', type: 'tp-action-trigger' } };
      });

      await visit('/tariff-plans/1/tp-action-triggers/1/edit');
      await fillIn('[data-test-tag] input', 'tag');
      await fillIn('[data-test-unique-id] input', 'unique-id');
      await selectChoose('[data-test-select="threshold-type"]', '*max_balance');
      await fillIn('[data-test-threshold-value] input', 20);
      await fillIn('[data-test-min-sleep] input', 'min-sleep');
      await fillIn('[data-test-expiry-time] input', 'expiry-time');
      await fillIn('[data-test-activation-time] input', 'activation-time');
      await fillIn('[data-test-min-queued-items] input', 33);
      await selectSearch(
        '[data-test-select-search-to-str="actions-tag"]',
        'tag-1'
      );
      await selectChoose(
        '[data-test-select-search-to-str="actions-tag"]',
        'tag-1'
      );
      await fillIn('[data-test-weight] input', 10);
      await selectChoose('[data-test-select="balance-tag"]', 'MONETARY');
      await selectChoose('[data-test-select="balance-type"]', '*monetary');
      await selectChoose('[data-test-select="balance-directions"]', '*out');
      await fillIn(
        '[data-test-balance-categories] input',
        'balance-categories'
      );
      await fillIn(
        '[data-test-balance-shared-groups] input',
        'balance-shared-groups'
      );
      await fillIn(
        '[data-test-balance-rating-subject] input',
        'balance-rating-subject'
      );
      await fillIn(
        '[data-test-balance-expiry-time] input',
        'balance-expiry-time'
      );
      await fillIn('[data-test-balance-weight] input', 'bw12');
      await selectSearch(
        '[data-test-select-search-to-str="balance-timings-tags"]',
        'timing-tag'
      );
      await selectChoose(
        '[data-test-select-search-to-str="balance-timings-tags"]',
        'timing-tag'
      );
      await selectSearch(
        '[data-test-select-search-to-str="balance-destination-tags"]',
        'destination-tag'
      );
      await selectChoose(
        '[data-test-select-search-to-str="balance-destination-tags"]',
        'destination-tag'
      );
      await click('[data-test-recurrent] input');
      await click('[data-test-balance-blocker] input');
      await click('[data-test-balance-disabled] input');
      await click('[data-test-submit-button]');
      expectCorrectRequest();
    }));
});
