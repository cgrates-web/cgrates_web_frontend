import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';
import { setupApplicationTest } from 'ember-mocha';
import { authenticateSession } from 'ember-simple-auth/test-support';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { visit, click, findAll, fillIn } from '@ember/test-helpers';

describe('Acceptance: Account.AddBalance', function () {
  let hooks = setupApplicationTest();
  setupMirage(hooks);

  beforeEach(async function () {
    this.account = server.create('account', { id: 'test' });
    await authenticateSession({ email: 'user@eaxmple.com' });
  });

  describe('visit /realtime/accounts/:id/add-balance', () =>
    it('renders add balance form', async function () {
      await visit('/realtime/accounts/test/add-balance');
      expect(findAll('form input').length).to.eq(15);
    }));

  describe('fill form with correct data and submit', () =>
    it('submits correct data', async function () {
      let counter = 0;

      server.post('/add-balance/', function (schema, request) {
        counter = counter + 1;
        const params = JSON.parse(request.requestBody);
        expect(params.data.attributes['account']).to.eq('test');
        expect(params.data.attributes['value']).to.eq(100);
        return { data: { id: '1', type: 'add-balance' } };
      });

      await visit('/realtime/accounts/test/add-balance');
      await fillIn('[data-test-balance-type] input', '*monetary');
      await fillIn('[data-test-directions] input', '*out');
      await fillIn('[data-test-value] input', '100');
      await fillIn('[data-test-weight] input', '10');
      await fillIn(
        '[data-test-balance-uuid] input',
        '11111111-2222-3333-4444-555555555555'
      );
      await fillIn('[data-test-balance-id] input', 'balancetest');
      await fillIn('[data-test-expiry-time] input', '0001-01-01T00:00:00Z');
      await fillIn('[data-test-rating-subject] input', 'ratingsubject');
      await fillIn('[data-test-categories] input', 'category1, category2');
      await fillIn(
        '[data-test-destination-ids] input',
        'destination1, destination2'
      );
      await fillIn('[ data-test-timing-ids] input', 'timing1, timing2');
      await fillIn('[data-test-shared-groups] input', 'group1, group2');
      await click('[data-test-overwrite] input');
      await click('[data-test-blocker] input');
      await click('[data-test-disabled] input');
      await click('[data-test-submit-button]');
      expect(counter).to.eq(1);
    }));
});
