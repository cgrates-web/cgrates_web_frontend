import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';
import { setupApplicationTest } from 'ember-mocha';
import { authenticateSession } from 'ember-simple-auth/test-support';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { visit, click, find, findAll, currentRouteName, fillIn, currentURL } from '@ember/test-helpers';
import { isBlank } from '@ember/utils';

describe('Acceptance: TpRates.Index', function () {
  let hooks = setupApplicationTest();
  setupMirage(hooks);

  beforeEach(async function () {
    this.tariffPlan = server.create('tariff-plan', {id: '1', name: 'Test', alias: 'tptest'});
    this.tpRates = server.createList('tp-rate', 2, {tpid: this.tariffPlan.alias});
    this.other = server.createList('tp-rate', 2, {tpid: 'other'});
    await authenticateSession({email: 'user@example.com'});
  });

  describe('visit /tariff-plans/1/tp-rates', () =>
    it('renders table with tp-rates', async function () {
      await visit('/tariff-plans/1/tp-rates');
      expect(find('main h2').textContent).to.eq('TpRates list');
      expect(findAll('table tbody tr').length).to.eq(2);
    })
  );

  describe('select tp-rate', () =>
    it('reditects to tp-rate page', async function () {
      await visit('/tariff-plans/1/tp-rates');
      await  click('table tbody tr:first-child td:first-child a');
      expect(currentRouteName()).to.equal('tariff-plan.tp-rates.tp-rate.index');
    })
  );

  describe('click edit button', () =>
    it('reditects to edit tp-rate page', async function () {
      await visit('/tariff-plans/1/tp-rates');
      await click('[data-test-tp-rate-edit]');
      expect(currentRouteName()).to.equal('tariff-plan.tp-rates.tp-rate.edit');
    })
  );

  describe('click remove button', () =>
    it('removes tp-rate', async function () {
      await visit('/tariff-plans/1/tp-rates');
      await click('[data-test-tp-rate-remove]');
      expect(findAll('table tbody tr').length).to.eq(1);
    })
  );

  describe('click add button', () =>
    it('redirects to new tp-rate page', async function () {
      await visit('/tariff-plans/1/tp-rates');
      await click('[data-test-add]');
      expect(currentRouteName()).to.equal('tariff-plan.tp-rates.new');
    })
  );

  const setFilters = async () => {
    await fillIn('[data-test-filter-tag] input', 'tagtest');
    await fillIn('[data-test-filter-rate-unit] input', '60');
    await fillIn('[data-test-filter-rate-increment] input', '60');
    await fillIn('[data-test-filter-rate] input', '0.01');
    await fillIn('[data-test-filter-group-interval-start] input', '50');
    await fillIn('[data-test-filter-connect-fee] input', '0.02');
  };
  const expectFiltersQueryParams = (request) => {
    expect(request.queryParams['tpid']).to.eq('tptest');
    expect(request.queryParams['filter[tag]']).to.eq('tagtest');
    expect(request.queryParams['filter[rate_unit]']).to.eq('60s');
    expect(request.queryParams['filter[rate_increment]']).to.eq('60s');
    expect(request.queryParams['filter[rate]']).to.eq('0.01');
    expect(request.queryParams['filter[group_interval_start]']).to.eq('50s');
    expect(request.queryParams['filter[connect_fee]']).to.eq('0.02');
  };

  describe('set filters and click search button', () =>
    it('makes a correct filter query', async function () {
      let counter = 0;

      server.get('/tp-rates/', function (schema, request) {
        counter = counter + 1;
        const filterTag = request.queryParams['filter[tag]'];
        const filterRateUnit = request.queryParams['filter[rate_unit]'];
        const filterRateIncrement = request.queryParams['filter[rate_increment]'];
        const filterRate = request.queryParams['filter[rate]'];
        const filterGroupIntervalStart = request.queryParams['filter[group_interval_start]'];
        const filterConnectFee = request.queryParams['filter[connect_fee]'];
        switch (counter) {
          case 1:
            expect(isBlank(filterTag)).to.eq(true);
            expect(isBlank(filterRateUnit)).to.eq(true);
            expect(isBlank(filterRateIncrement)).to.eq(true);
            expect(isBlank(filterRate)).to.eq(true);
            expect(isBlank(filterGroupIntervalStart)).to.eq(true);
            expect(isBlank(filterConnectFee)).to.eq(true);
            break;
          default:
            expectFiltersQueryParams(request);
        }
        return { data: [{id: '1', type: 'tp-rate'}] };
      });

      await visit('/tariff-plans/1/tp-rates');
      await setFilters();
      await click('[data-test-filter-search-btn]');
      expect(counter).to.eq(2);
    })
  );

  describe('filter and click download csv', function () {
    it('sends request to the server with filters', async function () {
      let expectRequestToBeCorrect = () => expect(false).to.eq(true);
      server.get('/tp-rates/export-to-csv/', function (_schema, request) {
        expectRequestToBeCorrect = () => {
          expectFiltersQueryParams(request);
        };
        return { data: [{id: '1', type: 'tp-rate'}] };
      });
      await visit('/tariff-plans/1/tp-rates');
      await setFilters();
      await click('[data-test-filter-search-btn]');
      await click('[data-test-download]');
      expectRequestToBeCorrect();
    });
  });

  describe('click to upload csv link', function () {
    it('redirects to upload csv page', async function () {
      await visit('/tariff-plans/1/tp-rates');
      await click('[data-test-upload]');
      expect(currentURL()).to.eq('/tariff-plans/1/tp-rates/csv-import');
    });
  });

  describe('click refresh button', function () {
    it('makes a correct query', async function () {
      let expectRequestToBeCorrect = () => expect(false).to.eq(true);
      server.get('/tp-rates', function (_schema, request) {
        expectRequestToBeCorrect = () => {
          expectFiltersQueryParams(request);
        };
        return { data: [{id: '1', type: 'tp-rate'}] };
      });
      await visit('/tariff-plans/1/tp-rates');
      await setFilters();
      await click('[data-test-filter-search-btn]');
      await click('[data-test-refresh]');
      expectRequestToBeCorrect();
    });
  });

  describe('filter and delete all', function () {
    let expectRequestToBeCorrect = () => expect(false).to.eq(true);
    beforeEach(async function () {
      server.post('/tp-rates/delete-all', function (_schema, request) {
        expectRequestToBeCorrect = () => {
          const params = JSON.parse(request.requestBody);
          expect(params.tpid).to.eq('tptest');
          expect(params.filter.tag).to.eq('tagtest');
          expect(params.filter.rate_unit).to.eq('60s');
          expect(params.filter.rate_increment).to.eq('60s');
          expect(params.filter.rate).to.eq('0.01');
          expect(params.filter.group_interval_start).to.eq('50s');
          expect(params.filter.connect_fee).to.eq('0.02');
        };
        return { tp_rate: { id: '0' } };
      });
      await visit('/tariff-plans/1/tp-rates');
      await setFilters();
      await click('[data-test-filter-search-btn]');
      await click('[data-test-delete-all]');
    });
    it('sends request to the server with filters', function () {
      expectRequestToBeCorrect();
    });
    it('shows success flash message', function () {
      expect(find('.flash-message.alert-success')).to.exist;
    });
  });

  describe('click column header', () =>
    it('makes a correct sort query', async function () {
      let counter = 0;

      server.get('/tp-rates/', function (schema, request) {
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
        return { data: [{id: '1', type: 'tp-rate'}] };
      });

      await visit('/tariff-plans/1/tp-rates');
      await click('[data-test-sort-tag] a');
      await click('[data-test-sort-tag] a');
      expect(counter).to.eq(3);
    })
  );

  return describe('click pagination link', () =>
    it('makes a correct pagination query', async function () {
      let counter = 0;

      server.get('/tp-rates/', function (schema, request) {
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
        return { data: [{id: '1', type: 'tp-rate'}], meta: {total_pages: 2} };
      });

      await visit('/tariff-plans/1/tp-rates');
      await click('[data-test-pagination-forward]');
      expect(counter).to.eq(2);
    })
  );
});
