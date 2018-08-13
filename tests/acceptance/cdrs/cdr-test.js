
import { expect } from 'chai';
import { describe, it, beforeEach, afterEach } from 'mocha';
import startApp from 'cgrates-web-frontend/tests/helpers/start-app';
import destroyApp from 'cgrates-web-frontend/tests/helpers/destroy-app';
import { authenticateSession } from 'cgrates-web-frontend/tests/helpers/ember-simple-auth';

describe("Acceptance: Cdr.Index", function() {
  beforeEach(function() {
    this.App = startApp();
    this.cdr = server.create('cdr', {id: 777});
    authenticateSession(this.App, {email: "user@example.com"});
  });

  afterEach(function () {
    destroyApp(this.App);
  });

  return describe('basic rendering', () =>
    it('renders specific header', function() {
      visit('/cdrs');
      click("table tbody tr:first-child td a:contains('777')");
      return andThen(() => expect(find('section.page-header h1').text()).to.eq('CDR: 777'));
    })
  );
});
