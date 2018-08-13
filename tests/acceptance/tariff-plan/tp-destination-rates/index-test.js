import { describe, it, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import startApp from 'cgrates-web-frontend/tests/helpers/start-app';
import destroyApp from 'cgrates-web-frontend/tests/helpers/destroy-app';
import { authenticateSession } from 'cgrates-web-frontend/tests/helpers/ember-simple-auth';
import { isBlank } from '@ember/utils';
import registerPowerSelectHelpers from 'cgrates-web-frontend/tests/helpers/ember-power-select';

registerPowerSelectHelpers();

describe("Acceptance: TpDestinationRates.Index", function() {
  beforeEach(function() {
    this.App = startApp();
    this.tariffPlan = server.create('tariff-plan', {name: 'Test', alias: 'tptest'});
    this.tpDestinationRates = server.createList('tp-destination-rate', 2, {tpid: this.tariffPlan.alias});
    this.other = server.createList('tp-destination-rate', 2, {tpid: 'other'});
    authenticateSession(this.App, {email: "user@example.com"});
  });

  afterEach(function () {
    destroyApp(this.App);
  });

  describe('visit /tariff-plans/1/tp-destination-rates', () =>
    it("renders table with tp-destination-rates", function() {
      visit('/tariff-plans/1/tp-destination-rates');
      return andThen(function() {
        expect(find('main h2').text()).to.eq('TpDestinationRates list');
        return expect(find('table tbody tr').length).to.eq(2);
      });
    })
  );

  describe('select tp-destination-rate', () =>
    it('reditects to tp-destination-rate page', function() {
      visit('/tariff-plans/1/tp-destination-rates');
      click('table tbody tr:first-child td:first-child a');
      return andThen(() => expect(currentPath()).to.equal("tariff-plans.tariff-plan.tp-destination-rates.tp-destination-rate.index"));
    })
  );

  describe('click edit button', () =>
    it('reditects to edit tp-destination-rate page', function() {
      visit('/tariff-plans/1/tp-destination-rates');
      click('table tbody tr:first-child a.edit');
      return andThen(() => expect(currentPath()).to.equal('tariff-plans.tariff-plan.tp-destination-rates.tp-destination-rate.edit'));
    })
  );

  describe('click remove button', () =>
    it('removes tp-destination-rate', function() {
      visit('/tariff-plans/1/tp-destination-rates');
      click('table tbody tr:first-child a.remove');
      return andThen(() => expect(find('table tbody tr').length).to.eq(1));
    })
  );

  describe('click add button', () =>
    it('redirects to new tp-destination-rate page', function() {
      visit('/tariff-plans/1/tp-destination-rates');
      click('.fixed-action-btn a');
      return andThen(() => expect(currentPath()).to.equal('tariff-plans.tariff-plan.tp-destination-rates.new'));
    })
  );

  describe('set filters and click search button', () =>
    it('makes a correct filter query', function() {
      let counter = 0;

      server.get('/tp-destination-rates/', function(schema, request) {
        counter = counter + 1;
        const filterTag = request.queryParams['filter[tag]'];
        const filterRatesTag = request.queryParams['filter[rates_tag]'];
        const filterDestinationsTag = request.queryParams['filter[destinations_tag]'];
        const filterRoundingDecimals = request.queryParams['filter[rounding_decimals]'];
        const filterMaxCost = request.queryParams['filter[max_cost]'];
        const filterRoundingMethod = request.queryParams['filter[rounding_method]'];
        const filterMaxCostStrategy = request.queryParams['filter[max_cost_strategy]'];
        switch (counter) {
          case 1:
            expect(isBlank(filterTag)).to.eq(true);
            expect(isBlank(filterRatesTag)).to.eq(true);
            expect(isBlank(filterDestinationsTag)).to.eq(true);
            expect(isBlank(filterRoundingDecimals)).to.eq(true);
            expect(isBlank(filterMaxCost)).to.eq(true);
            expect(isBlank(filterRoundingMethod)).to.eq(true);
            expect(isBlank(filterMaxCostStrategy)).to.eq(true);
            break;

          default:
            expect(filterTag).to.eq('tagtest');
            expect(filterRatesTag).to.eq('ratetest');
            expect(filterDestinationsTag).to.eq('destinationtest');
            expect(filterRoundingDecimals).to.eq('1');
            expect(filterMaxCost).to.eq('100.0');
            expect(filterRoundingMethod).to.eq('*up');
            expect(filterMaxCostStrategy).to.eq('*free');
        }
        return { data: [{id: '1', type: 'tp-destination-rate'}] };
      });

      visit('/tariff-plans/1/tp-destination-rates');
      return andThen(function() {
        fillIn(`#${find("label:contains('Tag')").attr('for')}`, 'tagtest');
        fillIn(`#${find("label:contains('Rates tag')").attr('for')}`, 'ratetest');
        fillIn(`#${find("label:contains('Destinations tag')").attr('for')}`, 'destinationtest');
        fillIn(`#${find("label:contains('Rounding decimals')").attr('for')}`, '1');
        fillIn(`#${find("label:contains('Max cost (decimal)')").attr('for')}`, '100.0');
        selectChoose(`#${find("label:contains('Rounding method')").attr('for')}`, '*up');
        selectChoose(`#${find("label:contains('Max cost strategy')").attr('for')}`, '*free');
        click('button.search-button');
        return andThen(() => expect(counter).to.eq(2));
      });
    })
  );

  describe('click column header', () =>
    it('makes a correct sort query', function() {
      let counter = 0;

      server.get('/tp-destination-rates/', function(schema, request) {
        counter = counter + 1;
        const sort = request.queryParams['sort'];
        switch (counter) {
          case 1:
            expect(sort).to.eq('id');
            break;
          case 2:
            expect(sort).to.eq('tag');
            break;
          default:
            expect(sort).to.eq('-tag');
        }
        return { data: [{id: '1', type: 'tp-destination-rate'}] };
      });

      visit('/tariff-plans/1/tp-destination-rates');
      click(".sort-header a:contains('Tag')");
      click(".sort-header a:contains('Tag')");
      return andThen(() => expect(counter).to.eq(3));
    })
  );

  return describe('click pagination link', () =>
    it('makes a correct pagination query', function() {
      let counter = 0;

      server.get('/tp-destination-rates/', function(schema, request) {
        counter = counter + 1;
        const pagePage = request.queryParams['page[page]'];
        const pagePageSize = request.queryParams['page[page-size]'];
        switch (counter) {
          case 1:
            expect(pagePage).to.eq('1');
            expect(pagePageSize).to.eq('10');
            break;
          default:
            expect(pagePage).to.eq('2');
            expect(pagePageSize).to.eq('10');
        }
        return { data: [{id: '1', type: 'tp-destination-rate'}], meta: {total_pages: 2} };
      });

      visit('/tariff-plans/1/tp-destination-rates');
      click("ul.pagination li a:contains('2')");
      return andThen(() => expect(counter).to.eq(2));
    })
  );
});
