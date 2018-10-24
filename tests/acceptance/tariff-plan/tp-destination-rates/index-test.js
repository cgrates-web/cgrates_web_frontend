import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';
import { setupApplicationTest } from 'ember-mocha';
import { authenticateSession } from 'ember-simple-auth/test-support';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { visit, click, find, findAll, currentRouteName, fillIn } from '@ember/test-helpers';
import { selectChoose } from 'ember-power-select/test-support/helpers';
import { isBlank } from '@ember/utils';

describe('Acceptance: TpDestinationRates.Index', function () {
  let hooks = setupApplicationTest();
  setupMirage(hooks);

  beforeEach(async function () {
    this.tariffPlan = server.create('tariff-plan', {id: '1', name: 'Test', alias: 'tptest'});
    this.tpDestinationRates = server.createList('tp-destination-rate', 2, {tpid: this.tariffPlan.alias});
    this.other = server.createList('tp-destination-rate', 2, {tpid: 'other'});
    await authenticateSession({email: 'user@example.com'});
  });

  describe('visit /tariff-plans/1/tp-destination-rates', () =>
    it('renders table with tp-destination-rates', async function () {
      await visit('/tariff-plans/1/tp-destination-rates');
      expect(find('main h2').textContent).to.eq('TpDestinationRates list');
      expect(findAll('table tbody tr').length).to.eq(2);
    })
  );

  describe('select tp-destination-rate', () =>
    it('reditects to tp-destination-rate page', async function () {
      await visit('/tariff-plans/1/tp-destination-rates');
      await click('table tbody tr:first-child td:first-child a');
      expect(currentRouteName()).to.equal('tariff-plan.tp-destination-rates.tp-destination-rate.index');
    })
  );

  describe('click edit button', () =>
    it('reditects to edit tp-destination-rate page', async function () {
      await visit('/tariff-plans/1/tp-destination-rates');
      await click('[data-test-tp-destination-rate-edit]');
      expect(currentRouteName()).to.equal('tariff-plan.tp-destination-rates.tp-destination-rate.edit');
    })
  );

  describe('click remove button', () =>
    it('removes tp-destination-rate', async function () {
      await visit('/tariff-plans/1/tp-destination-rates');
      await click('[data-test-tp-destination-rate-remove]');
      expect(findAll('table tbody tr').length).to.eq(1);
    })
  );

  describe('click add button', () =>
    it('redirects to new tp-destination-rate page', async function () {
      await visit('/tariff-plans/1/tp-destination-rates');
      await click('[data-test-tp-destination-rate-add]');
      expect(currentRouteName()).to.equal('tariff-plan.tp-destination-rates.new');
    })
  );

  describe('set filters and click search button', () =>
    it('makes a correct filter query', async function () {
      let counter = 0;

      server.get('/tp-destination-rates/', function (schema, request) {
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

      await visit('/tariff-plans/1/tp-destination-rates');
      await fillIn('[data-test-filter-tag] input', 'tagtest');
      await fillIn('[data-test-filter-rates-tag] input', 'ratetest');
      await fillIn('[data-test-filter-destinations-tag] input', 'destinationtest');
      await fillIn('[data-test-filter-rounding-decimals] input', '1');
      await fillIn('[data-test-filter-max-cost] input', '100.0');
      await selectChoose('[data-test-filter-rounding-method]', '*up');
      await selectChoose('[data-test-filter-max-cost-strategy]', '*free');
      await click('[data-test-filter-search-btn]');
      expect(counter).to.eq(2);
    })
  );

  describe('click column header', () =>
    it('makes a correct sort query', async function () {
      let counter = 0;

      server.get('/tp-destination-rates/', function (schema, request) {
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

      await visit('/tariff-plans/1/tp-destination-rates');
      await click('[data-test-sort-tag] a');
      await click('[data-test-sort-tag] a');
      expect(counter).to.eq(3);
    })
  );

  describe('click pagination link', () =>
    it('makes a correct pagination query', async function () {
      let counter = 0;

      server.get('/tp-destination-rates/', function (schema, request) {
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

      await visit('/tariff-plans/1/tp-destination-rates');
      await click('[data-test-pagination-forward]');
      expect(counter).to.eq(2);
    })
  );
});
