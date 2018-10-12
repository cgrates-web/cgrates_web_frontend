import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';
import { setupApplicationTest } from 'ember-mocha';
import { authenticateSession } from 'ember-simple-auth/test-support';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { visit, click, fillIn } from '@ember/test-helpers';
import { selectChoose, selectSearch } from 'ember-power-select/test-support/helpers';

describe("Acceptance: TpDestinationRate.Edit", function() {
  let hooks = setupApplicationTest();
  setupMirage(hooks);

  beforeEach(async function() {
    this.tariffPlan = server.create('tariff-plan', {id: '1', name: 'Test', alias: 'tptest'});
    this.tpRate1 = server.create('tp-rate', {tpid: 'tptest', tag: 'ratetest1'});
    this.tpRate2 = server.create('tp-rate', {tpid: 'tptest', tag: 'ratetest2'});
    this.tpDestination1 = server.create('tp-destination', {tpid: 'tptest', tag: 'destinationtest1'});
    this.tpDestination2 = server.create('tp-destination', {tpid: 'tptest', tag: 'destinationtest2'});
    this.tpDestinationRate = server.create('tp-destination-rate', {
      id: '1',
      tpid: this.tariffPlan.alias,
      rates_tag: this.tpRate1.tag,
      destinations_tag: this.tpDestination1.tag
    });
    await authenticateSession({email: "user@example.com"});
  });

  return describe('fill form with correct data and submit', () =>
    it('sends correct data to the backend', async function() {
      let counter = 0;

      server.patch('/tp-destination-rates/:id', (schema, request) => {
        counter = counter + 1;
        const params = JSON.parse(request.requestBody);
        expect(params.data.attributes['tpid']).to.eq('tptest');
        expect(params.data.attributes['tag']).to.eq('edited');
        expect(params.data.attributes['rates-tag']).to.eq('ratetest2');
        expect(params.data.attributes['destinations-tag']).to.eq('destinationtest2');
        expect(params.data.attributes['rounding-decimals']).to.eq(1);
        expect(params.data.attributes['max-cost']).to.eq(100.0);
        expect(params.data.attributes['rounding-method']).to.eq('*middle');
        expect(params.data.attributes['max-cost-strategy']).to.eq('*disconnect');
        return { data: {id: this.tpDestinationRate.id, type: 'tp-destination-rate'} };
      });

      await visit('/tariff-plans/1/tp-destination-rates/1/edit');
      await fillIn('[data-test-tag] input', 'edited');
      await selectSearch('[data-test-tag="rates"]', 'ratetest');
      await selectChoose('[data-test-tag="rates"]', 'ratetest2');
      await selectSearch('[data-test-tag="destinations"]', 'destinationtest');
      await selectChoose('[data-test-tag="destinations"]', 'destinationtest2');
      await fillIn('[data-test-rounding-decimals] input', '1');
      await fillIn('[data-test-max-cost] input', '100.0');
      await selectChoose('[data-test-select="rounding-method"]', '*middle');
      await selectChoose('[data-test-select="max-cost-strategy"]', '*disconnect');
      await click('[data-test-submit-button]');
      expect(counter).to.eq(1);
    })
  );
});
