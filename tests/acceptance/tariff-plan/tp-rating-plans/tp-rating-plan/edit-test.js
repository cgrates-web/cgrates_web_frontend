import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';
import { setupApplicationTest } from 'ember-mocha';
import { authenticateSession } from 'ember-simple-auth/test-support';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { visit, click, fillIn } from '@ember/test-helpers';
import { selectSearch, selectChoose } from 'ember-power-select/test-support/helpers';

describe("Acceptance: TpRatingPlan.Edit", function() {
  let hooks = setupApplicationTest();
  setupMirage(hooks);

  beforeEach(async function() {
    this.tariffPlan = server.create('tariff-plan', {id: '1', name: 'Test', alias: 'tptest'});
    this.tpDestinationRate1 = server.create('tp-destination-rate', {tpid: 'tptest', tag: 'destratetest1'});
    this.tpDestinationRate2 = server.create('tp-destination-rate', {tpid: 'tptest', tag: 'destratetest2'});
    this.tpTiming1 = server.create('tp-timing', {tpid: 'tptest', tag: 'timingtest1'});
    this.tpTiming2 = server.create('tp-timing', {tpid: 'tptest', tag: 'timingtest2'});
    this.tpRatingPlan = server.create('tp-rating-plan', {
      id: '1',
      tpid: this.tariffPlan.alias,
      destrates_tag: this.tpDestinationRate1.tag,
      timing_tag: this.tpTiming1.tag
    });
    await authenticateSession({email: "user@example.com"});
  });

  describe('fill form with correct data and submit', () =>
    it('sends correct data to the backend', async function() {
      let counter = 0;

      server.patch('/tp-rating-plans/:id', (schema, request) => {
        counter = counter + 1;
        const params = JSON.parse(request.requestBody);
        expect(params.data.attributes['tpid']).to.eq('tptest');
        expect(params.data.attributes['tag']).to.eq('edited');
        expect(params.data.attributes['destrates-tag']).to.eq('destratetest2');
        expect(params.data.attributes['timing-tag']).to.eq('timingtest2');
        expect(params.data.attributes['weight']).to.eq(12.1);
        return { data: {id: this.tpRatingPlan.id, type: 'tp-rating-plan'} };
      });

      await visit('/tariff-plans/1/tp-rating-plans/1/edit');
      await fillIn('[data-test-tag] input', 'edited');
      await selectSearch('[data-test-tag="destination-rates"]', 'destratetest');
      await selectChoose('[data-test-tag="destination-rates"]', 'destratetest2');
      await selectSearch('[data-test-tag="timing"]', 'timingtest');
      await selectChoose('[data-test-tag="timing"]', 'timingtest2');
      await fillIn('[data-test-weight] input', '12.1');
      await click('button[type="submit"]');
      expect(counter).to.eq(1);
    })
  );
});
