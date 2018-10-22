import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';
import { setupApplicationTest } from 'ember-mocha';
import { authenticateSession } from 'ember-simple-auth/test-support';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { visit, click, find, findAll, currentRouteName, fillIn, currentURL } from '@ember/test-helpers';
import { isBlank } from '@ember/utils';

describe("Acceptance: TpDestinations.Index", function() {
  let hooks = setupApplicationTest();
  setupMirage(hooks);

  beforeEach(async function() {
    this.tariffPlan = server.create('tariff-plan', {id: '1', name: 'Test', alias: 'tptest'});
    this.tpDestinations = server.createList('tp-destination', 2, {tpid: this.tariffPlan.alias});
    this.other = server.createList('tp-destination', 2, {tpid: 'other'});
    await authenticateSession({email: "user@example.com"});
  });

  describe('visit /tariff-plans/1/tp-destinations', () =>
    it("renders table with tp-destinations", async function() {
      await visit('/tariff-plans/1/tp-destinations');
      expect(find('main h2').textContent).to.eq('TpDestinations list');
      expect(findAll('table tbody tr').length).to.eq(2);
    })
  );

  describe('select tp-destination', () =>
    it('reditects to tp-destination page', async function() {
      await visit('/tariff-plans/1/tp-destinations');
      await click('table tbody tr:first-child td:first-child a');
      expect(currentRouteName()).to.equal('tariff-plan.tp-destinations.tp-destination.index');
    })
  );

  describe('click edit button', () =>
    it('reditects to edit tp-destination page', async function() {
      await visit('/tariff-plans/1/tp-destinations');
      await click('[data-test-destination-edit]');
      expect(currentRouteName()).to.equal('tariff-plan.tp-destinations.tp-destination.edit');
    })
  );

  describe('click remove button', () =>
    it('removes tp-destination', async function() {
      await visit('/tariff-plans/1/tp-destinations');
      await click('[data-test-destination-remove]');
      expect(findAll('table tbody tr').length).to.eq(1);
    })
  );

  describe('click add button', () =>
    it('redirects to new tp-destination page', async function() {
      await visit('/tariff-plans/1/tp-destinations');
      await click('[data-test-add]');
      expect(currentRouteName()).to.equal('tariff-plan.tp-destinations.new');
    })
  );

  const setFilters = async () => {
    await fillIn('[data-test-filter-tag] input', 'tagtest');
    await fillIn('[data-test-filter-prefix] input', '+44');
  };
  const expectFiltersQueryParams = (request) => {
    expect(request.queryParams['tpid']).to.eq('tptest');
    expect(request.queryParams['filter[tag]']).to.eq('tagtest');
    expect(request.queryParams['filter[prefix]']).to.eq('+44');
  };

  describe('set filters and click search button', () =>
    it('makes a correct filter query', async function() {
      let counter = 0;

      server.get('/tp-destinations/', function(schema, request) {
        counter = counter + 1;
        const filterTag = request.queryParams['filter[tag]'];
        const filterPrefix = request.queryParams['filter[prefix]'];
        switch (counter) {
          case 1:
            expect(isBlank(filterTag)).to.eq(true);
            expect(isBlank(filterPrefix)).to.eq(true);
            break;
          default:
            expectFiltersQueryParams(request);
        }
        return { data: [{id: '1', type: 'tp-destination'}] };
      });

      await visit('/tariff-plans/1/tp-destinations');
      await setFilters();
      await click('[data-test-filter-search-btn]');
      expect(counter).to.eq(2);
    })
  );

  describe('filter and click download csv', function () {
    it('sends request to the server with filters', async function () {
      let expectRequestToBeCorrect = () => expect(false).to.eq(true);
      server.get('/tp-destinations/export-to-csv/', function (_schema, request) {
        expectRequestToBeCorrect = () => {
          expectFiltersQueryParams(request);
        };
        return { data: [{id: '1', type: 'tp-destination'}] };
      });
      await visit('/tariff-plans/1/tp-destinations');
      await setFilters();
      await click('[data-test-filter-search-btn]');
      await click('[data-test-download]');
      expectRequestToBeCorrect();
    });
  });

  describe('click to upload csv link', function () {
    it('redirects to upload csv page', async function() {
      await visit('/tariff-plans/1/tp-destinations');
      await click('[data-test-upload]');
      expect(currentURL()).to.eq('/tariff-plans/1/tp-destinations/csv-import');
    });
  });

  describe('click refresh button', function () {
    it('makes a correct query', async function() {
      let expectRequestToBeCorrect = () => expect(false).to.eq(true);
      server.get('/tp-destinations/', function (_schema, request) {
        expectRequestToBeCorrect = () => {
          expectFiltersQueryParams(request);
        };
        return { data: [{id: '1', type: 'tp-destination'}] };
      });
      await visit('/tariff-plans/1/tp-destinations');
      await setFilters();
      await click('[data-test-filter-search-btn]');
      await click('[data-test-refresh]');
      expectRequestToBeCorrect();
    });
  });

  describe('filter and delete all', function () {
    let expectRequestToBeCorrect = () => expect(false).to.eq(true);
    beforeEach(async function() {
      server.post('/tp-destinations/delete-all', function (_schema, request) {
        expectRequestToBeCorrect = () => {
          const params = JSON.parse(request.requestBody);
          expect(params.tpid).to.eq('tptest');
          expect(params.filter.tag).to.eq('tagtest');
          expect(params.filter.prefix).to.eq('+44');
        };
        return { tp_destination: { id: '0' } };
      });
      await visit('/tariff-plans/1/tp-destinations');
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
    it('makes a correct sort query', async function() {
      let counter = 0;

      server.get('/tp-destinations/', function(schema, request) {
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
        return { data: [{id: '1', type: 'tp-destination'}] };
      });

      await visit('/tariff-plans/1/tp-destinations');
      await click('[data-test-sort-tag] a');
      await click('[data-test-sort-tag] a');
      expect(counter).to.eq(3);
    })
  );

  describe('click pagination link', () =>
    it('makes a correct pagination query', async function() {
      let counter = 0;

      server.get('/tp-destinations/', function(schema, request) {
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
        return { data: [{id: '1', type: 'tp-destination'}], meta: {total_pages: 2} };
      });

      await visit('/tariff-plans/1/tp-destinations');
      await click('[data-test-pagination-forward]');
      expect(counter).to.eq(2);
    })
  );
});
