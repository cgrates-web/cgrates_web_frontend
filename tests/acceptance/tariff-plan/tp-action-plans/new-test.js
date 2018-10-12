import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';
import { setupApplicationTest } from 'ember-mocha';
import { authenticateSession } from 'ember-simple-auth/test-support';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { visit, click, find, findAll, fillIn } from '@ember/test-helpers';
import { selectSearch, selectChoose } from 'ember-power-select/test-support/helpers';

describe("Acceptance: TpActionPlans.New", function() {
  let hooks = setupApplicationTest();
  setupMirage(hooks);

  beforeEach(async function() {
    this.tariffPlan = server.create('tariff-plan', {id: '1', name: 'Test', alias: 'tptest'});
    this.tpAction1 = server.create('tp-action', {tpid: this.tariffPlan.alias, tag: 'actiontest1'});
    this.tpAction2 = server.create('tp-action', {tpid: this.tariffPlan.alias, tag: 'actiontest2'});
    await authenticateSession({email: "user@example.com"});
  });

  describe('visit /tariff-plans/1/tp-action-plans/new', () =>
    it('renders tp-action-plan form', async function() {
      await visit('/tariff-plans/1/tp-action-plans/new');
      expect(findAll('form input').length).to.eq(3);
      expect(findAll('form .ember-power-select-trigger').length).to.eq(1);
    })
  );

  describe('go away without save', () =>
    it('removes not saved tp-action-plan', async function() {
      await visit('/tariff-plans/1/tp-action-plans/new');
      await click('[data-test-action-palns-link]');
      expect(findAll('table tbody tr').length).to.eq(0);
    })
  );

  describe('fill form with incorrect data and submit', function () {
    beforeEach(async function () {
      await visit('/tariff-plans/1/tp-action-plans/new');
      await fillIn('[data-test-tag] input', '');
      await fillIn('[data-test-timing-tag] input', '');
      await fillIn('[data-test-weight] input', '');
      await click('[data-test-submit-button]');
    });
    it('displays tag error', async function () {
      expect(find('[data-test-tag] input')).to.have.class('is-invalid');
      expect(find('[data-test-tag] .invalid-feedback')).to.have.class('d-block');
    });
    it('displays timing-tag error', async function () {
      expect(find('[data-test-timing-tag] input')).to.have.class('is-invalid');
      expect(find('[data-test-timing-tag] .invalid-feedback')).to.have.class('d-block');
    });
    it('displays action-tag error', async function () {
      expect(find('[data-test-tag="action"] div')).to.have.class('is-invalid');
      expect(find('[data-test-tag="action"] .invalid-feedback')).to.have.class('d-block');
    });
    it('displays weight error', async function () {
      expect(find('[data-test-weight] input')).to.have.class('is-invalid');
      expect(find('[data-test-weight] .invalid-feedback')).to.have.class('d-block');
    });
  });

  describe('fill form with correct data and submit', () =>
    it('saves new tp-action-plan with correct data', async function() {
      let counter = 0;

      server.post('/tp-action-plans/', function(schema, request) {
        counter = counter + 1;
        const params = JSON.parse(request.requestBody);
        expect(params.data.attributes['tpid']).to.eq('tptest');
        expect(params.data.attributes['tag']).to.eq('tagtest');
        expect(params.data.attributes['actions-tag']).to.eq('actiontest1');
        expect(params.data.attributes['timing-tag']).to.eq('*asap');
        expect(params.data.attributes['weight']).to.eq(10);
        return { data: {id: '1', type: 'tp-action-plan'} };
      });

      await visit('/tariff-plans/1/tp-action-plans/new');
      await fillIn('[data-test-tag] input', 'tagtest');
      await selectSearch('[data-test-tag="action"]', 'actiontest');
      await selectChoose('[data-test-tag="action"]', 'actiontest1');
      await fillIn('[data-test-timing-tag] input', '*asap');
      await fillIn('[data-test-weight] input', '10');
      await click('[data-test-submit-button]');
      expect(counter).to.eq(1)
    })
  );
});
