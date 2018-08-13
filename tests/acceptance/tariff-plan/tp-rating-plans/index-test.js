import { describe, it, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import startApp from 'cgrates-web-frontend/tests/helpers/start-app';
import destroyApp from 'cgrates-web-frontend/tests/helpers/destroy-app';
import { authenticateSession } from 'cgrates-web-frontend/tests/helpers/ember-simple-auth';
import { isBlank } from '@ember/utils';
import registerPowerSelectHelpers from 'cgrates-web-frontend/tests/helpers/ember-power-select';

registerPowerSelectHelpers();

describe("Acceptance: TpRatingPlans.Index", function() {
  beforeEach(function() {
    this.App = startApp();
    this.tariffPlan = server.create('tariff-plan', {name: 'Test', alias: 'tptest'});
    this.tpRatingPlans = server.createList('tp-rating-plan', 2, {tpid: this.tariffPlan.alias});
    this.other = server.createList('tp-rating-plan', 2, {tpid: 'other'});
    authenticateSession(this.App, {email: "user@example.com"});
  });

  afterEach(function () {
    destroyApp(this.App);
  });

  describe('visit /tariff-plans/1/tp-rating-plans', () =>
    it("renders table with tp-rating-plans", function() {
      visit('/tariff-plans/1/tp-rating-plans');
      return andThen(function() {
        expect(find('main h2').text()).to.eq('TpRatingPlans list');
        return expect(find('table tbody tr').length).to.eq(2);
      });
    })
  );

  describe('select tp-rating-plan', () =>
    it('reditects to tp-rating-plan page', function() {
      visit('/tariff-plans/1/tp-rating-plans');
      click('table tbody tr:first-child td:first-child a');
      return andThen(() => expect(currentPath()).to.equal("tariff-plans.tariff-plan.tp-rating-plans.tp-rating-plan.index"));
    })
  );

  describe('click edit button', () =>
    it('reditects to edit tp-rating-plan page', function() {
      visit('/tariff-plans/1/tp-rating-plans');
      click('table tbody tr:first-child a.edit');
      return andThen(() => expect(currentPath()).to.equal('tariff-plans.tariff-plan.tp-rating-plans.tp-rating-plan.edit'));
    })
  );

  describe('click remove button', () =>
    it('removes tp-rating-plan', function() {
      visit('/tariff-plans/1/tp-rating-plans');
      click('table tbody tr:first-child a.remove');
      return andThen(() => expect(find('table tbody tr').length).to.eq(1));
    })
  );

  describe('click add button', () =>
    it('redirects to new tp-rating-plan page', function() {
      visit('/tariff-plans/1/tp-rating-plans');
      click('.fixed-action-btn a');
      return andThen(() => expect(currentPath()).to.equal('tariff-plans.tariff-plan.tp-rating-plans.new'));
    })
  );

  describe('set filters and click search button', () =>
    it('makes a correct filter query', function() {
      let counter = 0;

      server.get('/tp-rating-plans/', function(schema, request) {
        counter = counter + 1;
        const filterTag = request.queryParams['filter[tag]'];
        const filterDestratesTag = request.queryParams['filter[destrates_tag]'];
        const filterTimingTag = request.queryParams['filter[timing_tag]'];
        const filterWeight = request.queryParams['filter[weight]'];
        switch (counter) {
          case 1:
            expect(isBlank(filterTag)).to.eq(true);
            expect(isBlank(filterDestratesTag)).to.eq(true);
            expect(isBlank(filterTimingTag)).to.eq(true);
            expect(isBlank(filterWeight)).to.eq(true);
            break;

          default:
            expect(filterTag).to.eq('tagtest');
            expect(filterDestratesTag).to.eq('destratetest');
            expect(filterTimingTag).to.eq('timingtest');
            expect(filterWeight).to.eq('12.1');
        }
        return { data: [{id: '1', type: 'tp-rating-plan'}] };
      });

      visit('/tariff-plans/1/tp-rating-plans');
      return andThen(function() {
        fillIn(`#${find("label:contains('Tag')").attr('for')}`, 'tagtest');
        fillIn(`#${find("label:contains('Destination rates tag')").attr('for')}`, 'destratetest');
        fillIn(`#${find("label:contains('Timing tag')").attr('for')}`, 'timingtest');
        fillIn(`#${find("label:contains('Weight')").attr('for')}`, '12.1');
        click('button.search-button');
        return andThen(() => expect(counter).to.eq(2));
      });
    })
  );

  describe('click column header', () =>
    it('makes a correct sort query', function() {
      let counter = 0;

      server.get('/tp-rating-plans/', function(schema, request) {
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
        return { data: [{id: '1', type: 'tp-rating-plan'}] };
      });

      visit('/tariff-plans/1/tp-rating-plans');
      click(".sort-header a:contains('Tag')");
      click(".sort-header a:contains('Tag')");
      return andThen(() => expect(counter).to.eq(3));
    })
  );

  return describe('click pagination link', () =>
    it('makes a correct pagination query', function() {
      let counter = 0;

      server.get('/tp-rating-plans/', function(schema, request) {
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
        return { data: [{id: '1', type: 'tp-rating-plan'}], meta: {total_pages: 2} };
      });

      visit('/tariff-plans/1/tp-rating-plans');
      click("ul.pagination li a:contains('2')");
      return andThen(() => expect(counter).to.eq(2));
    })
  );
});
