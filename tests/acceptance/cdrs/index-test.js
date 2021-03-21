import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';
import { setupApplicationTest } from 'ember-mocha';
import { authenticateSession } from 'ember-simple-auth/test-support';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { isBlank } from '@ember/utils';
import {
  visit,
  click,
  find,
  findAll,
  currentRouteName,
  fillIn,
} from '@ember/test-helpers';
import { selectChoose } from 'ember-power-select/test-support/helpers';

describe('Acceptance: Cdrs.Index', function () {
  let hooks = setupApplicationTest();
  setupMirage(hooks);

  beforeEach(async function () {
    this.cdrs = server.createList('cdr', 2);
    const user = server.create('user');
    await authenticateSession({ email: 'user@example.com', user_id: user.id });
  });

  describe('visit /cdrs', () =>
    it('renders table with CDRs', async function () {
      await visit('/cdrs');
      expect(find('.page-header h1').textContent.trim()).to.eq('CDRs');
      expect(findAll('table tbody tr').length).to.eq(2);
    }));

  describe('select CDR', () =>
    it('reditects to CDR page', async function () {
      await visit('/cdrs');
      await click('table tbody tr:first-child td:first-child a');
      expect(currentRouteName()).to.equal('cdrs.cdr');
    }));

  describe('set filters and click search button', () =>
    it('makes a correct filter query', async function () {
      let counter = 0;

      server.get('/cdrs/', function (schema, request) {
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
            expect(filterTenant).to.eq('tenanttest');
            expect(filterCategory).to.eq('call');
            expect(filterAccount).to.eq('accounttest');
            expect(filterDestination).to.eq('+3334445555');
        }
        return { data: [{ id: '1', type: 'cdr' }] };
      });

      await visit('/cdrs');
      await fillIn('[data-test-cgrid] input', 'cgridtest');
      await fillIn('[data-test-runid] input', '*default');
      await fillIn('[data-test-origin-host] input', '0.0.0.0');
      await fillIn('[data-test-source] input', 'sourcetest');
      await fillIn('[data-test-origin-id] input', 'originidtest');
      await selectChoose('[data-test-filter-tor]', '*voice');
      await fillIn('[data-test-tenant] input', 'tenanttest');
      await fillIn('[data-test-category] input', 'call');
      await fillIn('[data-test-account] input', 'accounttest');
      await fillIn('[data-test-destination] input', '+3334445555');
      await click('[data-test-filter-search-btn]');
      expect(counter).to.eq(2);
    }));

  describe('click column header', () =>
    it('makes a correct sort query', async function () {
      let counter = 0;

      server.get('/cdrs/', function (schema, request) {
        counter = counter + 1;
        const sort = request.queryParams['sort'];
        switch (counter) {
          case 1:
            expect(sort).to.eq('-id');
            break;
          case 2:
            expect(sort).to.eq('cgrid');
            break;
          default:
            expect(sort).to.eq('-cgrid');
        }
        return { data: [{ id: '1', type: 'cdr' }] };
      });

      await visit('/cdrs');
      await click('[data-test-sort-cgrid] a');
      await click('[data-test-sort-cgrid] a');
      expect(counter).to.eq(3);
    }));

  describe('click pagination link', () =>
    it('makes a correct pagination query', async function () {
      let counter = 0;

      server.get('/cdrs/', function (schema, request) {
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
        return { data: [{ id: '1', type: 'cdr' }], meta: { total_pages: 2 } };
      });

      await visit('/cdrs');
      await click('[data-test-pagination-forward]');
      expect(counter).to.eq(2);
    }));
});
