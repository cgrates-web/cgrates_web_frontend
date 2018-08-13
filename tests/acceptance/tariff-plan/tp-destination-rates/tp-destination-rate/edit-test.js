import { describe, it, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import startApp from 'cgrates-web-frontend/tests/helpers/start-app';
import destroyApp from 'cgrates-web-frontend/tests/helpers/destroy-app';
import { authenticateSession } from 'cgrates-web-frontend/tests/helpers/ember-simple-auth';
import registerPowerSelectHelpers from 'cgrates-web-frontend/tests/helpers/ember-power-select';

registerPowerSelectHelpers();

describe("Acceptance: TpDestinationRate.Edit", function() {
  beforeEach(function() {
    this.App = startApp();
    this.tariffPlan = server.create('tariff-plan', {name: 'Test', alias: 'tptest'});
    this.tpRate1 = server.create('tp-rate', {tpid: 'tptest', tag: 'ratetest1'});
    this.tpRate2 = server.create('tp-rate', {tpid: 'tptest', tag: 'ratetest2'});
    this.tpDestination1 = server.create('tp-destination', {tpid: 'tptest', tag: 'destinationtest1'});
    this.tpDestination2 = server.create('tp-destination', {tpid: 'tptest', tag: 'destinationtest2'});
    this.tpDestinationRate = server.create('tp-destination-rate', {
      tpid: this.tariffPlan.alias,
      rates_tag: this.tpRate1.tag,
      destinations_tag: this.tpDestination1.tag
    });
    authenticateSession(this.App, {email: "user@example.com"});
  });

  afterEach(function () {
    destroyApp(this.App);
  });

  describe('fill form with incorrect data and submit', () =>
    it('does not submit data', function() {
      visit('/tariff-plans/1/tp-destination-rates');
      click('table tbody tr:first-child a.edit');
      return andThen(function() {
        fillIn(`#${find("label:contains('Tag')").attr('for')}`, '');
        fillIn(`#${find("label:contains('Rounding decimals')").attr('for')}`, '');
        fillIn(`#${find("label:contains('Max cost (decimal)')").attr('for')}`, '');
        click('button[type="submit"]');
        return andThen(function() {
          expect(find(`#${find("label:contains('Tag')").attr('for')}`).length).to.eq(1);
          expect(find(`#${find("label:contains('Rates tag')").attr('for')}`).length).to.eq(1);
          expect(find(`#${find("label:contains('Destinations tag')").attr('for')}`).length).to.eq(1);
          expect(find(`#${find("label:contains('Rounding decimals')").attr('for')}`).length).to.eq(1);
          expect(find(`#${find("label:contains('Max cost (decimal)')").attr('for')}`).length).to.eq(1);
          expect(find(`#${find("label:contains('Rounding method')").attr('for')}`).length).to.eq(1);
          return expect(find(`#${find("label:contains('Max cost strategy')").attr('for')}`).length).to.eq(1);
        });
      });
    })
  );

  return describe('fill form with correct data and submit', () =>
    it('sends correct data to the backend', function() {
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

      visit('/tariff-plans/1/tp-destination-rates');
      click('table tbody tr:first-child a.edit');
      return andThen(function() {
        fillIn(`#${find("label:contains('Tag')").attr('for')}`, 'edited');
        selectSearch(`#${find("label:contains('Rates tag')").attr('for')}`, 'ratetest');
        return andThen(function() {
          selectChoose(`#${find("label:contains('Rates tag')").attr('for')}`, 'ratetest2');
          selectSearch(`#${find("label:contains('Destinations tag')").attr('for')}`, 'destinationtest');
          return andThen(function() {
            selectChoose(`#${find("label:contains('Destinations tag')").attr('for')}`, 'destinationtest2');
            fillIn(`#${find("label:contains('Rounding decimals')").attr('for')}`, '1');
            fillIn(`#${find("label:contains('Max cost (decimal)')").attr('for')}`, '100.0');
            selectChoose(`#${find("label:contains('Rounding method')").attr('for')}`, '*middle');
            selectChoose(`#${find("label:contains('Max cost strategy')").attr('for')}`, '*disconnect');
            click('button[type="submit"]');
            return andThen(() => expect(counter).to.eq(1));
          });
        });
      });
    })
  );
});
