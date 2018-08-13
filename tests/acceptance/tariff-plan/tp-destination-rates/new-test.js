import { describe, it, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import startApp from 'cgrates-web-frontend/tests/helpers/start-app';
import destroyApp from 'cgrates-web-frontend/tests/helpers/destroy-app';
import { authenticateSession } from 'cgrates-web-frontend/tests/helpers/ember-simple-auth';
import registerPowerSelectHelpers from 'cgrates-web-frontend/tests/helpers/ember-power-select';

registerPowerSelectHelpers();

describe("Acceptance: TpDestinationRates.New", function() {
  beforeEach(function() {
    this.App = startApp();
    this.tariffPlan = server.create('tariff-plan', {name: 'Test', alias: 'tptest'});
    this.tpRate1 = server.create('tp-rate', {tpid: 'tptest', tag: 'ratetest1'});
    this.tpRate2 = server.create('tp-rate', {tpid: 'tptest', tag: 'ratetest2'});
    this.tpDestination1 = server.create('tp-destination', {tpid: 'tptest', tag: 'destinationtest1'});
    this.tpDestination2 = server.create('tp-destination', {tpid: 'tptest', tag: 'destinationtest2'});
    authenticateSession(this.App, {email: "user@example.com"});
  });

  afterEach(function () {
    destroyApp(this.App);
  });

  describe('visit /tariff-plans/1/tp-destination-rates/new', () =>
    it('renders tp-destination-rate form', function() {
      visit('/tariff-plans/1/tp-destination-rates/new');
      return andThen(function() {
        expect(find('form input').length).to.eq(3);
        return expect(find('form .ember-power-select-trigger').length).to.eq(4);
      });
    })
  );

  describe('go away without save', () =>
    it('removes not saved tp-destination-rate', function() {
      visit('/tariff-plans/1/tp-destination-rates');
      click('.fixed-action-btn a');
      click("ul#slide-out li a:contains('DestinationRates')");
      return andThen(() => expect(find('table tbody tr').length).to.eq(0));
    })
  );

  describe('fill form with incorrect data and submit', () =>
    it('does not submit data', function() {
      visit('/tariff-plans/1/tp-destination-rates/new');
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
    it('saves new tp-destination-rate with correct data', function() {
      let counter = 0;

      server.post('/tp-destination-rates/', function(schema, request) {
        counter = counter + 1;
        const params = JSON.parse(request.requestBody);
        expect(params.data.attributes['tpid']).to.eq('tptest');
        expect(params.data.attributes['tag']).to.eq('tagtest');
        expect(params.data.attributes['rates-tag']).to.eq('ratetest1');
        expect(params.data.attributes['destinations-tag']).to.eq('destinationtest1');
        expect(params.data.attributes['rounding-decimals']).to.eq(1);
        expect(params.data.attributes['max-cost']).to.eq(100.0);
        expect(params.data.attributes['rounding-method']).to.eq('*up');
        expect(params.data.attributes['max-cost-strategy']).to.eq('*free');
        return { data: {id: '1', type: 'tp-destination-rate'} };
      });

      visit('/tariff-plans/1/tp-destination-rates/new');
      return andThen(function() {
        fillIn(`#${find("label:contains('Tag')").attr('for')}`, 'tagtest');
        selectSearch(`#${find("label:contains('Rates tag')").attr('for')}`, 'ratetest');
        return andThen(function() {
          selectChoose(`#${find("label:contains('Rates tag')").attr('for')}`, 'ratetest1');
          selectSearch(`#${find("label:contains('Destinations tag')").attr('for')}`, 'destinationtest');
          return andThen(function() {
            selectChoose(`#${find("label:contains('Destinations tag')").attr('for')}`, 'destinationtest1');
            fillIn(`#${find("label:contains('Rounding decimals')").attr('for')}`, '1');
            fillIn(`#${find("label:contains('Max cost (decimal)')").attr('for')}`, '100.0');
            selectChoose(`#${find("label:contains('Rounding method')").attr('for')}`, '*up');
            selectChoose(`#${find("label:contains('Max cost strategy')").attr('for')}`, '*free');
            click('button[type="submit"]');
            return andThen(() => expect(counter).to.eq(1));
          });
        });
      });
    })
  );
});
