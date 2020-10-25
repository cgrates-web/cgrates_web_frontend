import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';
import { setupApplicationTest } from 'ember-mocha';
import { authenticateSession } from 'ember-simple-auth/test-support';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { visit, find, click, fillIn } from '@ember/test-helpers';

describe('Acceptance: User.Edit', function () {
  let hooks = setupApplicationTest();
  setupMirage(hooks);

  beforeEach(async function () {
    this.user = server.create('user', { id: '1' });
    await authenticateSession({ email: 'user@example.com' });
  });

  describe('fill form with incorrect data and submit', () =>
    it('sets invalid class for inputs', async function () {
      await visit('/users/1/edit');
      await fillIn('[data-test-email] input', '');
      await click('[data-test-submit-button]');
      expect(find('[data-test-email] input')).to.have.class('is-invalid');
      expect(find('[data-test-email] .invalid-feedback')).to.have.class(
        'd-block'
      );
    }));

  return describe('fill form with correct data and submit', () =>
    it('sends correct data to the backend', async function () {
      let counter = 0;

      server.patch('/users/:id', (schema, request) => {
        counter = counter + 1;
        const params = JSON.parse(request.requestBody);
        expect(params.data.attributes.email).to.eq('edited@example.com');
        return { data: { id: this.user.id, type: 'user' } };
      });

      await visit('/users/1/edit');
      await fillIn('[data-test-email] input', 'edited@example.com');
      await click('[data-test-submit-button]');
      expect(counter).to.eq(1);
    }));
});
