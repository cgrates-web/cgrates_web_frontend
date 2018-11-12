import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';
import { setupApplicationTest } from 'ember-mocha';
import { authenticateSession } from 'ember-simple-auth/test-support';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { visit, click, find, findAll, currentRouteName, fillIn, currentURL } from '@ember/test-helpers';
import { selectChoose, selectSearch } from 'ember-power-select/test-support/helpers';
import { isBlank } from '@ember/utils';

describe('Acceptance: TpAccountActions.Index', function () {
  let hooks = setupApplicationTest();
  setupMirage(hooks);

  beforeEach(async function () {
    this.tariffPlan = server.create('tariff-plan', { id: '1', name: 'Test', alias: 'tptest' });
    server.createList('tp-account-action', 2, { tpid: this.tariffPlan.alias });
    server.createList('tp-account-action', 2, {tpid: 'other'});
    server.createList('tp-action-plan', 2, { tpid: this.tariffPlan.alias, tag: 'tag-1' });
    server.createList('tp-action-trigger', 2, { tpid: this.tariffPlan.alias, tag: 'tag-1' });
    await authenticateSession({email: 'user@example.com'});
  });

  describe('visit /tariff-plans/1/tp-account-actions', () =>
    it('renders table with tp-account-actions', async function () {
      await visit('/tariff-plans/1/tp-account-actions');
      expect(find('main h2').textContent).to.eq('TpAccountActions list');
      expect(findAll('table tbody tr').length).to.eq(2);
    })
  );

  describe('server response with meta: total_records', function () {
    it('displays total records', async function () {
      server.get('/tp-account-actions', function () {
        return { data: [], meta: { total_records: 55 } };
      });
      await visit('/tariff-plans/1/tp-account-actions');
      expect(find('.tp-total-records').textContent.trim()).to.eq('Total: 55');
    });
  });

  describe('select tp-account-action', () =>
    it('reditects to tp-account-action page', async function () {
      await visit('/tariff-plans/1/tp-account-actions');
      await click('table tbody tr:first-child td:first-child a');
      expect(currentRouteName()).to.equal('tariff-plan.tp-account-actions.tp-account-action.index');
    })
  );

  describe('click edit button', () =>
    it('reditects to edit tp-account-action page', async function () {
      await visit('/tariff-plans/1/tp-account-actions');
      await click('[data-test-tp-account-action-edit]');
      expect(currentRouteName()).to.equal('tariff-plan.tp-account-actions.tp-account-action.edit');
    })
  );

  describe('click remove button', () =>
    it('removes tp-account-action', async function () {
      await visit('/tariff-plans/1/tp-account-actions');
      await click('[data-test-tp-account-action-remove]');
      expect(findAll('table tbody tr').length).to.eq(1);
    })
  );

  describe('click add button', () =>
    it('redirects to new tp-account-action page', async function () {
      await visit('/tariff-plans/1/tp-account-actions');
      await click('[data-test-add]');
      expect(currentRouteName()).to.equal('tariff-plan.tp-account-actions.new');
    })
  );

  const setFilters = async () => {
    await fillIn('[data-test-filter-loadid] input', 'loadid');
    await fillIn('[data-test-filter-tenant] input', 'tenant');
    await fillIn('[data-test-filter-account] input', 'account');
    await selectSearch('[data-test-filter-action-plan-tag]', 'tag-1');
    await selectChoose('[data-test-filter-action-plan-tag]', 'tag-1');
    await selectSearch('[data-test-filter-action-triggers-tag]', 'tag-1');
    await selectChoose('[data-test-filter-action-triggers-tag]', 'tag-1');
    await selectChoose('[data-test-filter-allow-negative]', 'true');
    await selectChoose('[data-test-filter-disabled]', 'true');
  };
  const expectFiltersQueryParams = (request) => {
    expect(request.queryParams['tpid']).to.eq('tptest');
    expect(request.queryParams['filter[loadid]']).to.eq('loadid');
    expect(request.queryParams['filter[tenant]']).to.eq('tenant');
    expect(request.queryParams['filter[account]']).to.eq('account');
    expect(request.queryParams['filter[action_plan_tag]']).to.eq('tag-1');
    expect(request.queryParams['filter[action_triggers_tag]']).to.eq('tag-1');
    expect(request.queryParams['filter[allow_negative]']).to.eq('true');
    expect(request.queryParams['filter[disabled]']).to.eq('true');
  };

  describe('set filters and click search button', () =>
    it('makes a correct filter query', async function () {
      let counter = 0;

      server.get('/tp-account-actions', function (schema, request) {
        counter = counter + 1;
        switch (counter) {
          case 1:
            expect(isBlank(request.queryParams['filter[loadid]'])).to.eq(true);
            expect(isBlank(request.queryParams['filter[tenant]'])).to.eq(true);
            expect(isBlank(request.queryParams['filter[account]'])).to.eq(true);
            expect(isBlank(request.queryParams['filter[action_plan_tag]'])).to.eq(true);
            expect(isBlank(request.queryParams['filter[action_triggers_tag]'])).to.eq(true);
            expect(isBlank(request.queryParams['filter[allow_negative]'])).to.eq(true);
            expect(isBlank(request.queryParams['filter[disabled]'])).to.eq(true);
            break;
          default:
            expectFiltersQueryParams(request);
        }
        return { data: [{id: '1', type: 'tp-account-action'}] };
      });

      await visit('/tariff-plans/1/tp-account-actions');
      await setFilters();
      await click('[data-test-filter-search-btn]');
      expect(counter).to.eq(2);
    })
  );

  describe('set filters and click download csv button', function () {
    it('sends request to the server with filters', async function () {
      let expectRequestToBeCorrect = () => expect(false).to.eq(true);
      server.get('/tp-account-actions/export-to-csv/', function (_schema, request) {
        expectRequestToBeCorrect = () => {
          expectFiltersQueryParams(request);
        };
        return { data: [{id: '1', type: 'tp-account-action'}] };
      });
      await visit('/tariff-plans/1/tp-account-actions');
      await setFilters();
      await click('[data-test-filter-search-btn]');
      await click('[data-test-download]');
      expectRequestToBeCorrect();
    });
  });

  describe('click to upload csv button', function () {
    it('redirects to upload csv page', async function () {
      await visit('/tariff-plans/1/tp-account-actions');
      await click('[data-test-upload]');
      expect(currentURL()).to.eq('/tariff-plans/1/tp-account-actions/csv-import');
    });
  });

  describe('set filters and click refresh button', function () {
    it('makes a correct query', async function () {
      let expectRequestToBeCorrect = () => expect(false).to.eq(true);
      server.get('/tp-account-actions', function (_schema, request) {
        expectRequestToBeCorrect = () => {
          expectFiltersQueryParams(request);
        };
        return { data: [{id: '1', type: 'tp-account-action'}] };
      });
      await visit('/tariff-plans/1/tp-account-actions');
      await setFilters();
      await click('[data-test-filter-search-btn]');
      await click('[data-test-refresh]');
      expectRequestToBeCorrect();
    });
  });

  describe('set filters and click delete all button', function () {
    let expectRequestToBeCorrect = () => expect(false).to.eq(true);
    beforeEach(async function () {
      server.post('/tp-account-actions/delete-all', function (_schema, request) {
        expectRequestToBeCorrect = () => {
          const params = JSON.parse(request.requestBody);
          expect(params.tpid).to.eq('tptest');
          expect(params.filter.loadid).to.eq('loadid');
          expect(params.filter.tenant).to.eq('tenant');
          expect(params.filter.account).to.eq('account');
          expect(params.filter.action_plan_tag).to.eq('tag-1');
          expect(params.filter.action_triggers_tag).to.eq('tag-1');
          expect(params.filter.allow_negative).to.eq('true');
          expect(params.filter.disabled).to.eq('true');
        };
        return { data: { id: '0' } };
      });
      await visit('/tariff-plans/1/tp-account-actions');
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

      server.get('/tp-account-actions', function (schema, request) {
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
        return { data: [{id: '1', type: 'tp-account-action'}] };
      });

      await visit('/tariff-plans/1/tp-account-actions');
      await click('[data-test-sort-tenant] a');
      await click('[data-test-sort-tenant] a');
      expect(counter).to.eq(3);
    })
  );

  describe('click pagination link', () =>
    it('makes a correct pagination query', async function () {
      let counter = 0;

      server.get('/tp-account-actions', function (schema, request) {
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
        return { data: [{id: '1', type: 'tp-account-action'}], meta: {total_pages: 2} };
      });

      await visit('/tariff-plans/1/tp-account-actions');
      await click('[data-test-pagination-forward]');
      expect(counter).to.eq(2);
    })
  );
});
