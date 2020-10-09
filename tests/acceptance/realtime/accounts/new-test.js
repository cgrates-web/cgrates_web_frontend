import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';
import { setupApplicationTest } from 'ember-mocha';
import { authenticateSession } from 'ember-simple-auth/test-support';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { visit, click, find, findAll, fillIn } from '@ember/test-helpers';

describe('Acceptance: Accounts.New', function () {
  let hooks = setupApplicationTest();
  setupMirage(hooks);

  beforeEach(async function () {
    await authenticateSession({ email: 'user@eaxmple.com' });
  });

  describe('visit /realtime/accounts/new', () =>
    it('renders account form', async function () {
      await visit('/realtime/accounts/new');
      expect(findAll('form input').length).to.eq(3);
    }));

  describe('go away without save', () =>
    it('removes not saved account', async function () {
      await visit('/realtime/accounts/new');
      await click('[data-test-accounts-link]');
      expect(findAll('table tbody tr').length).to.eq(0);
    }));

  describe('submit empty form', function () {
    it('displays id error', async function () {
      await visit('/realtime/accounts/new');
      await click('[data-test-submit-button]');
      expect(find('[data-test-id] input')).to.have.class('is-invalid');
      expect(find('[data-test-id] .invalid-feedback')).to.have.class('d-block');
    });
  });

  describe('fill form with correct data and submit', () =>
    it('saves new account with correct data', async function () {
      let counter = 0;

      server.post('/accounts/', function (schema, request) {
        counter = counter + 1;
        const params = JSON.parse(request.requestBody);
        expect(params.data.id).to.eq('test');
        expect(params.data.attributes['allow-negative']).to.eq(true);
        expect(params.data.attributes['disabled']).to.eq(true);
        return { data: { id: 'test', type: 'account' } };
      });

      await visit('/realtime/accounts/new');
      await fillIn('[data-test-id] input', 'test');
      await click('[data-test-disabled] input');
      await click('[data-test-allow-negative] input');
      await click('[data-test-submit-button]');
      expect(counter).to.eq(1);
    }));
});
