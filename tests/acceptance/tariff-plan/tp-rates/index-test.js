import { describe, it, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import startApp from 'cgrates-web-frontend/tests/helpers/start-app';
import destroyApp from 'cgrates-web-frontend/tests/helpers/destroy-app';
import { isBlank } from '@ember/utils';
import { authenticateSession } from 'cgrates-web-frontend/tests/helpers/ember-simple-auth';

describe("Acceptance: TpRates.Index", function() {
  beforeEach(function() {
    this.App = startApp();
    this.tariffPlan = server.create('tariff-plan', {name: 'Test', alias: 'tptest'});
    this.tpRates = server.createList('tp-rate', 2, {tpid: this.tariffPlan.alias});
    this.other = server.createList('tp-rate', 2, {tpid: 'other'});
    authenticateSession(this.App, {email: "user@example.com"});
  });

  afterEach(function () {
    destroyApp(this.App);
  });

  describe('visit /tariff-plans/1/tp-rates', () =>
    it("renders table with tp-rates", function() {
      visit('/tariff-plans/1/tp-rates');
      return andThen(function() {
        expect(find('main h2').text()).to.eq('TpRates list');
        return expect(find('table tbody tr').length).to.eq(2);
      });
    })
  );

  describe('select tp-rate', () =>
    it('reditects to tp-rate page', function() {
      visit('/tariff-plans/1/tp-rates');
      click('table tbody tr:first-child td:first-child a');
      return andThen(() => expect(currentPath()).to.equal("tariff-plans.tariff-plan.tp-rates.tp-rate.index"));
    })
  );

  describe('click edit button', () =>
    it('reditects to edit tp-rate page', function() {
      visit('/tariff-plans/1/tp-rates');
      click('table tbody tr:first-child a.edit');
      return andThen(() => expect(currentPath()).to.equal('tariff-plans.tariff-plan.tp-rates.tp-rate.edit'));
    })
  );

  describe('click remove button', () =>
    it('removes tp-rate', function() {
      visit('/tariff-plans/1/tp-rates');
      click('table tbody tr:first-child a.remove');
      return andThen(() => expect(find('table tbody tr').length).to.eq(1));
    })
  );

  describe('click add button', () =>
    it('redirects to new tp-rate page', function() {
      visit('/tariff-plans/1/tp-rates');
      click('.fixed-action-btn a');
      return andThen(() => expect(currentPath()).to.equal('tariff-plans.tariff-plan.tp-rates.new'));
    })
  );

  describe('set filters and click search button', () =>
    it('makes a correct filter query', function() {
      let counter = 0;

      server.get('/tp-rates/', function(schema, request) {
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
            expect(filterTag).to.eq('tagtest');
            expect(filterRateUnit).to.eq('60s');
            expect(filterRateIncrement).to.eq('60s');
            expect(filterRate).to.eq('0.01');
            expect(filterGroupIntervalStart).to.eq('60s');
            expect(filterConnectFee).to.eq('0.01');
        }
        return { data: [{id: '1', type: 'tp-rate'}] };
      });

      visit('/tariff-plans/1/tp-rates');
      return andThen(function() {
        fillIn(`#${find("label:contains('Tag')").attr('for')}`, 'tagtest');
        fillIn(`#${find("label:contains('Rate unit')").attr('for')}`, '60');
        fillIn(`#${find("label:contains('Rate increment')").attr('for')}`, '60');
        fillIn(`#${find("label:contains('Rate (value)')").attr('for')}`, '0.01');
        fillIn(`#${find("label:contains('Group interval start')").attr('for')}`, '60');
        fillIn(`#${find("label:contains('Connect fee')").attr('for')}`, '0.01');
        click('button.search-button');
        return andThen(() => expect(counter).to.eq(2));
      });
    })
  );

  describe('click column header', () =>
    it('makes a correct sort query', function() {
      let counter = 0;

      server.get('/tp-rates/', function(schema, request) {
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

      visit('/tariff-plans/1/tp-rates');
      click(".sort-header a:contains('Tag')");
      click(".sort-header a:contains('Tag')");
      return andThen(() => expect(counter).to.eq(3));
    })
  );

  return describe('click pagination link', () =>
    it('makes a correct pagination query', function() {
      let counter = 0;

      server.get('/tp-rates/', function(schema, request) {
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

      visit('/tariff-plans/1/tp-rates');
      click("ul.pagination li a:contains('2')");
      return andThen(() => expect(counter).to.eq(2));
    })
  );
});
