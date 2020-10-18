import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';
import { setupApplicationTest } from 'ember-mocha';
import { authenticateSession } from 'ember-simple-auth/test-support';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { visit, find, findAll, click, fillIn } from '@ember/test-helpers';
import { selectChoose } from 'ember-power-select/test-support/helpers';

describe('Acceptance: TpActions.New', function () {
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

  describe('visit /tariff-plans/1/tp-actions/new', () =>
    it('renders tp-action form', async function () {
      await visit('/tariff-plans/1/tp-actions/new');
      expect(findAll('form input').length).to.eq(12);
      expect(findAll('form .ember-power-select-trigger').length).to.eq(6);
    }));

  describe('go away without save', () =>
    it('removes not saved tp-action', async function () {
      await visit('/tariff-plans/1/tp-actions/new');
      await click('[data-test-actions-link]');
      expect(findAll('table tbody tr').length).to.eq(0);
    }));

  describe('submit empty form', function () {
    beforeEach(async function () {
      await visit('/tariff-plans/1/tp-actions/new');
      await click('[data-test-submit-button]');
    });
    it('displays tag error', async function () {
      expect(find('[data-test-tag] input')).to.have.class('is-invalid');
      expect(find('[data-test-tag] .invalid-feedback')).to.have.class(
        'd-block'
      );
    });
    it('displays units error', async function () {
      expect(find('[data-test-units] input')).to.have.class('is-invalid');
      expect(find('[data-test-units] .invalid-feedback')).to.have.class(
        'd-block'
      );
    });
    it('displays expiry-time error', async function () {
      expect(find('[data-test-expiry-time] input')).to.have.class('is-invalid');
      expect(find('[data-test-expiry-time] .invalid-feedback')).to.have.class(
        'd-block'
      );
    });
    it('displays timing-tags error', async function () {
      expect(find('[data-test-timing-tags] input')).to.have.class('is-invalid');
      expect(find('[data-test-timing-tags] .invalid-feedback')).to.have.class(
        'd-block'
      );
    });
    it('displays rating-subject error', async function () {
      expect(find('[data-test-rating-subject] input')).to.have.class(
        'is-invalid'
      );
      expect(
        find('[data-test-rating-subject] .invalid-feedback')
      ).to.have.class('d-block');
    });
    it('displays categories error', async function () {
      expect(find('[data-test-categories] input')).to.have.class('is-invalid');
      expect(find('[data-test-categories] .invalid-feedback')).to.have.class(
        'd-block'
      );
    });
    it('displays shared-groups error', async function () {
      expect(find('[data-test-shared-groups] input')).to.have.class(
        'is-invalid'
      );
      expect(find('[data-test-shared-groups] .invalid-feedback')).to.have.class(
        'd-block'
      );
    });
    it('displays balance-weight error', async function () {
      expect(find('[data-test-balance-weight] input')).to.have.class(
        'is-invalid'
      );
      expect(
        find('[data-test-balance-weight] .invalid-feedback')
      ).to.have.class('d-block');
    });

    it('displays extra-parameters error', async function () {
      expect(find('[data-test-extra-parameters] input')).to.have.class(
        'is-invalid'
      );
      expect(
        find('[data-test-extra-parameters] .invalid-feedback')
      ).to.have.class('d-block');
    });
    it('displays filter error', async function () {
      expect(find('[data-test-filter] input')).to.have.class('is-invalid');
      expect(find('[data-test-filter] .invalid-feedback')).to.have.class(
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
    it('saves new tp-action with correct data', async function () {
      let counter = 0;

      server.post('/tp-actions/', function (schema, request) {
        counter = counter + 1;
        const params = JSON.parse(request.requestBody);
        expect(params.data.attributes['tpid']).to.eq('tptest');
        expect(params.data.attributes['tag']).to.eq('tagtest');
        expect(params.data.attributes['action']).to.eq('*log');
        expect(params.data.attributes['balance-tag']).to.eq('balancetest');
        expect(params.data.attributes['balance-type']).to.eq('*monetary');
        expect(params.data.attributes['directions']).to.eq('*out');
        expect(params.data.attributes['units']).to.eq('120');
        expect(params.data.attributes['expiry-time']).to.eq('*unlimited');
        expect(params.data.attributes['timing-tags']).to.eq('timingtest');
        expect(params.data.attributes['destination-tags']).to.eq('*any');
        expect(params.data.attributes['rating-subject']).to.eq('subjecttest');
        expect(params.data.attributes['categories']).to.eq('categoriestest');
        expect(params.data.attributes['shared-groups']).to.eq('groupstest');
        expect(params.data.attributes['balance-weight']).to.eq('20');
        expect(params.data.attributes['balance-blocker']).to.eq('false');
        expect(params.data.attributes['balance-disabled']).to.eq('false');
        expect(params.data.attributes['extra-parameters']).to.eq(
          'parameterstest'
        );
        expect(params.data.attributes['filter']).to.eq('filtertest');
        expect(params.data.attributes['weight']).to.eq(10);
        return { data: { id: '1', type: 'tp-action' } };
      });

      await visit('/tariff-plans/1/tp-actions/new');
      await fillIn('[data-test-tag] input', 'tagtest');
      await selectChoose('[data-test-select="action"]', '*log');
      await fillIn('[data-test-balance-tag] input', 'balancetest');
      await selectChoose('[data-test-select="balance-type"]', '*monetary');
      await selectChoose('[data-test-select="directions"]', '*out');
      await fillIn('[data-test-units] input', '120');
      await fillIn('[data-test-expiry-time] input', '*unlimited');
      await fillIn('[data-test-timing-tags] input', 'timingtest');
      await selectChoose('[data-test-tag="destination"]', '*any');
      await fillIn('[data-test-rating-subject] input', 'subjecttest');
      await fillIn('[data-test-categories] input', 'categoriestest');
      await fillIn('[data-test-shared-groups] input', 'groupstest');
      await fillIn('[data-test-balance-weight] input', '20');
      await selectChoose('[data-test-select="balance-blocker"]', 'false');
      await selectChoose('[data-test-select="balance-disabled"]', 'false');
      await fillIn('[data-test-extra-parameters] input', 'parameterstest');
      await fillIn('[data-test-filter] input', 'filtertest');
      await fillIn('[data-test-weight] input', '10');
      await click('[data-test-submit-button]');
      expect(counter).to.eq(1);
    }));
});
