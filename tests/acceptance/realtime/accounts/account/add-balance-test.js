import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';
import { setupApplicationTest } from 'ember-mocha';
import { authenticateSession } from 'ember-simple-auth/test-support';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { visit, click, fillIn } from '@ember/test-helpers';

describe('Acceptance: Account.AddBalance', function () {
  let hooks = setupApplicationTest();
  setupMirage(hooks);

  beforeEach(async function () {
    this.account = server.create('account', { id: 'test' });
    const user = server.create('user');
    await authenticateSession({ email: 'user@example.com', user_id: user.id });
  });
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
      await fillIn('[data-test-value] input', '100');
      await click('[data-test-submit-button]');
      expect(counter).to.eq(1);
    }));
});
