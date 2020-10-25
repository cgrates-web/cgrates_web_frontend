import { describe, it, beforeEach, context } from 'mocha';
import { expect } from 'chai';
import { setupApplicationTest } from 'ember-mocha';
import { authenticateSession } from 'ember-simple-auth/test-support';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { visit, find, findAll, click, fillIn } from '@ember/test-helpers';
import { selectChoose } from 'ember-power-select/test-support/helpers';

describe('Acceptance: TpFilter.New', function () {
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

  describe('visit /tariff-plans/1/tp-filters/new', () =>
    it('renders tp-filter form', async function () {
      await visit('/tariff-plans/1/tp-filters/new');
      expect(findAll('form input').length).to.eq(5);
    }));

  describe('go away without save', () =>
    it('removes not saved tp-filter', async function () {
      await visit('/tariff-plans/1/tp-filters/new');
      await click('[ data-test-filters-link]');
      expect(findAll('table tbody tr').length).to.eq(0);
    }));

  describe('submit empty form', function () {
    context('request', function () {
      it('does not submit data', async function () {
        let counter = 0;
        server.post('/tp-filters/', function () {
          counter = counter + 1;
          return {};
        });
        await visit('/tariff-plans/1/tp-filters/new');
        await click('[data-test-submit-button]');
        expect(counter).to.eq(0);
      });
    });
    context('validation', function () {
      beforeEach(async function () {
        await visit('/tariff-plans/1/tp-filters/new');
        await click('[data-test-submit-button]');
      });
      it('displays tenant error', function () {
        expect(find('[data-test-tenant] input')).to.have.class('is-invalid');
        expect(find('[data-test-tenant] .invalid-feedback')).to.have.class(
          'd-block'
        );
      });
      it('displays custom-id error', function () {
        expect(find('[data-test-custom-id] input')).to.have.class('is-invalid');
        expect(find('[data-test-custom-id] .invalid-feedback')).to.have.class(
          'd-block'
        );
      });
      it('does not displays filter-field-name error', function () {
        expect(find('[data-test-filter-field-name] input')).not.to.have.class(
          'is-invalid'
        );
        expect(
          find('[data-test-filter-field-name] .invalid-feedback')
        ).not.to.exist;
      });
      it('displays filter-field-values error', function () {
        expect(find('[data-test-filter-field-values] input')).to.have.class(
          'is-invalid'
        );
        expect(
          find('[data-test-filter-field-values] .invalid-feedback')
        ).to.have.class('d-block');
      });
      it('displays filter-field-values error', function () {
        expect(find('[data-test-filter-field-values] input')).to.have.class(
          'is-invalid'
        );
        expect(
          find('[data-test-filter-field-values] .invalid-feedback')
        ).to.have.class('d-block');
      });
      it('does not displays activation-interval error', function () {
        expect(find('[data-test-activation-interval] input')).not.to.have.class(
          'is-invalid'
        );
        expect(
          find('[data-test-activation-interval] .invalid-feedback')
        ).not.to.exist;
      });
    });
  });

  describe('fill form with correct data and submit', () =>
    it('saves new tp-filter with correct data', async function () {
      let counter = 0;

      server.post('/tp-filters/', function (schema, request) {
        counter = counter + 1;
        const params = JSON.parse(request.requestBody);
        expect(params.data.attributes['tpid']).to.eq('tptest');
        expect(params.data.attributes['tenant']).to.eq('Test');
        expect(params.data.attributes['custom-id']).to.eq('Test');
        expect(params.data.attributes['filter-type']).to.eq('*gt');
        expect(params.data.attributes['filter-field-name']).to.eq('Test');
        expect(params.data.attributes['filter-field-values']).to.eq('Test');
        expect(params.data.attributes['activation-interval']).to.eq('Test');
        return { data: { id: '1', type: 'tp-filter' } };
      });

      await visit('/tariff-plans/1/tp-filters/new');
      await selectChoose('[data-test-select="filter-type"]', '*gt');
      await fillIn('[data-test-tenant] input', 'Test');
      await fillIn('[data-test-custom-id] input', 'Test');
      await fillIn('[data-test-filter-field-name] input', 'Test');
      await fillIn('[data-test-filter-field-values] input', 'Test');
      await fillIn('[data-test-activation-interval] input', 'Test');
      await click('[data-test-submit-button]');
      expect(counter).to.eq(1);
    }));
});
