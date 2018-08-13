import { describe, it, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import startApp from 'cgrates-web-frontend/tests/helpers/start-app';
import destroyApp from 'cgrates-web-frontend/tests/helpers/destroy-app';
import { authenticateSession } from 'cgrates-web-frontend/tests/helpers/ember-simple-auth';

describe("Acceptance: User.Index", function() {
  beforeEach(function() {
    this.App = startApp();
    this.user = server.create('user', {email: 'test@example.com'});
    authenticateSession(this.App, {email: "user@example.com"});
  });

  afterEach(function () {
    destroyApp(this.App);
  });

  describe('basic rendering', () =>
    it('renders specific header', function() {
      visit('/users');
      click("table tbody tr:first-child td a:contains('test@example.com')");
      return andThen(() => expect(find('section.page-header h1').text()).to.eq('User: test@example.com'));
    })
  );

  return describe('click edit button', () =>
    it('redirects to user edit page', function() {
      visit('/users');
      click("table tbody tr:first-child td a:contains('test@example.com')");
      click('.fixed-action-btn a');
      return andThen(() => expect(currentPath()).to.equal('users.user.edit'));
    })
  );
});
