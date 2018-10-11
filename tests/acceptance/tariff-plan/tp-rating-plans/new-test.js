import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';
import { setupApplicationTest } from 'ember-mocha';
import { authenticateSession } from 'ember-simple-auth/test-support';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { visit, find, findAll, click, fillIn } from '@ember/test-helpers';
import { selectSearch, selectChoose } from 'ember-power-select/test-support/helpers';

describe("Acceptance: TpRatingPlans.New", function() {
  let hooks = setupApplicationTest();
  setupMirage(hooks);

  beforeEach(async function() {
    this.tariffPlan = server.create('tariff-plan', {id: '1', name: 'Test', alias: 'tptest'});
    this.tpDestinationRate1 = server.create('tp-destination-rate', {tpid: 'tptest', tag: 'destratetest1'});
    this.tpDestinationRate2 = server.create('tp-destination-rate', {tpid: 'tptest', tag: 'destratetest2'});
    this.tpTiming1 = server.create('tp-timing', {tpid: 'tptest', tag: 'timingtest1'});
    this.tpTiming2 = server.create('tp-timing', {tpid: 'tptest', tag: 'timingtest2'});
    await authenticateSession({email: "user@example.com"});
  });

  describe('visit /tariff-plans/1/tp-rating-plans/new', () =>
    it('renders tp-rating-plan form', async function() {
      await visit('/tariff-plans/1/tp-rating-plans/new');
      expect(findAll('form input').length).to.eq(2);
      expect(findAll('form .ember-power-select-trigger').length).to.eq(2);
    })
  );

  describe('go away without save', () =>
    it('removes not saved tp-rating-plan', async function() {
      await visit('/tariff-plans/1/tp-rating-plans/new');
      await click('[data-test-rating-plans-link]');
      expect(findAll('table tbody tr').length).to.eq(0);
    })
  );

  describe('submit empty form', function () {
    beforeEach(async function () {
      await visit('/tariff-plans/1/tp-rating-plans/new');
      await click('[data-test-submit-button]');
    });
    it('displays tag error', function () {
      expect(find('[data-test-tag] input')).to.have.class('is-invalid');
      expect(find('[data-test-tag] .invalid-feedback')).to.have.class('d-block');
    });
    it('displays weight error', function () {
      expect(find('[data-test-weight] input')).to.have.class('is-invalid');
      expect(find('[data-test-weight] .invalid-feedback')).to.have.class('d-block');
    });
    it('displays destination-rates tag error', function () {
      expect(find('[data-test-tag="destination-rates"] div')).to.have.class('is-invalid');
      expect(find('[data-test-tag="destination-rates"] .invalid-feedback')).to.have.class('d-block');
    });
    it('displays timing tag error', function () {
      expect(find('[data-test-tag="timing"] div')).to.have.class('is-invalid');
      expect(find('[data-test-tag="timing"] .invalid-feedback')).to.have.class('d-block');
    });
  });

  return describe('fill form with correct data and submit', () =>
    it('saves new tp-rating-plan with correct data', async function() {
      let counter = 0;

      server.post('/tp-rating-plans/', function(schema, request) {
        counter = counter + 1;
        const params = JSON.parse(request.requestBody);
        expect(params.data.attributes['tpid']).to.eq('tptest');
        expect(params.data.attributes['tag']).to.eq('tagtest');
        expect(params.data.attributes['destrates-tag']).to.eq('destratetest1');
        expect(params.data.attributes['timing-tag']).to.eq('timingtest1');
        expect(params.data.attributes['weight']).to.eq(12.1);
        return { data: {id: '1', type: 'tp-rating-plan'} };
      });

      await visit('/tariff-plans/1/tp-rating-plans/new');
      await fillIn('[data-test-tag] input', 'tagtest');
      await selectSearch('[data-test-tag="destination-rates"]', 'destratetest');
      await selectChoose('[data-test-tag="destination-rates"]', 'destratetest1');
      await selectSearch('[data-test-tag="timing"]', 'timingtest');
      await selectChoose('[data-test-tag="timing"]', 'timingtest1');
      await fillIn('[data-test-weight] input', '12.1');
      await click('button[type="submit"]');
      expect(counter).to.eq(1);
    })
  );
});
