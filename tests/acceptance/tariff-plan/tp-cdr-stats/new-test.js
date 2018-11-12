import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';
import { setupApplicationTest } from 'ember-mocha';
import { authenticateSession } from 'ember-simple-auth/test-support';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { visit, find, findAll, click, fillIn } from '@ember/test-helpers';
import { selectChoose, selectSearch } from 'ember-power-select/test-support/helpers';

describe('Acceptance: TpCdrStats.New', function () {
  let hooks = setupApplicationTest();
  setupMirage(hooks);

  beforeEach(async function () {
    this.tariffPlan = server.create('tariff-plan', { id: '1', name: 'Test', alias: 'tptest' });
    server.createList('tp-destination', 2, { tpid: this.tariffPlan.alias, tag: 'destination-tag' });
    server.createList('tp-action-trigger', 2, { tpid: this.tariffPlan.alias, tag: 'trigger-tag' });
    await authenticateSession({email: 'user@example.com'});
  });

  describe('go away without save', () =>
    it('removes not saved tp-alias', async  function () {
      await visit('/tariff-plans/1/tp-cdr-stats/new');
      await click('[data-test-tp-cdr-stats-link]');
      expect(findAll('table tbody tr').length).to.eq(0);
    })
  );

  describe('submit empty form', function () {
    beforeEach(async function () {
      await visit('/tariff-plans/1/tp-cdr-stats/new');
      await click('[data-test-submit-button]');
    });
    it('displays tag error', async function () {
      expect(find('[data-test-tag] input')).to.have.class('is-invalid');
      expect(find('[data-test-tag] .invalid-feedback')).to.have.class('d-block');
    });
    it('displays queue-length error', async function () {
      expect(find('[data-test-queue-length] input')).to.have.class('is-invalid');
      expect(find('[data-test-queue-length] .invalid-feedback')).to.have.class('d-block');
    });
    it('displays metrics error', async function () {
      expect(find('[data-test-select="metrics"] div')).to.have.class('is-invalid');
      expect(find('[data-test-select="metrics"] .invalid-feedback')).to.have.class('d-block');
    });
    it('displays time-window error', async function () {
      expect(find('[data-test-input-interval="time-window"] input')).to.have.class('is-invalid');
      expect(find('[data-test-input-interval="time-window"] .invalid-feedback')).to.have.class('d-block');
    });
    it('displays save-interval error', async function () {
      expect(find('[data-test-input-interval="save-interval"] input')).to.have.class('is-invalid');
      expect(find('[data-test-input-interval="save-interval"] .invalid-feedback')).to.have.class('d-block');
    });
    it('displays setup-interval error', async function () {
      expect(find('[data-test-setup-interval] input')).to.have.class('is-invalid');
      expect(find('[data-test-setup-interval] .invalid-feedback')).to.have.class('d-block');
    });
    it('displays tors error', async function () {
      expect(find('[data-test-tors] input')).to.have.class('is-invalid');
      expect(find('[data-test-tors] .invalid-feedback')).to.have.class('d-block');
    });
    it('displays cdr-hosts error', async function () {
      expect(find('[data-test-cdr-hosts] input')).to.have.class('is-invalid');
      expect(find('[data-test-cdr-hosts] .invalid-feedback')).to.have.class('d-block');
    });
    it('displays cdr-sources error', async function () {
      expect(find('[data-test-cdr-sources] input')).to.have.class('is-invalid');
      expect(find('[data-test-cdr-sources] .invalid-feedback')).to.have.class('d-block');
    });
    it('displays req-types error', async function () {
      expect(find('[data-test-req-types] input')).to.have.class('is-invalid');
      expect(find('[data-test-req-types] .invalid-feedback')).to.have.class('d-block');
    });
    it('displays directions error', async function () {
      expect(find('[data-test-directions] input')).to.have.class('is-invalid');
      expect(find('[data-test-directions] .invalid-feedback')).to.have.class('d-block');
    });
    it('displays tenants error', async function () {
      expect(find('[data-test-tenants] input')).to.have.class('is-invalid');
      expect(find('[data-test-tenants] .invalid-feedback')).to.have.class('d-block');
    });
    it('displays categories error', async function () {
      expect(find('[data-test-categories] input')).to.have.class('is-invalid');
      expect(find('[data-test-categories] .invalid-feedback')).to.have.class('d-block');
    });
    it('displays accounts error', async function () {
      expect(find('[data-test-accounts] input')).to.have.class('is-invalid');
      expect(find('[data-test-accounts] .invalid-feedback')).to.have.class('d-block');
    });
    it('displays subjects error', async function () {
      expect(find('[data-test-subjects] input')).to.have.class('is-invalid');
      expect(find('[data-test-subjects] .invalid-feedback')).to.have.class('d-block');
    });
    it('displays destination-ids error', function () {
      expect(find('[data-test-select-search-to-str="destination-ids"] div')).to.have.class('is-invalid');
      expect(find('[data-test-select-search-to-str="destination-ids"] .invalid-feedback')).to.exist;
    });
    it('displays pdd-interval error', async function () {
      expect(find('[data-test-pdd-interval] input')).to.have.class('is-invalid');
      expect(find('[data-test-pdd-interval] .invalid-feedback')).to.have.class('d-block');
    });
    it('displays usage-interval error', async function () {
      expect(find('[data-test-usage-interval] input')).to.have.class('is-invalid');
      expect(find('[data-test-usage-interval] .invalid-feedback')).to.have.class('d-block');
    });
    it('displays suppliers error', async function () {
      expect(find('[data-test-suppliers] input')).to.have.class('is-invalid');
      expect(find('[data-test-suppliers] .invalid-feedback')).to.have.class('d-block');
    });
    it('displays disconnect-causes error', async function () {
      expect(find('[data-test-disconnect-causes] input')).to.have.class('is-invalid');
      expect(find('[data-test-disconnect-causes] .invalid-feedback')).to.have.class('d-block');
    });
    it('displays mediation-runids error', async function () {
      expect(find('[data-test-mediation-runids] input')).to.have.class('is-invalid');
      expect(find('[data-test-mediation-runids] .invalid-feedback')).to.have.class('d-block');
    });
    it('displays rated-accounts error', async function () {
      expect(find('[data-test-rated-accounts] input')).to.have.class('is-invalid');
      expect(find('[data-test-rated-accounts] .invalid-feedback')).to.have.class('d-block');
    });
    it('displays rated-subjects error', async function () {
      expect(find('[data-test-rated-subjects] input')).to.have.class('is-invalid');
      expect(find('[data-test-rated-subjects] .invalid-feedback')).to.have.class('d-block');
    });
    it('displays cost-interval error', async function () {
      expect(find('[data-test-cost-interval] input')).to.have.class('is-invalid');
      expect(find('[data-test-cost-interval] .invalid-feedback')).to.have.class('d-block');
    });
    it('displays action-triggers error', function () {
      expect(find('[data-test-select-search-to-str="action-triggers"] div')).to.have.class('is-invalid');
      expect(find('[data-test-select-search-to-str="action-triggers"] .invalid-feedback')).to.exist;
    });
  });

  describe('fill form with correct data and submit', () =>
    it('sends correct data to the backend', async function () {
      let expectCorrectRequest = () => expect(true).to.be.false;
      server.post('/tp-cdr-stats', function (schema, request) {
        expectCorrectRequest = () => {
          const params = JSON.parse(request.requestBody);
          expect(params.data.attributes['tpid']).to.eq('tptest');
          expect(params.data.attributes['tag']).to.eq('tag');
          expect(params.data.attributes['queue-length']).to.eq(25);
          expect(params.data.attributes['metrics']).to.eq('ASR');
          expect(params.data.attributes['time-window']).to.eq('3h');
          expect(params.data.attributes['save-interval']).to.eq('50s');
          expect(params.data.attributes['setup-interval']).to.eq('setup-interval');
          expect(params.data.attributes['tors']).to.eq('tors');
          expect(params.data.attributes['cdr-hosts']).to.eq('cdr-hosts');
          expect(params.data.attributes['cdr-sources']).to.eq('cdr-sources');
          expect(params.data.attributes['req-types']).to.eq('req-types');
          expect(params.data.attributes['directions']).to.eq('1234567');
          expect(params.data.attributes['tenants']).to.eq('tenants');
          expect(params.data.attributes['categories']).to.eq('categories');
          expect(params.data.attributes['accounts']).to.eq('accounts');
          expect(params.data.attributes['subjects']).to.eq('subjects');
          expect(params.data.attributes['destination-ids']).to.eq('destination-tag');
          expect(params.data.attributes['pdd-interval']).to.eq('pdd-interval');
          expect(params.data.attributes['usage-interval']).to.eq('usage-interval');
          expect(params.data.attributes['suppliers']).to.eq('suppliers');
          expect(params.data.attributes['disconnect-causes']).to.eq('disconnect-causes');
          expect(params.data.attributes['mediation-runids']).to.eq('mediation-runids');
          expect(params.data.attributes['rated-accounts']).to.eq('rated-accounts');
          expect(params.data.attributes['rated-subjects']).to.eq('rated-subjects');
          expect(params.data.attributes['cost-interval']).to.eq('cost-interval');
          expect(params.data.attributes['action-triggers']).to.eq('trigger-tag');
        };
        return { data: {id: '1', type: 'tp-cdr-stat'} };
      });

      await visit('/tariff-plans/1/tp-cdr-stats/new');
      await fillIn('[data-test-tag] input', 'tag');
      await fillIn('[data-test-queue-length] input', 25);
      await selectChoose('[data-test-select="metrics"]', 'ASR');
      await fillIn('[data-test-input-interval="time-window"] input', 3);
      await selectChoose('[data-test-input-interval="time-window"]', 'h');
      await fillIn('[data-test-input-interval="save-interval"] input', 50);
      await selectChoose('[data-test-input-interval="save-interval"]', 's');
      await fillIn('[data-test-setup-interval] input', 'setup-interval');
      await fillIn('[data-test-tors] input', 'tors');
      await fillIn('[data-test-cdr-hosts] input', 'cdr-hosts');
      await fillIn('[data-test-cdr-sources] input', 'cdr-sources');
      await fillIn('[data-test-req-types] input', 'req-types');
      await fillIn('[data-test-directions] input', '1234567');
      await fillIn('[data-test-tenants] input', 'tenants');
      await fillIn('[data-test-categories] input', 'categories');
      await fillIn('[data-test-accounts] input', 'accounts');
      await fillIn('[data-test-subjects] input', 'subjects');
      await selectSearch('[data-test-select-search-to-str="destination-ids"]', 'destination-tag');
      await selectChoose('[data-test-select-search-to-str="destination-ids"]', 'destination-tag');
      await fillIn('[data-test-pdd-interval] input', 'pdd-interval');
      await fillIn('[data-test-usage-interval] input', 'usage-interval');
      await fillIn('[data-test-suppliers] input', 'suppliers');
      await fillIn('[data-test-disconnect-causes] input', 'disconnect-causes');
      await fillIn('[data-test-mediation-runids] input', 'mediation-runids');
      await fillIn('[data-test-rated-accounts] input', 'rated-accounts');
      await fillIn('[data-test-rated-subjects] input', 'rated-subjects');
      await fillIn('[data-test-cost-interval] input', 'cost-interval');
      await selectSearch('[data-test-select-search-to-str="action-triggers"]', 'trigger-tag');
      await selectChoose('[data-test-select-search-to-str="action-triggers"]', 'trigger-tag');
      await click('[data-test-submit-button]');
      expectCorrectRequest();
    })
  );
});
