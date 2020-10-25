import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';
import { setupApplicationTest } from 'ember-mocha';
import { authenticateSession } from 'ember-simple-auth/test-support';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import {
  visit,
  click,
  find,
  findAll,
  currentRouteName,
} from '@ember/test-helpers';

describe('Acceptance: Accounts.Index', function () {
  let hooks = setupApplicationTest();
  setupMirage(hooks);

  beforeEach(async function () {
    server.create('account', { id: '2' });
    server.create('account', { id: '1' });
    await authenticateSession({ email: 'user@example.com' });
  });

  describe('visit /realtime/accounts', function () {
    it('renders table with 2 account', async function () {
      await visit('/realtime/accounts');
      expect(findAll('table tbody tr').length).to.eq(2);
    });
    it('renders table with accounts sorted by id', async function () {
      await visit('/realtime/accounts');
      expect(
        find('table tbody tr:first-child td:first-child').textContent.trim()
      ).to.eq('1');
    });
    it('renders page header', async function () {
      await visit('/realtime/accounts');
      expect(find('.page-header h1').textContent.trim()).to.eq('Accounts');
    });
  });

  describe('select account', () =>
    it('reditects to account page', async function () {
      await visit('/realtime/accounts');
      await click('table tbody tr:first-child td:first-child a');
      expect(currentRouteName()).to.equal('realtime.accounts.account.index');
    }));

  describe('click remove button', () =>
    it('removes account', async function () {
      await visit('/realtime/accounts');
      await click('[data-test-account-remove]');
      expect(findAll('table tbody tr').length).to.eq(1);
    }));

  describe('click add button', () =>
    it('redirects to new account page', async function () {
      await visit('/realtime/accounts');
      await click('[data-test-account-add]');
      expect(currentRouteName()).to.equal('realtime.accounts.new');
    }));

  return describe('click pagination link', () =>
    it('makes a correct pagination query', async function () {
      let counter = 0;

      server.get('/accounts/', function (schema, request) {
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
        return { data: [{ id: '1', type: 'account' }] };
      });

      await visit('/realtime/accounts');
      await click('[data-test-pagination-forward]');
      expect(counter).to.eq(2);
    }));
});
