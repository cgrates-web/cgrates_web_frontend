import { describe, it, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import startApp from 'cgrates-web-frontend/tests/helpers/start-app';
import destroyApp from 'cgrates-web-frontend/tests/helpers/destroy-app';
import { authenticateSession } from 'cgrates-web-frontend/tests/helpers/ember-simple-auth';

describe("Acceptance: Account.Index", function() {
  beforeEach(function() {
    this.App = startApp();
    this.account = server.create('account', {id: 'test'});
    authenticateSession(this.App, {email: "user@example.com"});
  });

  afterEach(function () {
    destroyApp(this.App);
  });

  describe('basic rendering', () =>
    it('renders specific header', function() {
      visit('/realtime/accounts');
      click("table tbody tr:first-child td a:contains('test')");
      return andThen(() => expect(find('main h2').text()).to.eq('Account: test'));
    })
  );

  return describe('click add balance button', () =>
    it('redirects to add balance page', function() {
      visit('/realtime/accounts');
      click("table tbody tr:first-child td a:contains('test')");
      click("a:contains('Add balance')");
      return andThen(() => expect(currentPath()).to.equal('realtime.accounts.account.add-balance'));
    })
  );
});
