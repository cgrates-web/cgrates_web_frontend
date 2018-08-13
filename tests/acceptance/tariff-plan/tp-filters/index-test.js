import { describe, it, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import startApp from 'cgrates-web-frontend/tests/helpers/start-app';
import destroyApp from 'cgrates-web-frontend/tests/helpers/destroy-app';
import { isBlank } from '@ember/utils';
import { authenticateSession } from 'cgrates-web-frontend/tests/helpers/ember-simple-auth';

describe("Acceptance: TpFilters.Index", function() {
  beforeEach(function() {
    this.App = startApp();
    this.tariffPlan = server.create('tariff-plan', {name: 'Test', alias: 'tptest'});
    server.createList('tp-filter', 2, {tpid: this.tariffPlan.alias});
    server.createList('tp-filter', 2, {tpid: 'other'});
    authenticateSession(this.App, {email: "user@example.com"});
  });

  afterEach(function () {
    destroyApp(this.App);
  });

  describe('visit /tariff-plans/1/tp-filters', () =>
    it("renders table with tp-filters", function() {
      visit('/tariff-plans/1/tp-filters');
      return andThen(function() {
        expect(find('main h2').text()).to.eq('Filters list');
        return expect(find('table tbody tr').length).to.eq(2);
      });
    })
  );

  describe('select tp-filter', () =>
    it('reditects to tp-filter page', function() {
      visit('/tariff-plans/1/tp-filters');
      click('table tbody tr:first-child td:first-child a');
      return andThen(() => expect(currentPath()).to.equal("tariff-plans.tariff-plan.tp-filters.tp-filter.index"));
    })
  );

  describe('click edit button', () =>
    it('reditects to edit tp-filter page', function() {
      visit('/tariff-plans/1/tp-filters');
      click('table tbody tr:first-child a.edit');
      return andThen(() => expect(currentPath()).to.equal('tariff-plans.tariff-plan.tp-filters.tp-filter.edit'));
    })
  );

  describe('click remove button', () =>
    it('removes tp-filter', function() {
      visit('/tariff-plans/1/tp-filters');
      click('table tbody tr:first-child a.remove');
      return andThen(() => expect(find('table tbody tr').length).to.eq(1));
    })
  );

  describe('click add button', () =>
    it('redirects to new tp-filter page', function() {
      visit('/tariff-plans/1/tp-filters');
      click('.fixed-action-btn a');
      return andThen(() => expect(currentPath()).to.equal('tariff-plans.tariff-plan.tp-filters.new'));
    })
  );

  describe('set filters and click search button', () =>
    it('makes a correct filter query', function() {
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

      visit('/tariff-plans/1/tp-filters');
      return andThen(function() {
        fillIn(`#${find("label:contains('Tenant')").attr('for')}`, 'tagtest');
        fillIn(`#${find("label:contains('ID')").attr('for')}`, '60');
        fillIn(`#${find("label:contains('Filter field name')").attr('for')}`, '0.01');
        fillIn(`#${find("label:contains('Activation interval')").attr('for')}`, '0.01');
        selectChoose('.fiter-type-select', '*string');
        click('button.search-button');
        return andThen(() => expect(counter).to.eq(2));
      });
    })
  );

  describe('click column header', () =>
    it('makes a correct sort query', function() {
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

      visit('/tariff-plans/1/tp-filters');
      click(".sort-header a:contains('Tenant')");
      click(".sort-header a:contains('Tenant')");
      return andThen(() => expect(counter).to.eq(3));
    })
  );

  return describe('click pagination link', () =>
    it('makes a correct pagination query', function() {
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

      visit('/tariff-plans/1/tp-filters');
      click("ul.pagination li a:contains('2')");
      return andThen(() => expect(counter).to.eq(2));
    })
  );
});
