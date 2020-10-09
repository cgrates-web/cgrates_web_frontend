import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';
import { setupApplicationTest } from 'ember-mocha';
import { authenticateSession } from 'ember-simple-auth/test-support';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { visit, find, findAll, click, fillIn } from '@ember/test-helpers';

describe('Acceptance: TpAliases.New', function () {
  let hooks = setupApplicationTest();
  setupMirage(hooks);

  beforeEach(async function () {
    this.tariffPlan = server.create('tariff-plan', {
      id: '1',
      name: 'Test',
      alias: 'tptest',
    });
    await authenticateSession({ email: 'user@example.com' });
  });

  describe('visit /tariff-plans/1/tp-aliases/new', () =>
    it('renders tp-alias form', async function () {
      await visit('/tariff-plans/1/tp-aliases/new');
      expect(findAll('form input').length).to.eq(11);
    }));

  describe('go away without save', () =>
    it('removes not saved tp-alias', async function () {
      await visit('/tariff-plans/1/tp-aliases/new');
      await click('[data-test-tp-aliases-link]');
      expect(findAll('table tbody tr').length).to.eq(0);
    }));

  describe('submit empty form', function () {
    beforeEach(async function () {
      await visit('/tariff-plans/1/tp-aliases/new');
      await click('[data-test-submit-button]');
    });
    it('displays tenant error', async function () {
      expect(find('[data-test-tenant] input')).to.have.class('is-invalid');
      expect(find('[data-test-tenant] .invalid-feedback')).to.have.class(
        'd-block'
      );
    });
    it('displays direction error', async function () {
      expect(find('[data-test-direction] input')).to.have.class('is-invalid');
      expect(find('[data-test-direction] .invalid-feedback')).to.have.class(
        'd-block'
      );
    });
    it('displays category error', async function () {
      expect(find('[data-test-category] input')).to.have.class('is-invalid');
      expect(find('[data-test-category] .invalid-feedback')).to.have.class(
        'd-block'
      );
    });
    it('displays account error', async function () {
      expect(find('[data-test-account] input')).to.have.class('is-invalid');
      expect(find('[data-test-account] .invalid-feedback')).to.have.class(
        'd-block'
      );
    });
    it('displays subject error', async function () {
      expect(find('[data-test-subject] input')).to.have.class('is-invalid');
      expect(find('[data-test-subject] .invalid-feedback')).to.have.class(
        'd-block'
      );
    });
    it('displays destination-id error', async function () {
      expect(find('[data-test-destination-id] input')).to.have.class(
        'is-invalid'
      );
      expect(
        find('[data-test-destination-id] .invalid-feedback')
      ).to.have.class('d-block');
    });
    it('displays context error', async function () {
      expect(find('[data-test-context] input')).to.have.class('is-invalid');
      expect(find('[data-test-context] .invalid-feedback')).to.have.class(
        'd-block'
      );
    });
    it('displays target error', async function () {
      expect(find('[data-test-target] input')).to.have.class('is-invalid');
      expect(find('[data-test-target] .invalid-feedback')).to.have.class(
        'd-block'
      );
    });
    it('displays original error', async function () {
      expect(find('[data-test-original] input')).to.have.class('is-invalid');
      expect(find('[data-test-original] .invalid-feedback')).to.have.class(
        'd-block'
      );
    });
    it('displays alias error', async function () {
      expect(find('[data-test-alias] input')).to.have.class('is-invalid');
      expect(find('[data-test-alias] .invalid-feedback')).to.have.class(
        'd-block'
      );
    });
    it('displays weight error', async function () {
      expect(find('[data-test-weight] input')).to.have.class('is-invalid');
      expect(find('[data-test-weight] .invalid-feedback')).to.have.class(
        'd-block'
      );
    });
  });

  describe('fill form with correct data and submit', () =>
    it('sends correct data to the backend', async function () {
      let expectCorrectRequest = () => expect(true).to.be.false;
      server.post('/tp-aliases', function (schema, request) {
        expectCorrectRequest = () => {
          const params = JSON.parse(request.requestBody);
          expect(params.data.attributes['tpid']).to.eq('tptest');
          expect(params.data.attributes['direction']).to.eq('direction');
          expect(params.data.attributes['category']).to.eq('category');
          expect(params.data.attributes['account']).to.eq('account');
          expect(params.data.attributes['subject']).to.eq('subject');
          expect(params.data.attributes['destination-id']).to.eq(
            'destination_id'
          );
          expect(params.data.attributes['context']).to.eq('context');
          expect(params.data.attributes['target']).to.eq('target');
          expect(params.data.attributes['original']).to.eq('original');
          expect(params.data.attributes['alias']).to.eq('alias');
          expect(params.data.attributes['weight']).to.eq(10);
        };
        return { data: { id: '1', type: 'tp-alias' } };
      });

      await visit('/tariff-plans/1/tp-aliases/new');
      await fillIn('[data-test-tenant] input', 'tenant');
      await fillIn('[data-test-direction] input', 'direction');
      await fillIn('[data-test-category] input', 'category');
      await fillIn('[data-test-account] input', 'account');
      await fillIn('[data-test-subject] input', 'subject');
      await fillIn('[data-test-destination-id] input', 'destination_id');
      await fillIn('[data-test-context] input', 'context');
      await fillIn('[data-test-target] input', 'target');
      await fillIn('[data-test-original] input', 'original');
      await fillIn('[data-test-alias] input', 'alias');
      await fillIn('[data-test-weight] input', 10);
      await click('[data-test-submit-button]');
      expectCorrectRequest();
    }));
});
