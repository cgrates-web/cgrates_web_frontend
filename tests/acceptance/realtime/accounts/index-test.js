import { describe, it, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import startApp from 'cgrates-web-frontend/tests/helpers/start-app';
import destroyApp from 'cgrates-web-frontend/tests/helpers/destroy-app';
import { authenticateSession } from 'cgrates-web-frontend/tests/helpers/ember-simple-auth';

describe("Acceptance: Accounts.Index", function() {
  beforeEach(function() {
    this.App = startApp();
    server.createList('account', 2);
    authenticateSession(this.App, {email: "user@example.com"});
  });

  afterEach(function () {
    destroyApp(this.App);
  });

  describe('visit /realtime/accounts', () =>
    it('renders table with accounts sorted by id', function() {
      visit('/realtime/accounts');
      return andThen(function() {
        expect(find('section.page-header h1').text()).to.eq('Accounts');
        expect(find('table tbody tr').length).to.eq(2);
        return expect(find('table tbody tr:first-child td:first-child').text()).to.eq('1');
      });
    })
  );

  describe('select account', () =>
    it('reditects to account page', function() {
      visit('/realtime/accounts');
      click('table tbody tr:first-child td:first-child a');
      return andThen(() => expect(currentPath()).to.equal('realtime.accounts.account.index'));
    })
  );

  describe('click remove button', () =>
    it('removes account', function() {
      visit('/realtime/accounts');
      click('table tbody tr:first-child a.remove');
      return andThen(() => expect(find('table tbody tr').length).to.eq(1));
    })
  );

  describe('click add button', () =>
    it('redirects to new account page', function() {
      visit('/realtime/accounts');
      click('.fixed-action-btn a');
      return andThen(() => expect(currentPath()).to.equal('realtime.accounts.new'));
    })
  );

  return describe('click pagination link', () =>
    it('makes a correct pagination query', function() {
      let counter = 0;

      server.get('/accounts/', function(schema, request) {
        counter = counter + 1;
        const page = request.queryParams['page'];
        const perPage = request.queryParams['per_page'];
        switch (counter) {
          case 1:
            expect(page).to.eq('1');
            expect(perPage).to.eq('10');
            break;
          default:
            expect(page).to.eq('2');
            expect(perPage).to.eq('10');
        }
        return { data: [{id: '1', type: 'account'}] };
      });

      visit('/realtime/accounts');
      click('ul.pagination li:last-child a');
      return andThen(() => expect(counter).to.eq(2));
    })
  );
});
