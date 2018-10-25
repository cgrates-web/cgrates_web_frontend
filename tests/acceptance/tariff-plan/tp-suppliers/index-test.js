import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';
import { setupApplicationTest } from 'ember-mocha';
import { authenticateSession } from 'ember-simple-auth/test-support';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { isBlank } from '@ember/utils';
import { visit, click, find, findAll, currentRouteName, fillIn, currentURL } from '@ember/test-helpers';

describe('Acceptance: TpSuppliers.Index', function () {
  let hooks = setupApplicationTest();
  setupMirage(hooks);

  beforeEach(async function () {
    this.tariffPlan = server.create('tariff-plan', {id: '1', name: 'Test', alias: 'tptest'});
    server.createList('tp-supplier', 2, {tpid: this.tariffPlan.alias});
    await authenticateSession({email: 'user@example.com'});
  });

  describe('visit /tariff-plans/1/tp-suppliers', function () {
    it('renders table with tp-suppliers', async function () {
      await visit('/tariff-plans/1/tp-suppliers');
      expect(find('main h2').textContent).to.eq('Suppliers list');
      expect(findAll('table tbody tr').length).to.eq(2);
    });
  });

  describe('server responsed with meta: total_records', function () {
    it('displays total records', async function () {
      server.get('/tp-suppliers', function () {
        return { data: [], meta: { total_records: 55 } };
      });
      await visit('/tariff-plans/1/tp-suppliers');
      expect(find('.tp-total-records').textContent.trim()).to.eq('Total: 55');
    });
  });

  describe('select tp-supplier', () =>
    it('reditects to tp-supplier page', async function () {
      await visit('/tariff-plans/1/tp-suppliers');
      await click('table tbody tr:first-child td:first-child a');
      expect(currentRouteName()).to.equal('tariff-plan.tp-suppliers.tp-supplier.index');
    })
  );

  describe('click edit button', () =>
    it('reditects to edit tp-supplier page', async function () {
      await visit('/tariff-plans/1/tp-suppliers');
      await click('[data-test-tp-supplier-edit]');
      expect(currentRouteName()).to.equal('tariff-plan.tp-suppliers.tp-supplier.edit');
    })
  );

  describe('click remove button', () =>
    it('removes tp-supplier', async function () {
      await visit('/tariff-plans/1/tp-suppliers');
      await click('[data-test-tp-supplier-remove]');
      expect(findAll('table tbody tr').length).to.eq(1);
    })
  );

  describe('click add button', () =>
    it('redirects to new tp-supplier page', async function () {
      await visit('/tariff-plans/1/tp-suppliers');
      await click('[data-test-add]');
      expect(currentRouteName()).to.equal('tariff-plan.tp-suppliers.new');
    })
  );

  const setFilters = async () => {
    await fillIn('[data-test-filter-custom-id] input', 'customId');
    await fillIn('[data-test-filter-filter-ids] input', '12, 17');
    await fillIn('[data-test-filter-sorting] input', 'sorting');
    await fillIn('[data-test-filter-supplier-id] input', 'supplier_id');
    await fillIn('[data-test-filter-weight] input', 'weight');
    await fillIn('[data-test-filter-supplier-weight] input', 'supplier_weight');
    await fillIn('[data-test-filter-activation-interval] input', 'activation_interval');
    await fillIn('[data-test-filter-sorting-parameters] input', 'sorting_parameters');
    await fillIn('[data-test-filter-supplier-filter-ids] input', 'supplier_filter_ids');
    await fillIn('[data-test-filter-supplier-account-ids] input', 'supplier_account_ids');
    await fillIn('[data-test-filter-supplier-ratingplan-ids] input', 'supplier_ratingplan_ids');
    await fillIn('[data-test-filter-supplier-resource-ids] input', 'supplier_resource_ids');
    await fillIn('[data-test-filter-supplier-stat-ids] input', 'supplier_stat_ids');
  };
  const expectFiltersQueryParams = (request) => {
    expect(request.queryParams['tpid']).to.eq('tptest');
    expect(request.queryParams['filter[custom_id]']).to.eq('customId');
    expect(request.queryParams['filter[filter_ids]']).to.eq('12, 17');
    expect(request.queryParams['filter[sorting]']).to.eq('sorting');
    expect(request.queryParams['filter[supplier_id]']).to.eq('supplier_id');
    expect(request.queryParams['filter[weight]']).to.eq('weight');
    expect(request.queryParams['filter[supplier_weight]']).to.eq('supplier_weight');
    expect(request.queryParams['filter[activation_interval]']).to.eq('activation_interval');
    expect(request.queryParams['filter[sorting_parameters]']).to.eq('sorting_parameters');
    expect(request.queryParams['filter[supplier_filter_ids]']).to.eq('supplier_filter_ids');
    expect(request.queryParams['filter[supplier_account_ids]']).to.eq('supplier_account_ids');
    expect(request.queryParams['filter[supplier_ratingplan_ids]']).to.eq('supplier_ratingplan_ids');
    expect(request.queryParams['filter[supplier_resource_ids]']).to.eq('supplier_resource_ids');
    expect(request.queryParams['filter[supplier_stat_ids]']).to.eq('supplier_stat_ids');
  };

  describe('set filters and click search button', () =>
    it('makes a correct filter query', async function () {
      let counter = 0;

      server.get('/tp-suppliers/', function (schema, request) {
        counter = counter + 1;
        const filterCustomId = request.queryParams['filter[custom_id]'];
        const filterFilterIds = request.queryParams['filter[filter_ids]'];
        const filterSorting = request.queryParams['filter[sorting]'];
        const filterSupplierId = request.queryParams['filter[supplier_id]'];
        const filterWeight = request.queryParams['filter[weight]'];
        const filterSupplierWeight = request.queryParams['filter[supplier_weight]'];
        const filterActivationInterval = request.queryParams['filter[activation_interval]'];
        const filterSortingParameters = request.queryParams['filter[sorting_parameters]'];
        const filterSupplierFilterIds = request.queryParams['filter[supplier_filter_ids]'];
        const filterSupplierAccountIds = request.queryParams['filter[supplier_account_ids]'];
        const filterSupplierRatingplanIds = request.queryParams['filter[supplier_ratingplan_ids]'];
        const filterSupplierResourceIds = request.queryParams['filter[supplier_resource_ids]'];
        const filterSupplierStatIds = request.queryParams['filter[supplier_stat_ids]'];
        switch (counter) {
          case 1:
            expect(isBlank(filterCustomId)).to.eq(true);
            expect(isBlank(filterFilterIds)).to.eq(true);
            expect(isBlank(filterSorting)).to.eq(true);
            expect(isBlank(filterSupplierId)).to.eq(true);
            expect(isBlank(filterWeight)).to.eq(true);
            expect(isBlank(filterSupplierWeight)).to.eq(true);
            expect(isBlank(filterActivationInterval)).to.eq(true);
            expect(isBlank(filterSortingParameters)).to.eq(true);
            expect(isBlank(filterSupplierFilterIds)).to.eq(true);
            expect(isBlank(filterSupplierAccountIds)).to.eq(true);
            expect(isBlank(filterSupplierRatingplanIds)).to.eq(true);
            expect(isBlank(filterSupplierResourceIds)).to.eq(true);
            expect(isBlank(filterSupplierStatIds)).to.eq(true);
            break;
          default:
            expectFiltersQueryParams(request);
        }
        return { data: [{id: '1', type: 'tp-supplier'}] };
      });

      await visit('/tariff-plans/1/tp-suppliers');
      await setFilters();
      await click('[data-test-filter-search-btn]');
      expect(counter).to.eq(2);
    })
  );


  describe('filter and click download csv', function () {
    it('sends request to the server with filters', async function () {
      let expectRequestToBeCorrect = () => expect(false).to.eq(true);
      server.get('/tp-suppliers/export-to-csv/', function (_schema, request) {
        expectRequestToBeCorrect = () => {
          expectFiltersQueryParams(request);
        };
        return { data: [{id: '1', type: 'ttp-supplier'}] };
      });
      await visit('/tariff-plans/1/tp-suppliers');
      await setFilters();
      await click('[data-test-filter-search-btn]');
      await click('[data-test-download]');
      expectRequestToBeCorrect();
    });
  });

  describe('click to upload csv link', function () {
    it('redirects to upload csv page', async function () {
      await visit('/tariff-plans/1/tp-suppliers');
      await click('[data-test-upload]');
      expect(currentURL()).to.eq('/tariff-plans/1/tp-suppliers/csv-import');
    });
  });

  describe('click refresh button', function () {
    it('makes a correct query', async function () {
      let expectRequestToBeCorrect = () => expect(false).to.eq(true);
      server.get('/tp-suppliers/', function (_schema, request) {
        expectRequestToBeCorrect = () => {
          expectFiltersQueryParams(request);
        };
        return { data: [{id: '1', type: 'tp-supplier'}] };
      });
      await visit('/tariff-plans/1/tp-suppliers');
      await setFilters();
      await click('[data-test-filter-search-btn]');
      await click('[data-test-refresh]');
      expectRequestToBeCorrect();
    });
  });

  describe('filter and delete all', function () {
    let expectRequestToBeCorrect = () => expect(false).to.eq(true);
    beforeEach(async function () {
      server.post('/tp-suppliers/delete-all', function (_schema, request) {
        expectRequestToBeCorrect = () => {
          const params = JSON.parse(request.requestBody);
          expect(params.tpid).to.eq('tptest');
          expect(params.filter.custom_id).to.eq('customId');
          expect(params.filter.filter_ids).to.eq('12, 17');
          expect(params.filter.sorting).to.eq('sorting');
          expect(params.filter.supplier_id).to.eq('supplier_id');
          expect(params.filter.weight).to.eq('weight');
          expect(params.filter.supplier_weight).to.eq('supplier_weight');
          expect(params.filter.activation_interval).to.eq('activation_interval');
          expect(params.filter.sorting_parameters).to.eq('sorting_parameters');
          expect(params.filter.supplier_filter_ids).to.eq('supplier_filter_ids');
          expect(params.filter.supplier_account_ids).to.eq('supplier_account_ids');
          expect(params.filter.supplier_ratingplan_ids).to.eq('supplier_ratingplan_ids');
          expect(params.filter.supplier_resource_ids).to.eq('supplier_resource_ids');
          expect(params.filter.supplier_stat_ids).to.eq('supplier_stat_ids');
        };
        return { tp_supplier: { id: '0' } };
      });
      await visit('/tariff-plans/1/tp-suppliers');
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

      server.get('/tp-suppliers/', function (schema, request) {
        counter = counter + 1;
        const sort = request.queryParams['sort'];
        switch (counter) {
          case 1:
            expect(sort).to.eq('id');
            break;
          case 2:
            expect(sort).to.eq('tenant');
            break;
          default:
            expect(sort).to.eq('-tenant');
        }
        return { data: [{id: '1', type: 'tp-supplier'}] };
      });

      await visit('/tariff-plans/1/tp-suppliers');
      await click('[data-test-sort-tenant] a');
      await click('[data-test-sort-tenant] a');
      expect(counter).to.eq(3);
    })
  );

  describe('click pagination link', () =>
    it('makes a correct pagination query', async function () {
      let counter = 0;

      server.get('/tp-suppliers/', function (schema, request) {
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
        return { data: [{id: '1', type: 'tp-supplier'}], meta: {total_pages: 2} };
      });

      await visit('/tariff-plans/1/tp-suppliers');
      await click('[data-test-pagination-forward]');
      expect(counter).to.eq(2);
    })
  );
});
