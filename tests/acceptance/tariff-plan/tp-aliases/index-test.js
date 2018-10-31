import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';
import { setupApplicationTest } from 'ember-mocha';
import { authenticateSession } from 'ember-simple-auth/test-support';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { visit, click, find, findAll, currentRouteName, fillIn, currentURL } from '@ember/test-helpers';
import { isBlank } from '@ember/utils';

describe('Acceptance: TpAliases.Index', function () {
  let hooks = setupApplicationTest();
  setupMirage(hooks);

  beforeEach(async function () {
    this.tariffPlan = server.create('tariff-plan', { id: '1', name: 'Test', alias: 'tptest' });
    server.createList('tp-alias', 2, { tpid: this.tariffPlan.alias });
    server.createList('tp-alias', 2, {tpid: 'other'});
    await authenticateSession({email: 'user@example.com'});
  });

  describe('visit /tariff-plans/1/tp-aliases', () =>
    it('renders table with tp-aliases', async function () {
      await visit('/tariff-plans/1/tp-aliases');
      expect(find('main h2').textContent).to.eq('TpAliases list');
      expect(findAll('table tbody tr').length).to.eq(2);
    })
  );

  describe('server response with meta: total_records', function () {
    it('displays total records', async function () {
      server.get('/tp-aliases', function () {
        return { data: [], meta: { total_records: 55 } };
      });
      await visit('/tariff-plans/1/tp-aliases');
      expect(find('.tp-total-records').textContent.trim()).to.eq('Total: 55');
    });
  });

  describe('select tp-alias', () =>
    it('reditects to tp-alias page', async function () {
      await visit('/tariff-plans/1/tp-aliases');
      await click('table tbody tr:first-child td:first-child a');
      expect(currentRouteName()).to.equal('tariff-plan.tp-aliases.tp-alias.index');
    })
  );

  describe('click edit button', () =>
    it('reditects to edit tp-alias page', async function () {
      await visit('/tariff-plans/1/tp-aliases');
      await click('[data-test-tp-alias-edit]');
      expect(currentRouteName()).to.equal('tariff-plan.tp-aliases.tp-alias.edit');
    })
  );

  describe('click remove button', () =>
    it('removes tp-alias', async function () {
      await visit('/tariff-plans/1/tp-aliases');
      await click('[data-test-tp-alias-remove]');
      expect(findAll('table tbody tr').length).to.eq(1);
    })
  );

  describe('click add button', () =>
    it('redirects to new tp-alias page', async function () {
      await visit('/tariff-plans/1/tp-aliases');
      await click('[data-test-add]');
      expect(currentRouteName()).to.equal('tariff-plan.tp-aliases.new');
    })
  );

  const setFilters = async () => {
    await fillIn('[data-test-filter-tenant] input', 'tenant_test');
    await fillIn('[data-test-filter-direction] input', 'direction');
    await fillIn('[data-test-filter-account] input', 'account');
    await fillIn('[data-test-filter-destination-id] input', 'destination_id');
    await fillIn('[data-test-filter-category] input', 'category');
    await fillIn('[data-test-filter-subject] input', 'subject');
    await fillIn('[data-test-filter-context] input', 'context');
    await fillIn('[data-test-filter-target] input', 'target');
    await fillIn('[data-test-filter-original] input', 'original');
    await fillIn('[data-test-filter-alias] input', 'alias');
    await fillIn('[data-test-filter-weight] input', 10);
  };
  const expectFiltersQueryParams = (request) => {
    expect(request.queryParams['tpid']).to.eq('tptest');
    expect(request.queryParams['filter[tenant]']).to.eq('tenant_test');
    expect(request.queryParams['filter[direction]']).to.eq('direction');
    expect(request.queryParams['filter[account]']).to.eq('account');
    expect(request.queryParams['filter[destination_id]']).to.eq('destination_id');
    expect(request.queryParams['filter[category]']).to.eq('category');
    expect(request.queryParams['filter[subject]']).to.eq('subject');
    expect(request.queryParams['filter[context]']).to.eq('context');
    expect(request.queryParams['filter[target_param]']).to.eq('target');
    expect(request.queryParams['filter[original]']).to.eq('original');
    expect(request.queryParams['filter[alias]']).to.eq('alias');
    expect(request.queryParams['filter[weight]']).to.eq('10');
  };

  describe('set filters and click search button', () =>
    it('makes a correct filter query', async function () {
      let counter = 0;

      server.get('/tp-aliases', function (schema, request) {
        counter = counter + 1;
        switch (counter) {
          case 1:
            expect(isBlank(request.queryParams['filter[tenant]'])).to.eq(true);
            expect(isBlank(request.queryParams['filter[direction]'])).to.eq(true);
            expect(isBlank(request.queryParams['filter[account]'])).to.eq(true);
            expect(isBlank(request.queryParams['filter[destination_id]'])).to.eq(true);
            expect(isBlank(request.queryParams['filter[category]'])).to.eq(true);
            expect(isBlank(request.queryParams['filter[subject]'])).to.eq(true);
            expect(isBlank(request.queryParams['filter[context]'])).to.eq(true);
            expect(isBlank(request.queryParams['filter[target_param]'])).to.eq(true);
            expect(isBlank(request.queryParams['filter[append]'])).to.eq(true);
            expect(isBlank(request.queryParams['filter[original]'])).to.eq(true);
            expect(isBlank(request.queryParams['filter[alias]'])).to.eq(true);
            expect(isBlank(request.queryParams['filter[weight]'])).to.eq(true);
            break;
          default:
            expectFiltersQueryParams(request);
        }
        return { data: [{id: '1', type: 'tp-alias'}] };
      });

      await visit('/tariff-plans/1/tp-aliases');
      await setFilters();
      await click('[data-test-filter-search-btn]');
      expect(counter).to.eq(2);
    })
  );

  describe('set filters and click download csv button', function () {
    it('sends request to the server with filters', async function () {
      let expectRequestToBeCorrect = () => expect(false).to.eq(true);
      server.get('/tp-aliases/export-to-csv/', function (_schema, request) {
        expectRequestToBeCorrect = () => {
          expectFiltersQueryParams(request);
        };
        return { data: [{id: '1', type: 'tp-alias'}] };
      });
      await visit('/tariff-plans/1/tp-aliases');
      await setFilters();
      await click('[data-test-filter-search-btn]');
      await click('[data-test-download]');
      expectRequestToBeCorrect();
    });
  });

  describe('click to upload csv button', function () {
    it('redirects to upload csv page', async function () {
      await visit('/tariff-plans/1/tp-aliases');
      await click('[data-test-upload]');
      expect(currentURL()).to.eq('/tariff-plans/1/tp-aliases/csv-import');
    });
  });

  describe('set filters and click refresh button', function () {
    it('makes a correct query', async function () {
      let expectRequestToBeCorrect = () => expect(false).to.eq(true);
      server.get('/tp-aliases', function (_schema, request) {
        expectRequestToBeCorrect = () => {
          expectFiltersQueryParams(request);
        };
        return { data: [{id: '1', type: 'tp-alias'}] };
      });
      await visit('/tariff-plans/1/tp-aliases');
      await setFilters();
      await click('[data-test-filter-search-btn]');
      await click('[data-test-refresh]');
      expectRequestToBeCorrect();
    });
  });

  describe('set filters and click delete all button', function () {
    let expectRequestToBeCorrect = () => expect(false).to.eq(true);
    beforeEach(async function () {
      server.post('/tp-aliases/delete-all', function (_schema, request) {
        expectRequestToBeCorrect = () => {
          const params = JSON.parse(request.requestBody);
          expect(params.tpid).to.eq('tptest');
          expect(params.filter.tenant).to.eq('tenant_test');
          expect(params.filter.direction).to.eq('direction');
          expect(params.filter.account).to.eq('account');
          expect(params.filter.destination_id).to.eq('destination_id');
          expect(params.filter.category).to.eq('category');
          expect(params.filter.subject).to.eq('subject');
          expect(params.filter.context).to.eq('context');
          expect(params.filter.target_param).to.eq('target');
          expect(params.filter.original).to.eq('original');
          expect(params.filter.alias).to.eq('alias');
          expect(params.filter.weight).to.eq('10');
        };
        return { tp_alias: { id: '0' } };
      });
      await visit('/tariff-plans/1/tp-aliases');
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

      server.get('/tp-aliases', function (schema, request) {
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
        return { data: [{id: '1', type: 'tp-alias'}] };
      });

      await visit('/tariff-plans/1/tp-aliases');
      await click('[data-test-sort-tenant] a');
      await click('[data-test-sort-tenant] a');
      expect(counter).to.eq(3);
    })
  );

  describe('click pagination link', () =>
    it('makes a correct pagination query', async function () {
      let counter = 0;

      server.get('/tp-aliases', function (schema, request) {
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
        return { data: [{id: '1', type: 'tp-alias'}], meta: {total_pages: 2} };
      });

      await visit('/tariff-plans/1/tp-aliases');
      await click('[data-test-pagination-forward]');
      expect(counter).to.eq(2);
    })
  );
});
