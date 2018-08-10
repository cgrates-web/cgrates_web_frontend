import { describe, it, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import startApp from 'cgrates-web-frontend/tests/helpers/start-app';
import destroyApp from 'cgrates-web-frontend/tests/helpers/destroy-app';
import { authenticateSession } from 'cgrates-web-frontend/tests/helpers/ember-simple-auth';

describe("Acceptance: Destinations", function() {
  beforeEach(function() {
    this.App = startApp();
    server.createList('destination', 2);
    authenticateSession(this.App, {email: "user@exmple.com"});
  });

  afterEach(function () {
    destroyApp(this.App);
  });

  it("renders table with destinations sorted by id", function() {
    visit("/realtime/destinations");
    return andThen(function() {
      expect(find('section.page-header h1').text()).to.eq('Destinations');
      expect(find('table tbody tr').length).to.eq(2);
      return expect(find('table tbody tr:first-child td:first-child').text()).to.eq('1');
    });
  });

  return describe('click on remove btn', () =>
    it('removes destination', function() {
      visit("/realtime/destinations");
      click('table tbody tr:first-child a.remove');
      return andThen(() => expect(find('table tbody tr').length).to.eq(1));
    })
  );
});
