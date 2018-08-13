import { describe, it, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import startApp from 'cgrates-web-frontend/tests/helpers/start-app';
import destroyApp from 'cgrates-web-frontend/tests/helpers/destroy-app';
import { authenticateSession } from 'cgrates-web-frontend/tests/helpers/ember-simple-auth';
import registerPowerSelectHelpers from 'cgrates-web-frontend/tests/helpers/ember-power-select';
import { isBlank } from '@ember/utils';

registerPowerSelectHelpers();

describe("Acceptance: Cdrs.Index", function() {
  beforeEach(function() {
    this.App = startApp();
    this.cdrs = server.createList('cdr', 2);
    authenticateSession(this.App, {email: "user@example.com"});
  });

  afterEach(function () {
    destroyApp(this.App);
  });

  describe('visit /cdrs', () =>
    it("renders table with CDRs", function() {
      visit("/cdrs");
      return andThen(function() {
        expect(find('section.page-header h1').text()).to.eq('CDRs');
        return expect(find('table tbody tr').length).to.eq(2);
      });
    })
  );

  describe('select CDR', () =>
    it('reditects to CDR page', function() {
      visit('/cdrs');
      click('table tbody tr:first-child td:first-child a');
      return andThen(() => expect(currentPath()).to.equal("cdrs.cdr"));
    })
  );

  describe('set filters and click search button', () =>
    it('makes a correct filter query', function() {
      let counter = 0;

      server.get('/cdrs/', function(schema, request) {
        counter = counter + 1;
        const filterCgrid = request.queryParams['filter[cgrid]'];
        const filterRunId = request.queryParams['filter[run_id]'];
        const filterOriginHost = request.queryParams['filter[origin_host]'];
        const filterSource = request.queryParams['filter[source]'];
        const filterOriginId = request.queryParams['filter[origin_id]'];
        const filterTor = request.queryParams['filter[tor]'];
        const filterDirection = request.queryParams['filter[direction]'];
        const filterTenant = request.queryParams['filter[tenant]'];
        const filterCategory = request.queryParams['filter[category]'];
        const filterAccount = request.queryParams['filter[account]'];
        const filterDestination = request.queryParams['filter[destination]'];
        switch (counter) {
          case 1:
            expect(isBlank(filterCgrid)).to.eq(true);
            expect(isBlank(filterRunId)).to.eq(true);
            expect(isBlank(filterOriginHost)).to.eq(true);
            expect(isBlank(filterSource)).to.eq(true);
            expect(isBlank(filterOriginId)).to.eq(true);
            expect(isBlank(filterTor)).to.eq(true);
            expect(isBlank(filterDirection)).to.eq(true);
            expect(isBlank(filterTenant)).to.eq(true);
            expect(isBlank(filterCategory)).to.eq(true);
            expect(isBlank(filterAccount)).to.eq(true);
            expect(isBlank(filterDestination)).to.eq(true);
            break;
          default:
            expect(filterCgrid).to.eq('cgridtest');
            expect(filterRunId).to.eq('*default');
            expect(filterOriginHost).to.eq('0.0.0.0');
            expect(filterSource).to.eq('sourcetest');
            expect(filterOriginId).to.eq('originidtest');
            expect(filterTor).to.eq('*voice');
            expect(filterDirection).to.eq('*out');
            expect(filterTenant).to.eq('tenanttest');
            expect(filterCategory).to.eq('call');
            expect(filterAccount).to.eq('accounttest');
            expect(filterDestination).to.eq('+3334445555');
        }
        return { data: [{id: '1', type: 'cdr'}] };
      });

      visit('/cdrs');
      return andThen(function() {
        fillIn(`#${find("label:contains('CGRateS ID')").attr('for')}`, 'cgridtest');
        fillIn(`#${find("label:contains('Run ID')").attr('for')}`, '*default');
        fillIn(`#${find("label:contains('Origin Host')").attr('for')}`, '0.0.0.0');
        fillIn(`#${find("label:contains('Source')").attr('for')}`, 'sourcetest');
        fillIn(`#${find("label:contains('Origin ID')").attr('for')}`, 'originidtest');
        selectChoose(`#${find("label:contains('Type of record')").attr('for')}`, '*voice');
        selectChoose(`#${find("label:contains('Direction')").attr('for')}`, '*out');
        fillIn(`#${find("label:contains('Tenant')").attr('for')}`, 'tenanttest');
        fillIn(`#${find("label:contains('Category')").attr('for')}`, 'call');
        fillIn(`#${find("label:contains('Account')").attr('for')}`, 'accounttest');
        fillIn(`#${find("label:contains('Destination')").attr('for')}`, '+3334445555');
        click('button.search-button');
        return andThen(() => expect(counter).to.eq(2));
      });
    })
  );

  describe('click column header', () =>
    it('makes a correct sort query', function() {
      let counter = 0;

      server.get('/cdrs/', function(schema, request) {
        counter = counter + 1;
        const sort = request.queryParams['sort'];
        switch (counter) {
          case 1:
            expect(sort).to.eq('id');
            break;
          case 2:
            expect(sort).to.eq('cgrid');
            break;
          default:
            expect(sort).to.eq('-cgrid');
        }
        return { data: [{id: '1', type: 'cdr'}] };
      });

      visit('/cdrs');
      click(".sort-header a:contains('CGRateS ID')");
      click(".sort-header a:contains('CGRateS ID')");
      return andThen(() => expect(counter).to.eq(3));
    })
  );

  return describe('click pagination link', () =>
    it('makes a correct pagination query', function() {
      let counter = 0;

      server.get('/cdrs/', function(schema, request) {
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
        return { data: [{id: '1', type: 'cdr'}], meta: {total_pages: 2} };
      });

      visit('/cdrs');
      click("ul.pagination li a:contains('2')");
      return andThen(() => expect(counter).to.eq(2));
    })
  );
});
