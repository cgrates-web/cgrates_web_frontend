import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';
import { setupApplicationTest } from 'ember-mocha';
import { authenticateSession } from 'ember-simple-auth/test-support';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { visit, click, find, findAll, currentRouteName, fillIn } from '@ember/test-helpers';
import { isBlank } from '@ember/utils';
import { selectChoose } from 'ember-power-select/test-support/helpers';

describe("Acceptance: TpFilters.Index", function() {
  let hooks = setupApplicationTest();
  setupMirage(hooks);

  beforeEach(async function() {
    this.tariffPlan = server.create('tariff-plan', {id: '1', name: 'Test', alias: 'tptest'});
    server.createList('tp-filter', 2, {tpid: this.tariffPlan.alias});
    server.createList('tp-filter', 2, {tpid: 'other'});
    await authenticateSession({email: "user@example.com"});
  });

  describe('visit /tariff-plans/1/tp-filters', () =>
    it("renders table with tp-filters", async function() {
      await visit('/tariff-plans/1/tp-filters');
      expect(find('main h2').textContent).to.eq('TpFilters list');
      expect(findAll('table tbody tr').length).to.eq(2);
    })
  );

  describe('server responsed with meta: total_records', function () {
    it('displays total records', async function () {
      server.get('/tp-filters', function () {
        return { data: [], meta: { total_records: 55 } };
      });
      await visit('/tariff-plans/1/tp-filters');
      expect(find('.tp-total-records').textContent.trim()).to.eq('Total: 55');
    });
  });

  describe('select tp-filter', () =>
    it('reditects to tp-filter page', async function() {
      await visit('/tariff-plans/1/tp-filters');
      await click('table tbody tr:first-child td:first-child a');
      expect(currentRouteName()).to.equal('tariff-plan.tp-filters.tp-filter.index');
    })
  );

  describe('click edit button', () =>
    it('reditects to edit tp-filter page', async function() {
      await visit('/tariff-plans/1/tp-filters');
      await click('[data-test-tp-filter-edit]');
      expect(currentRouteName()).to.equal('tariff-plan.tp-filters.tp-filter.edit');
    })
  );

  describe('click remove button', () =>
    it('removes tp-filter', async function() {
      await visit('/tariff-plans/1/tp-filters');
      await click('[data-test-tp-filter-remove]');
      expect(findAll('table tbody tr').length).to.eq(1);
    })
  );

  describe('click add button', () =>
    it('redirects to new tp-filter page', async function() {
      await visit('/tariff-plans/1/tp-filters');
      await click('[data-test-tp-filter-add]');
      expect(currentRouteName()).to.equal('tariff-plan.tp-filters.new');
    })
  );

  describe('set filters and click search button', () =>
    it('makes a correct filter query', async function() {
      let counter = 0;
      server.get('/tp-filters/', function(schema, request) {
        counter = counter + 1;
        const tenant = request.queryParams['filter[tenant]'];
        const id = request.queryParams['filter[id]'];
        const filterType = request.queryParams['filter[filter_type]'];
        const filterFieldName = request.queryParams['filter[filter_field_name]'];
        const activationInterval = request.queryParams['filter[activation_interval]'];
        switch (counter) {
          case 1:
            expect(isBlank(tenant)).to.eq(true);
            expect(isBlank(id)).to.eq(true);
            expect(isBlank(filterType)).to.eq(true);
            expect(isBlank(filterFieldName)).to.eq(true);
            expect(isBlank(activationInterval)).to.eq(true);
            break;
          default:
            expect(tenant).to.eq('tagtest');
            expect(id).to.eq('60');
            expect(filterType).to.eq('*string');
            expect(filterFieldName).to.eq('0.01');
            expect(activationInterval).to.eq('0.01');
        }
        return { data: [{id: '1', type: 'tp-filter'}] };
      });

      await visit('/tariff-plans/1/tp-filters');
      await fillIn('[data-test-filter-tenant] input', 'tagtest');
      await fillIn('[data-test-filter-id] input', '60');
      await fillIn('[data-test-filter-field-name] input', '0.01');
      await fillIn('[data-test-filter-activation-interval] input', '0.01');
      await selectChoose('[data-test-filter-fitertype]', '*string');
      await click('[data-test-filter-search-btn]');
      expect(counter).to.eq(2);
    })
  );

  describe('click column header', () =>
    it('makes a correct sort query', async function() {
      let counter = 0;

      server.get('/tp-filters/', function(schema, request) {
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
        return { data: [{id: '1', type: 'tp-filter'}] };
      });

      await visit('/tariff-plans/1/tp-filters');
      await click('[data-test-sort-tenant] a');
      await click('[data-test-sort-tenant] a');
      expect(counter).to.eq(3);
    })
  );

  return describe('click pagination link', () =>
    it('makes a correct pagination query', async function() {
      let counter = 0;

      server.get('/tp-filters/', function(schema, request) {
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
        return { data: [{id: '1', type: 'tp-filter'}], meta: {total_pages: 2} };
      });

      await visit('/tariff-plans/1/tp-filters');
      await click('[data-test-pagination-forward]');
      expect(counter).to.eq(2);
    })
  );
});
