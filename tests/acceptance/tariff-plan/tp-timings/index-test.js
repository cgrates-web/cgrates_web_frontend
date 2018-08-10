import { describe, it, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import startApp from 'cgrates-web-frontend/tests/helpers/start-app';
import destroyApp from 'cgrates-web-frontend/tests/helpers/destroy-app';
import { isBlank } from '@ember/utils';
import { authenticateSession } from 'cgrates-web-frontend/tests/helpers/ember-simple-auth';

describe("Acceptance: TpTimings.Index", function() {
  beforeEach(function() {
    this.App = startApp();
    this.tariffPlan = server.create('tariff-plan', {name: 'Test', alias: 'tptest'});
    this.tpTiming = server.createList('tp-timing', 2, {tpid: this.tariffPlan.alias});
    this.other = server.createList('tp-destination', 2, {tpid: 'other'});
    authenticateSession(this.App, {email: "user@example.com"});
  });

  afterEach(function () {
    destroyApp(this.App);
  });

  describe('visit /tariff-plans/1/tp-timings', () =>
    it("renders table with tp-timings", function() {
      visit('/tariff-plans/1/tp-timings');
      return andThen(function() {
        expect(find('main h2').text()).to.eq('Timings list');
        return expect(find('table tbody tr').length).to.eq(2);
      });
    })
  );

  describe('select tp-timings', () =>
    it('reditects to tp-timings page', function() {
      visit('/tariff-plans/1/tp-timings');
      click('table tbody tr:first-child td:first-child a');
      return andThen(() => expect(currentPath()).to.equal("tariff-plans.tariff-plan.tp-timings.tp-timing.index"));
    })
  );

  describe('click edit button', () =>
    it('reditects to edit tp-timing page', function() {
      visit('/tariff-plans/1/tp-timings');
      click('table tbody tr:first-child a.edit');
      return andThen(() => expect(currentPath()).to.equal('tariff-plans.tariff-plan.tp-timings.tp-timing.edit'));
    })
  );

  describe('click remove button', () =>
    it('removes tp-timing', function() {
      visit('/tariff-plans/1/tp-timings');
      click('table tbody tr:first-child a.remove');
      return andThen(() => expect(find('table tbody tr').length).to.eq(1));
    })
  );

  describe('click add button', () =>
    it('redirects to new tp-timings page', function() {
      visit('/tariff-plans/1/tp-timings');
      click('.fixed-action-btn a');
      return andThen(() => expect(currentPath()).to.equal('tariff-plans.tariff-plan.tp-timings.new'));
    })
  );

  describe('set filters and click search button', () =>
    it('makes a correct filter query', function() {
      let counter = 0;

      server.get('/tp-timings/', function(schema, request) {
        counter = counter + 1;
        const filterTag = request.queryParams['filter[tag]'];
        switch (counter) {
          case 1:
            expect(isBlank(filterTag)).to.eq(true);
            break;
          default:
            expect(filterTag).to.eq('tagtest');
        }
        return { data: [{id: '1', type: 'tp-timing'}] };
      });

      visit('/tariff-plans/1/tp-timings');
      return andThen(function() {
        fillIn(`#${find("label:contains('Tag')").attr('for')}`, 'tagtest');
        click('button.search-button');
        return andThen(() => expect(counter).to.eq(2));
      });
    })
  );

  describe('click column header', () =>
    it('makes a correct sort query', function() {
      let counter = 0;

      server.get('/tp-timings/', function(schema, request) {
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
        return { data: [{id: '1', type: 'tp-timing'}] };
      });

      visit('/tariff-plans/1/tp-timings');
      click(".sort-header a:contains('Tag')");
      click(".sort-header a:contains('Tag')");
      return andThen(() => expect(counter).to.eq(3));
    })
  );

  return describe('click pagination link', () =>
    it('makes a correct pagination query', function() {
      let counter = 0;

      server.get('/tp-timings/', function(schema, request) {
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
        return { data: [{id: '1', type: 'tp-timings'}], meta: {total_pages: 2} };
      });

      visit('/tariff-plans/1/tp-timings');
      click("ul.pagination li a:contains('2')");
      return andThen(() => expect(counter).to.eq(2));
    })
  );
});
