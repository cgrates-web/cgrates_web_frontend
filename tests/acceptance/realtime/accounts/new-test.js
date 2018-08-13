import { describe, it, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import startApp from 'cgrates-web-frontend/tests/helpers/start-app';
import destroyApp from 'cgrates-web-frontend/tests/helpers/destroy-app';
import { authenticateSession } from 'cgrates-web-frontend/tests/helpers/ember-simple-auth';

describe("Acceptance: Accounts.New", function() {
  beforeEach(function() {
    this.App = startApp();
    authenticateSession(this.App, {email: "user@eaxmple.com"});
  });

  afterEach(function () {
    destroyApp(this.App);
  });

  describe('visit /realtime/accounts/new', () =>
    it('renders account form', function() {
      visit('/realtime/accounts/new');
      return andThen(() => expect(find('form input').length).to.eq(3));
    })
  );

  describe('go away without save', () =>
    it('removes not saved account', function() {
      visit('/realtime/accounts');
      click('.fixed-action-btn a');
      click("ul#slide-out li a:contains('Accounts')");
      return andThen(() => expect(find('table tbody tr').length).to.eq(0));
    })
  );

  describe('fill form with incorrect data and submit', () =>
    it('does not submit data', function() {
      visit('/realtime/accounts/new');
      return andThen(function() {
        fillIn(`#${find("label:contains('ID')").attr('for')}`, '');
        click('button[type="submit"]');
        return andThen(function() {
          expect(find(`#${find("label:contains('ID')").attr('for')}`).length).to.eq(1);
          expect(find(`#${find("label:contains('Allow negative')").attr('for')}`).length).to.eq(1);
          return expect(find(`#${find("label:contains('Disabled')").attr('for')}`).length).to.eq(1);
        });
      });
    })
  );

  return describe('fill form with correct data and submit', () =>
    it('saves new account with correct data', function() {
      let counter = 0;

      server.post('/accounts/', function(schema, request) {
        counter = counter + 1;
        const params = JSON.parse(request.requestBody);
        expect(params.data.id).to.eq('test');
        expect(params.data.attributes['allow-negative']).to.eq(true);
        expect(params.data.attributes['disabled']).to.eq(true);
        return { data: {id: 'test', type: 'account'} };
      });

      visit('/realtime/accounts/new');
      return andThen(function() {
        fillIn(`#${find("label:contains('ID')").attr('for')}`, 'test');
        click(`#${find("label:contains('Allow negative')").attr('for')}`);
        click(`#${find("label:contains('Disabled')").attr('for')}`);
        click('button[type="submit"]');
        return andThen(() => expect(counter).to.eq(1));
      });
    })
  );
});
