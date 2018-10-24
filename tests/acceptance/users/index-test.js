import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';
import { setupApplicationTest } from 'ember-mocha';
import { authenticateSession } from 'ember-simple-auth/test-support';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { visit, find, findAll, click, currentRouteName } from '@ember/test-helpers';

describe('Acceptance: Users.Index', function () {
  let hooks = setupApplicationTest();
  setupMirage(hooks);

  beforeEach(async function () {
    this.users = server.createList('user', 2);
    await authenticateSession({email: 'user@example.com'});
  });

  describe('visit /users', function () {
    beforeEach(async function () {
      await visit('/users');
    });
    it('renders table with 2 users', async function () {
      expect(findAll('table tbody tr').length).to.eq(2);
    });
    it('renders table with users sorted by id', function () {
      expect(find('table tbody tr:first-child td:first-child').textContent.trim()).to.eq('1');
    });
    it('renders correct page header', async function () {
      expect(find('.page-header h1').textContent.trim()).to.eq('Users');
    });
  });

  describe('select user', () =>
    it('reditects to user page', async function () {
      await visit('/users');
      await click('table tbody tr:first-child td:first-child a');
      expect(currentRouteName()).to.equal('user.index');
    })
  );

  describe('click edit button', () =>
    it('reditects to edit user page', async function () {
      await visit('/users');
      await click('[data-test-user-edit]');
      expect(currentRouteName()).to.equal('user.edit');
    })
  );

  describe('click remove button', () =>
    it('removes user', async function () {
      await visit('/users');
      await click('[data-test-user-remove]');
      expect(findAll('table tbody tr').length).to.eq(1);
    })
  );

  return describe('click add button', () =>
    it('redirects to new user page', async function () {
      await visit('/users');
      await click('[data-test-user-add]');
      expect(currentRouteName()).to.equal('users.new');
    })
  );
});
