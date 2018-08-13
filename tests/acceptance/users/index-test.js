import { describe, it, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import startApp from 'cgrates-web-frontend/tests/helpers/start-app';
import destroyApp from 'cgrates-web-frontend/tests/helpers/destroy-app';
import { authenticateSession } from 'cgrates-web-frontend/tests/helpers/ember-simple-auth';

describe("Acceptance: Users.Index", function() {
  beforeEach(function() {
    this.App = startApp();
    this.users = server.createList('user', 2);
    authenticateSession(this.App, {email: "user@example.com"});
  });

  afterEach(function () {
    destroyApp(this.App);
  });

  describe('visit /users', () =>
    it("renders table with users sorted by id", function() {
      visit("/users");
      return andThen(function() {
        expect(find('section.page-header h1').text()).to.eq('Users');
        expect(find('table tbody tr').length).to.eq(2);
        return expect(find('table tbody tr:first-child td:first-child').text()).to.eq('1');
      });
    })
  );

  describe('select user', () =>
    it('reditects to user page', function() {
      visit('/users');
      click('table tbody tr:first-child td:first-child a');
      return andThen(() => expect(currentPath()).to.equal("users.user.index"));
    })
  );

  describe('click edit button', () =>
    it('reditects to edit user page', function() {
      visit('/users');
      click('table tbody tr:first-child a.edit');
      return andThen(() => expect(currentPath()).to.equal('users.user.edit'));
    })
  );

  describe('click remove button', () =>
    it('removes user', function() {
      visit("/users");
      click('table tbody tr:first-child a.remove');
      return andThen(() => expect(find('table tbody tr').length).to.eq(1));
    })
  );

  return describe('click add button', () =>
    it('redirects to new user page', function() {
      visit('/users');
      click('.fixed-action-btn a');
      return andThen(() => expect(currentPath()).to.equal('users.new'));
    })
  );
});
