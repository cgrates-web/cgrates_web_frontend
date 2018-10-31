import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';
import { setupApplicationTest } from 'ember-mocha';
import { authenticateSession } from 'ember-simple-auth/test-support';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { visit, click, find, findAll, currentRouteName, fillIn, currentURL } from '@ember/test-helpers';
import { isBlank } from '@ember/utils';

describe('Acceptance: TpSharedGroups.Index', function () {
  let hooks = setupApplicationTest();
  setupMirage(hooks);
  beforeEach(async function () {
    this.tariffPlan = server.create('tariff-plan', { id: '1', name: 'Test', alias: 'tptest' });
    server.createList('tp-shared-group', 2, { tpid: this.tariffPlan.alias });
    server.createList('tp-shared-group', 2, {tpid: 'other'});
    await authenticateSession({email: 'user@example.com'});
  });
  describe('visit /tariff-plans/1/tp-shared-groups', () =>
    it('renders table with tp-shared-groups', async function () {
      await visit('/tariff-plans/1/tp-shared-groups');
      expect(find('main h2').textContent).to.eq('TpSharedGroups list');
      expect(findAll('table tbody tr').length).to.eq(2);
    })
  );
  describe('server response with meta: total_records', function () {
    it('displays total records', async function () {
      server.get('/tp-shared-groups', function () {
        return { data: [], meta: { total_records: 55 } };
      });
      await visit('/tariff-plans/1/tp-shared-groups');
      expect(find('.tp-total-records').textContent.trim()).to.eq('Total: 55');
    });
  });
  describe('select tp-shared-group', () =>
    it('reditects to tp-shared-group page', async function () {
      await visit('/tariff-plans/1/tp-shared-groups');
      await click('table tbody tr:first-child td:first-child a');
      expect(currentRouteName()).to.equal('tariff-plan.tp-shared-groups.tp-shared-group.index');
    })
  );
  describe('click edit button', () =>
    it('reditects to edit tp-shared-group page', async function () {
      await visit('/tariff-plans/1/tp-shared-groups');
      await click('[data-test-shared-group-edit]');
      expect(currentRouteName()).to.equal('tariff-plan.tp-shared-groups.tp-shared-group.edit');
    })
  );
  describe('click remove button', () =>
    it('removes tp-shared-group', async function () {
      await visit('/tariff-plans/1/tp-shared-groups');
      await click('[data-test-shared-group-remove]');
      expect(findAll('table tbody tr').length).to.eq(1);
    })
  );
  describe('click add button', () =>
    it('redirects to new tp-shared-group page', async function () {
      await visit('/tariff-plans/1/tp-shared-groups');
      await click('[data-test-add]');
      expect(currentRouteName()).to.equal('tariff-plan.tp-shared-groups.new');
    })
  );
  const setFilters = async () => {
    await fillIn('[data-test-filter-tag] input', 'tag');
    await fillIn('[data-test-filter-account] input', 'account');
    await fillIn('[data-test-filter-strategy] input', 'strategy');
    await fillIn('[data-test-filter-rating-subject] input', 'rating_subject');
  };
  const expectFiltersQueryParams = (request) => {
    expect(request.queryParams['tpid']).to.eq('tptest');
    expect(request.queryParams['filter[tag]']).to.eq('tag');
    expect(request.queryParams['filter[account]']).to.eq('account');
    expect(request.queryParams['filter[strategy]']).to.eq('strategy');
    expect(request.queryParams['filter[rating_subject]']).to.eq('rating_subject');
  };
  describe('set filters and click search button', () =>
    it('makes a correct filter query', async function () {
      let counter = 0;
      server.get('/tp-shared-groups', function (schema, request) {
        counter = counter + 1;
        switch (counter) {
          case 1:
            expect(isBlank(request.queryParams['filter[tag]'])).to.eq(true);
            expect(isBlank(request.queryParams['filter[account]'])).to.eq(true);
            expect(isBlank(request.queryParams['filter[strategy]'])).to.eq(true);
            expect(isBlank(request.queryParams['filter[rating_subject]'])).to.eq(true);
            break;
          default:
            expectFiltersQueryParams(request);
        }
        return { data: [{id: '1', type: 'tp-shared-group'}] };
      });
      await visit('/tariff-plans/1/tp-shared-groups');
      await setFilters();
      await click('[data-test-filter-search-btn]');
      expect(counter).to.eq(2);
    })
  );
  describe('set filters and click download csv button', function () {
    it('sends request to the server with filters', async function () {
      let expectRequestToBeCorrect = () => expect(false).to.eq(true);
      server.get('/tp-shared-groups/export-to-csv/', function (_schema, request) {
        expectRequestToBeCorrect = () => {
          expectFiltersQueryParams(request);
        };
        return { data: [{id: '1', type: 'tp-shared-group'}] };
      });
      await visit('/tariff-plans/1/tp-shared-groups');
      await setFilters();
      await click('[data-test-filter-search-btn]');
      await click('[data-test-download]');
      expectRequestToBeCorrect();
    });
  });
  describe('click to upload csv button', function () {
    it('redirects to upload csv page', async function () {
      await visit('/tariff-plans/1/tp-shared-groups');
      await click('[data-test-upload]');
      expect(currentURL()).to.eq('/tariff-plans/1/tp-shared-groups/csv-import');
    });
  });
  describe('set filters and click refresh button', function () {
    it('makes a correct query', async function () {
      let expectRequestToBeCorrect = () => expect(false).to.eq(true);
      server.get('/tp-shared-groups', function (_schema, request) {
        expectRequestToBeCorrect = () => {
          expectFiltersQueryParams(request);
        };
        return { data: [{id: '1', type: 'tp-shared-group'}] };
      });
      await visit('/tariff-plans/1/tp-shared-groups');
      await setFilters();
      await click('[data-test-filter-search-btn]');
      await click('[data-test-refresh]');
      expectRequestToBeCorrect();
    });
  });
  describe('set filters and click delete all button', function () {
    let expectRequestToBeCorrect = () => expect(false).to.eq(true);
    beforeEach(async function () {
      server.post('/tp-shared-groups/delete-all', function (_schema, request) {
        expectRequestToBeCorrect = () => {
          const params = JSON.parse(request.requestBody);
          expect(params.tpid).to.eq('tptest');
          expect(params.filter.tag).to.eq('tag');
          expect(params.filter.account).to.eq('account');
          expect(params.filter.strategy).to.eq('strategy');
          expect(params.filter.rating_subject).to.eq('rating_subject');
        };
        return { tp_shared_group: { id: '0' } };
      });
      await visit('/tariff-plans/1/tp-shared-groups');
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
      server.get('/tp-shared-groups', function (schema, request) {
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
        return { data: [{id: '1', type: 'tp-shared-group'}] };
      });
      await visit('/tariff-plans/1/tp-shared-groups');
      await click('[data-test-sort-tag] a');
      await click('[data-test-sort-tag] a');
      expect(counter).to.eq(3);
    })
  );
  describe('click pagination link', () =>
    it('makes a correct pagination query', async function () {
      let counter = 0;
      server.get('/tp-shared-groups', function (schema, request) {
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
        return { data: [{id: '1', type: 'tp-shared-group'}], meta: {total_pages: 2} };
      });
      await visit('/tariff-plans/1/tp-shared-groups');
      await click('[data-test-pagination-forward]');
      expect(counter).to.eq(2);
    })
  );
});
