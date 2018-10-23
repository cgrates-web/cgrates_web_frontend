import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';
import { setupApplicationTest } from 'ember-mocha';
import { authenticateSession } from 'ember-simple-auth/test-support';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { isBlank } from '@ember/utils';
import { visit, click, find, findAll, currentRouteName, fillIn } from '@ember/test-helpers';

describe("Acceptance: TpSuppliers.Index", function() {
  let hooks = setupApplicationTest();
  setupMirage(hooks);

  beforeEach(async function() {
    this.tariffPlan = server.create('tariff-plan', {id: '1', name: 'Test', alias: 'tptest'});
    server.createList('tp-supplier', 2, {tpid: this.tariffPlan.alias});
    await authenticateSession({email: "user@example.com"});
  });

  describe('visit /tariff-plans/1/tp-suppliers', function () {
    it("renders table with tp-suppliers", async function () {
      await visit('/tariff-plans/1/tp-suppliers');
      expect(find('main h2').textContent).to.eq('Suppliers list');
      expect(findAll('table tbody tr').length).to.eq(2);
    })
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
    it('reditects to tp-supplier page', async function() {
      await visit('/tariff-plans/1/tp-suppliers');
      await click('table tbody tr:first-child td:first-child a');
      expect(currentRouteName()).to.equal('tariff-plan.tp-suppliers.tp-supplier.index');
    })
  );

  describe('click edit button', () =>
    it('reditects to edit tp-supplier page', async function() {
      await visit('/tariff-plans/1/tp-suppliers');
      await click('[data-test-tp-supplier-edit]');
      expect(currentRouteName()).to.equal('tariff-plan.tp-suppliers.tp-supplier.edit');
    })
  );

  describe('click remove button', () =>
    it('removes tp-supplier', async function() {
      await visit('/tariff-plans/1/tp-suppliers');
      await click('[data-test-tp-supplier-remove]');
      expect(findAll('table tbody tr').length).to.eq(1);
    })
  );

  describe('click add button', () =>
    it('redirects to new tp-supplier page', async function() {
      await visit('/tariff-plans/1/tp-suppliers');
      await click('[data-test-tp-supplier-add]');
      expect(currentRouteName()).to.equal('tariff-plan.tp-suppliers.new');
    })
  );

  describe('set filters and click search button', () =>
    it('makes a correct filter query', async function() {
      let counter = 0;

      server.get('/tp-suppliers/', function(schema, request) {
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
            expect(filterCustomId).to.eq('customId');
            expect(filterFilterIds).to.eq('12, 17');
            expect(filterSorting).to.eq('sorting');
            expect(filterSupplierId).to.eq('supplier_id');
            expect(filterWeight).to.eq('weight');
            expect(filterSupplierWeight).to.eq('supplier_weight');
            expect(filterActivationInterval).to.eq('activation_interval');
            expect(filterSortingParameters).to.eq('sorting_parameters');
            expect(filterSupplierFilterIds).to.eq('supplier_filter_ids');
            expect(filterSupplierAccountIds).to.eq('supplier_account_ids');
            expect(filterSupplierRatingplanIds).to.eq('supplier_ratingplan_ids');
            expect(filterSupplierResourceIds).to.eq('supplier_resource_ids');
            expect(filterSupplierStatIds).to.eq('supplier_stat_ids');
        }
        return { data: [{id: '1', type: 'tp-supplier'}] };
      });

      await visit('/tariff-plans/1/tp-suppliers');
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
      await click('[data-test-filter-search-btn]');
      expect(counter).to.eq(2);
    })
  );

  describe('click column header', () =>
    it('makes a correct sort query', async function() {
      let counter = 0;

      server.get('/tp-suppliers/', function(schema, request) {
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
    it('makes a correct pagination query', async function() {
      let counter = 0;

      server.get('/tp-suppliers/', function(schema, request) {
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
