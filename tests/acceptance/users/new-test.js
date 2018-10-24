import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';
import { setupApplicationTest } from 'ember-mocha';
import { authenticateSession } from 'ember-simple-auth/test-support';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { visit, find, click, findAll, fillIn } from '@ember/test-helpers';

describe('Acceptance: Users.New', function () {
  let hooks = setupApplicationTest();
  setupMirage(hooks);

  beforeEach(async function () {
    await authenticateSession({email: 'user@example.com'});
  });

  describe('visit /users/new', () =>
    it('renders user form', async function () {
      await visit('/users/new');
      expect(findAll('form input').length).to.eq(2);
    })
  );

  describe('go away without save', () =>
    it('removes not saved user', async function () {
      await visit('/users/new');
      await click('[data-test-users-link]');
      expect(findAll('table tbody tr').length).to.eq(0);
    })
  );

  describe('fill form with incorrect data and submit', function () {
    beforeEach(async function () {
      await visit('users/new');
      await fillIn('[data-test-email] input', 'not.an.email');
      await fillIn('[data-test-password] input', '');
      await click('[data-test-submit-button]');
    });
    it('displays email error', async function () {
      expect(find('[data-test-email] input')).to.have.class('is-invalid');
      expect(find('[data-test-email] .invalid-feedback')).to.have.class('d-block');
    });
    it('displays password error', async function () {
      expect(find('[data-test-password] input')).to.have.class('is-invalid');
      expect(find('[data-test-password] .invalid-feedback')).to.have.class('d-block');
    });
  });

  return describe('fill form with correct data and submit', () =>
    it('saves new user with correct data', async function () {
      let counter = 0;

      server.post('/users/', function (schema, request) {
        counter = counter + 1;
        const params = JSON.parse(request.requestBody);
        expect(params.data.attributes.email).to.eq('test@example.com');
        return { data: {id: '1', type: 'user'} };
      });

      await visit('users/new');
      await fillIn('[data-test-email] input', 'test@example.com');
      await fillIn('[data-test-password] input', 'secret');
      await click('[data-test-submit-button]');
      expect(counter).to.eq(1);
    })
  );
});
