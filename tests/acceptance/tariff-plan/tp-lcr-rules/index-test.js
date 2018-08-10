import { describe, it, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import startApp from 'cgrates-web-frontend/tests/helpers/start-app';
import destroyApp from 'cgrates-web-frontend/tests/helpers/destroy-app';
import { authenticateSession } from 'cgrates-web-frontend/tests/helpers/ember-simple-auth';
import { isBlank } from '@ember/utils';
import registerPowerSelectHelpers from 'cgrates-web-frontend/tests/helpers/ember-power-select';

registerPowerSelectHelpers();

describe("Acceptance: TpLcrRules.Index", function() {
  beforeEach(function() {
    this.App = startApp();
    this.tariffPlan = server.create('tariff-plan', {name: 'Test', alias: 'tptest'});
    this.tpLcrRules = server.createList('tp-lcr-rule', 2, {tpid: this.tariffPlan.alias});
    this.other = server.createList('tp-lcr-rule', 2, {tpid: 'other'});
    authenticateSession(this.App, {email: "user@example.com"});
  });

  afterEach(function () {
    destroyApp(this.App);
  });

  describe('visit /tariff-plans/1/tp-lcr-rules', () =>
    it("renders table with tp-lcr-rules", function() {
      visit('/tariff-plans/1/tp-lcr-rules');
      return andThen(function() {
        expect(find('main h2').text()).to.eq('TpLcrRules list');
        return expect(find('table tbody tr').length).to.eq(2);
      });
    })
  );

  describe('select tp-lcr-rule', () =>
    it('reditects to tp-lcr-rule page', function() {
      visit('/tariff-plans/1/tp-lcr-rules');
      click('table tbody tr:first-child td:first-child a');
      return andThen(() => expect(currentPath()).to.equal("tariff-plans.tariff-plan.tp-lcr-rules.tp-lcr-rule.index"));
    })
  );

  describe('click edit button', () =>
    it('reditects to edit tp-lcr-rule page', function() {
      visit('/tariff-plans/1/tp-lcr-rules');
      click('table tbody tr:first-child a.edit');
      return andThen(() => expect(currentPath()).to.equal('tariff-plans.tariff-plan.tp-lcr-rules.tp-lcr-rule.edit'));
    })
  );

  describe('click remove button', () =>
    it('removes tp-lcr-rule', function() {
      visit('/tariff-plans/1/tp-lcr-rules');
      click('table tbody tr:first-child a.remove');
      return andThen(() => expect(find('table tbody tr').length).to.eq(1));
    })
  );

  describe('click add button', () =>
    it('redirects to new tp-lcr-rule page', function() {
      visit('/tariff-plans/1/tp-lcr-rules');
      click('.fixed-action-btn a');
      return andThen(() => expect(currentPath()).to.equal('tariff-plans.tariff-plan.tp-lcr-rules.new'));
    })
  );

  describe('set filters and click search button', () =>
    it('makes a correct filter query', function() {
      let counter = 0;

      server.get('/tp-lcr-rules/', function(schema, request) {
        counter = counter + 1;
        const filterDirection = request.queryParams['filter[direction]'];
        const filterTenant = request.queryParams['filter[tenant]'];
        const filterCategory = request.queryParams['filter[category]'];
        const filterAccount = request.queryParams['filter[account]'];
        const filterSubject = request.queryParams['filter[subject]'];
        const filterDestinationTag = request.queryParams['filter[destination_tag]'];
        const filterRpCategory = request.queryParams['filter[rp_category]'];
        const filterStrategy = request.queryParams['filter[strategy]'];
        switch (counter) {
          case 1:
            expect(isBlank(filterDirection)).to.eq(true);
            expect(isBlank(filterTenant)).to.eq(true);
            expect(isBlank(filterCategory)).to.eq(true);
            expect(isBlank(filterAccount)).to.eq(true);
            expect(isBlank(filterSubject)).to.eq(true);
            expect(isBlank(filterDestinationTag)).to.eq(true);
            expect(isBlank(filterRpCategory)).to.eq(true);
            expect(isBlank(filterStrategy)).to.eq(true);
            break;
          default:
            expect(filterDirection).to.eq('*out');
            expect(filterTenant).to.eq('cgrates');
            expect(filterCategory).to.eq('call');
            expect(filterAccount).to.eq('any');
            expect(filterSubject).to.eq('any');
            expect(filterDestinationTag).to.eq('1001');
            expect(filterRpCategory).to.eq('profile1');
            expect(filterStrategy).to.eq('*static');
        }
        return { data: [{id: '1', type: 'tp-lcr-rule'}] };
      });

      visit('/tariff-plans/1/tp-lcr-rules');
      return andThen(function() {
        selectChoose(`#${find("label:contains('Direction')").attr('for')}`, '*out');
        fillIn(`#${find("label:contains('Tenant')").attr('for')}`, 'cgrates');
        fillIn(`#${find("label:contains('Category')").attr('for')}`, 'call');
        fillIn(`#${find("label:contains('Account')").attr('for')}`, 'any');
        fillIn(`#${find("label:contains('Subject')").attr('for')}`, 'any');
        fillIn(`#${find("label:contains('Destination tag')").attr('for')}`, '1001');
        fillIn(`#${find("label:contains('RP category')").attr('for')}`, 'profile1');
        selectChoose(`#${find("label:contains('Strategy')").attr('for')}`, '*static');
        click('button.search-button');
        return andThen(() => expect(counter).to.eq(2));
      });
    })
  );

  describe('click column header', () =>
    it('makes a correct sort query', function() {
      let counter = 0;

      server.get('/tp-lcr-rules/', function(schema, request) {
        counter = counter + 1;
        const sort = request.queryParams['sort'];
        switch (counter) {
          case 1:
            expect(sort).to.eq('id');
            break;
          case 2:
            expect(sort).to.eq('destination_tag');
            break;
          default:
            expect(sort).to.eq('-destination_tag');
        }
        return { data: [{id: '1', type: 'tp-lcr-rule'}] };
      });

      visit('/tariff-plans/1/tp-lcr-rules');
      click(".sort-header a:contains('Destination tag')");
      click(".sort-header a:contains('Destination tag')");
      return andThen(() => expect(counter).to.eq(3));
    })
  );

  return describe('click pagination link', () =>
    it('makes a correct pagination query', function() {
      let counter = 0;

      server.get('/tp-lcr-rules/', function(schema, request) {
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
        return { data: [{id: '1', type: 'tp-lcr-rule'}], meta: {total_pages: 2} };
      });

      visit('/tariff-plans/1/tp-lcr-rules');
      click("ul.pagination li a:contains('2')");
      return andThen(() => expect(counter).to.eq(2));
    })
  );
});
