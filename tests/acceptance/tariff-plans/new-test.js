import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';
import { setupApplicationTest } from 'ember-mocha';
import { authenticateSession } from 'ember-simple-auth/test-support';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { visit, find, findAll, fillIn, click } from '@ember/test-helpers';

describe('Acceptance: TariffPlans.New', function () {
  let hooks = setupApplicationTest();
  setupMirage(hooks);

  beforeEach(async function () {
    await authenticateSession({email: 'user@exmple.com'});
  });

  describe('go away without save', () =>
    it('removes not saved destination', async function () {
      await visit('/tariff-plans');
      await click('[data-test-add-tp-plan]');
      await click('[data-test-tariff-paln-link]');
      expect(findAll('[data-test-tarif-plan-card]').length).to.eq(0);
    })
  );

  describe('fill form with correct data and submit', () =>
    it('sends correct data to the backend', async function () {
      let counter = 0;

      server.post('/tariff-plans/', function (schema, request) {
        counter = counter + 1;
        const params = JSON.parse(request.requestBody);
        expect(params.data.attributes.name).to.eq('New tariff name');
        expect(params.data.attributes.alias).to.eq('New tariff alias');
        expect(params.data.attributes.description).to.eq('New tariff description');
        return { data: {id: '1', type: 'tariff-plans'} };
      });

      await visit('tariff-plans/new');
      await fillIn('[data-test-name] input', 'New tariff name');
      await fillIn('[data-test-alias] input', 'New tariff alias');
      await fillIn('[data-test-description] input', 'New tariff description');
      await click('[data-test-submit-button]');
      expect(counter).to.eq(1);
    })
  );

  describe('fill form with incorrect data and submit', function () {
    beforeEach(async function () {
      await visit('tariff-plans/new');
      await click('[data-test-submit-button]');
    });
    it('does not send request', async function () {
      let expectRequest = false;
      server.post('/tariff-plans/', function () {
        expectRequest = true;
      });
      expect(expectRequest).to.be.false;
    });
    it('displays name error', async function () {
      expect(find('[data-test-name] input')).to.have.class('is-invalid');
      expect(find('[data-test-name] .invalid-feedback')).to.have.class('d-block');
    });
    it('displays alias error', async function () {
      expect(find('[data-test-alias] input')).to.have.class('is-invalid');
      expect(find('[data-test-alias] .invalid-feedback')).to.have.class('d-block');
    });
    it('displays description error', async function () {
      expect(find('[data-test-description] input')).to.have.class('is-invalid');
      expect(find('[data-test-description] .invalid-feedback')).to.have.class('d-block');
    });
  });
});
