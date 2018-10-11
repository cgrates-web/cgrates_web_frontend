import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';
import { setupApplicationTest } from 'ember-mocha';
import { authenticateSession } from 'ember-simple-auth/test-support';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { visit, click, find, currentRouteName } from '@ember/test-helpers';

describe("Acceptance: Account.Index", function() {
  let hooks = setupApplicationTest();
  setupMirage(hooks);

  beforeEach(async function() {
    this.account = server.create('account', {id: 'test'});
    await authenticateSession({email: "user@example.com"});
  });

  describe('basic rendering', () =>
    it('renders specific header', async function() {
      await visit('/realtime/accounts/test');
      expect(find('main h2').textContent).to.eq('Account: test');
    })
  );

  describe('click add balance button', () =>
    it('redirects to add balance page', async function() {
      await visit('/realtime/accounts/test');
      await click('[data-test-account-blabce-add]');
      expect(currentRouteName()).to.equal('realtime.accounts.account.add-balance');
    })
  );
});
