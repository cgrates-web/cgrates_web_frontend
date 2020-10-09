import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';
import { setupApplicationTest } from 'ember-mocha';
import { authenticateSession } from 'ember-simple-auth/test-support';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { visit, click, find, findAll, fillIn } from '@ember/test-helpers';

describe('Acceptance: NewDestination', function () {
  let hooks = setupApplicationTest();
  setupMirage(hooks);

  beforeEach(async function () {
    await authenticateSession({ email: 'user@exmple.com' });
  });

  describe('go away without save', () =>
    it('removes not saved destination', async function () {
      await visit('/realtime/destinations/new');
      await click('[data-test-destinations-link]');
      expect(findAll('table tbody tr').length).to.eq(0);
    }));

  describe('visit /realtime/destinations/new', () =>
    it('renders destination form', async function () {
      await visit('/realtime/destinations/new');
      expect(findAll('form input').length).to.eq(2);
    }));

  describe('submit empty form', function () {
    beforeEach(async function () {
      await visit('/realtime/destinations/new');
      await click('[data-test-submit-button]');
    });
    it('displays id error', async function () {
      expect(find('[data-test-id] input')).to.have.class('is-invalid');
      expect(find('[data-test-id] .invalid-feedback')).to.have.class('d-block');
    });
    it('displays prefixes error', async function () {
      expect(find('[data-test-prefixes] input')).to.have.class('is-invalid');
      expect(find('[data-test-prefixes] .invalid-feedback')).to.have.class(
        'd-block'
      );
    });
  });

  describe('fill in and submit form', () =>
    it('saves new destination', async function () {
      let counter = 0;

      server.post('/destinations/', function (schema, request) {
        counter = counter + 1;
        const params = JSON.parse(request.requestBody);
        expect(params.data.id).to.eq('DST_RU');
        expect(params.data.attributes.prefixes.length).to.eq(2);
        return { data: { id: 'DST_RU', type: 'destinations' } };
      });

      await visit('/realtime/destinations/new');
      await fillIn('[data-test-id] input', 'DST_RU');
      await fillIn('[data-test-prefixes] input', '+7913, +7923');
      await click('[data-test-submit-button]');
      expect(counter).to.eq(1);
    }));
});
