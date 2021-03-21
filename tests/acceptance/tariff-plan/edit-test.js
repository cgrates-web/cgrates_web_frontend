import { describe, it, beforeEach, context } from 'mocha';
import { expect } from 'chai';
import { setupApplicationTest } from 'ember-mocha';
import { authenticateSession } from 'ember-simple-auth/test-support';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { visit, find, fillIn, click } from '@ember/test-helpers';

describe('Acceptance: TariffPlan.Edit', function () {
  let hooks = setupApplicationTest();
  setupMirage(hooks);
  beforeEach(async function () {
    this.tp = server.create('tariff-plan');
    const user = server.create('user');
    await authenticateSession({ email: 'user@example.com', user_id: user.id });
  });

  describe('fill form with correct data and submit', () =>
    it('sends correct data to the backend', async function () {
      let counter = 0;
      server.patch('/tariff-plans/:id', (schema, request) => {
        counter = counter + 1;
        const params = JSON.parse(request.requestBody);
        expect(params.data.attributes.name).to.eq('New Tariff');
        expect(params.data.attributes.alias).to.eq('new_tariff');
        expect(params.data.attributes.description).to.eq('description');
        return { data: { id: this.tp.id, type: 'tariff-plans' } };
      });

      await visit('/tariff-plans');
      await click('[data-test-edit-tp-plan]');
      await fillIn('[data-test-name] input', 'New Tariff');
      await fillIn('[data-test-alias] input', 'new_tariff');
      await fillIn('[data-test-description] input', 'description');
      await click('[data-test-submit-button]');
      expect(counter).to.eq(1);
    }));

  describe('fill form with incorrect data and submit', function () {
    context('request', function () {
      it('does not send request', async function () {
        let expectRequest = false;
        server.patch('/tariff-plans/:id', function () {
          expectRequest = true;
        });
        await visit('/tariff-plans');
        await click('[data-test-edit-tp-plan]');
        await fillIn('[data-test-name] input', '');
        await fillIn('[data-test-alias] input', '');
        await fillIn('[data-test-description] input', '');
        await click('[data-test-submit-button]');
        expect(expectRequest).to.be.false;
      });
    });
    context('validation', function () {
      beforeEach(async function () {
        await visit('/tariff-plans');
        await click('[data-test-edit-tp-plan]');
        await fillIn('[data-test-name] input', '');
        await fillIn('[data-test-alias] input', '');
        await fillIn('[data-test-description] input', '');
        await click('[data-test-submit-button]');
      });

      it('displays name error', async function () {
        expect(find('[data-test-name] input')).to.have.class('is-invalid');
        expect(find('[data-test-name] .invalid-feedback')).to.have.class(
          'd-block'
        );
      });
      it('displays alias error', async function () {
        expect(find('[data-test-alias] input')).to.have.class('is-invalid');
        expect(find('[data-test-alias] .invalid-feedback')).to.have.class(
          'd-block'
        );
      });
      it('displays description error', async function () {
        expect(find('[data-test-description] input')).to.have.class(
          'is-invalid'
        );
        expect(find('[data-test-description] .invalid-feedback')).to.have.class(
          'd-block'
        );
      });
    });
  });
});
