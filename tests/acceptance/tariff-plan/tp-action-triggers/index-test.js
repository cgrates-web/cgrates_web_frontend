import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';
import { setupApplicationTest } from 'ember-mocha';
import { authenticateSession } from 'ember-simple-auth/test-support';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { visit, click, find, findAll, currentRouteName, fillIn, currentURL } from '@ember/test-helpers';
import { selectChoose, selectSearch } from 'ember-power-select/test-support/helpers';
import { isBlank } from '@ember/utils';

describe('Acceptance: tpActionTriggers.Index', function () {
  let hooks = setupApplicationTest();
  setupMirage(hooks);

  beforeEach(async function () {
    this.tariffPlan = server.create('tariff-plan', { id: '1', name: 'Test', alias: 'tptest' });
    server.createList('tp-action-trigger', 2, { tpid: this.tariffPlan.alias });
    server.createList('tp-action-triggers', 2, { tpid: 'other' });
    server.createList('tp-action', 2, { tpid: this.tariffPlan.alias, tag: 'tag-1' });
    await authenticateSession({email: 'user@example.com'});
  });

  describe('visit /tariff-plans/1/tp-action-triggers', () =>
    it('renders table with tp-action-triggers', async function () {
      await visit('/tariff-plans/1/tp-action-triggers');
      expect(find('main h2').textContent).to.eq('TpActionTriggers list');
      expect(findAll('table tbody tr').length).to.eq(2);
    })
  );

  describe('server response with meta: total_records', function () {
    it('displays total records', async function () {
      server.get('/tp-action-triggers', function () {
        return { data: [], meta: { total_records: 55 } };
      });
      await visit('/tariff-plans/1/tp-action-triggers');
      expect(find('.tp-total-records').textContent.trim()).to.eq('Total: 55');
    });
  });

  describe('select tp-action-trigger', () =>
    it('reditects to tp-action-trigger page', async function () {
      await visit('/tariff-plans/1/tp-action-triggers');
      await click('table tbody tr:first-child td:first-child a');
      expect(currentRouteName()).to.equal('tariff-plan.tp-action-triggers.tp-action-trigger.index');
    })
  );

  describe('click edit button', () =>
    it('reditects to edit tp-action-trigger page', async function () {
      await visit('/tariff-plans/1/tp-action-triggers');
      await click('[data-test-action-trigger-edit]');
      expect(currentRouteName()).to.equal('tariff-plan.tp-action-triggers.tp-action-trigger.edit');
    })
  );

  describe('click remove button', () =>
    it('removes tp-action-trigger', async function () {
      await visit('/tariff-plans/1/tp-action-triggers');
      await click('[data-test-action-trigger-remove]');
      expect(findAll('table tbody tr').length).to.eq(1);
    })
  );

  describe('click add button', () =>
    it('redirects to new tp-action-trigger page', async function () {
      await visit('/tariff-plans/1/tp-action-triggers');
      await click('[data-test-add]');
      expect(currentRouteName()).to.equal('tariff-plan.tp-action-triggers.new');
    })
  );

  const setFilters = async () => {
    await fillIn('[data-test-filter-tag] input', 'tag');
    await fillIn('[data-test-filter-unique-id] input', 'unique_id');
    await selectChoose('[data-test-filter-threshold-type]', '*max_counter');
    await fillIn('[data-test-filter-threshold-value] input', 44);
    await selectChoose('[data-test-filter-recurrent]', 'true');
    await fillIn('[data-test-filter-min-sleep] input', 'min_sleep');
    await fillIn('[data-test-filter-expiry-time] input', 'expiry_time');
    await fillIn('[data-test-filter-activation-time] input', 'activation_time');
    await selectChoose('[data-test-filter-balance-tag]', 'SMS');
    await selectChoose('[data-test-filter-balance-type]', '*voice');
    await fillIn('[data-test-filter-min-queued-items] input', 15);
    await selectSearch('[data-test-filter-actions-tag]', 'tag-1');
    await selectChoose('[data-test-filter-actions-tag]', 'tag-1');
    await fillIn('[data-test-filter-weight] input', 10);
  };
  const expectFiltersQueryParams = (request) => {
    expect(request.queryParams['tpid']).to.eq('tptest');
    expect(request.queryParams['filter[tag]']).to.eq('tag');
    expect(request.queryParams['filter[unique_id]']).to.eq('unique_id');
    expect(request.queryParams['filter[threshold_type]']).to.eq('*max_counter');
    expect(request.queryParams['filter[threshold_value]']).to.eq('44');
    expect(request.queryParams['filter[recurrent]']).to.eq('true');
    expect(request.queryParams['filter[min_sleep]']).to.eq('min_sleep');
    expect(request.queryParams['filter[expiry_time]']).to.eq('expiry_time');
    expect(request.queryParams['filter[activation_time]']).to.eq('activation_time');
    expect(request.queryParams['filter[balance_tag]']).to.eq('SMS');
    expect(request.queryParams['filter[balance_type]']).to.eq('*voice');
    expect(request.queryParams['filter[min_queued_items]']).to.eq('15');
    expect(request.queryParams['filter[actions_tag]']).to.eq('tag-1');
    expect(request.queryParams['filter[weight]']).to.eq('10');
  };

  describe('set filters and click search button', () =>
    it('makes a correct filter query', async function () {
      let counter = 0;

      server.get('/tp-action-triggers', function (schema, request) {
        counter = counter + 1;
        switch (counter) {
          case 1:
            expect(isBlank(request.queryParams['filter[tag]'])).to.eq(true);
            expect(isBlank(request.queryParams['filter[unique_id]'])).to.eq(true);
            expect(isBlank(request.queryParams['filter[threshold_type]'])).to.eq(true);
            expect(isBlank(request.queryParams['filter[threshold-value]'])).to.eq(true);
            expect(isBlank(request.queryParams['filter[recurrent]'])).to.eq(true);
            expect(isBlank(request.queryParams['filter[min_sleep]'])).to.eq(true);
            expect(isBlank(request.queryParams['filter[expiry_time]'])).to.eq(true);
            expect(isBlank(request.queryParams['filter[activation_time]'])).to.eq(true);
            expect(isBlank(request.queryParams['filter[balance_tag]'])).to.eq(true);
            expect(isBlank(request.queryParams['filter[balance_type]'])).to.eq(true);
            expect(isBlank(request.queryParams['filter[min_queued_items]'])).to.eq(true);
            expect(isBlank(request.queryParams['filter[actions_tag]'])).to.eq(true);
            expect(isBlank(request.queryParams['filter[weight]'])).to.eq(true);
            break;
          default:
            expectFiltersQueryParams(request);
        }
        return { data: [{id: '1', type: 'tp-action-trigger'}] };
      });

      await visit('/tariff-plans/1/tp-action-triggers');
      await setFilters();
      await click('[data-test-filter-search-btn]');
      expect(counter).to.eq(2);
    })
  );

  describe('set filters and click download csv button', function () {
    it('sends request to the server with filters', async function () {
      let expectRequestToBeCorrect = () => expect(false).to.eq(true);
      server.get('/tp-action-triggers/export-to-csv/', function (_schema, request) {
        expectRequestToBeCorrect = () => {
          expectFiltersQueryParams(request);
        };
        return { data: [{id: '1', type: 'tp-action-trigger'}] };
      });
      await visit('/tariff-plans/1/tp-action-triggers');
      await setFilters();
      await click('[data-test-filter-search-btn]');
      await click('[data-test-download]');
      expectRequestToBeCorrect();
    });
  });

  describe('click to upload csv button', function () {
    it('redirects to upload csv page', async function () {
      await visit('/tariff-plans/1/tp-action-triggers');
      await click('[data-test-upload]');
      expect(currentURL()).to.eq('/tariff-plans/1/tp-action-triggers/csv-import');
    });
  });

  describe('set filters and click refresh button', function () {
    it('makes a correct query', async function () {
      let expectRequestToBeCorrect = () => expect(false).to.eq(true);
      server.get('/tp-action-triggers', function (_schema, request) {
        expectRequestToBeCorrect = () => {
          expectFiltersQueryParams(request);
        };
        return { data: [{id: '1', type: 'tp-action-trigger'}] };
      });
      await visit('/tariff-plans/1/tp-action-triggers');
      await setFilters();
      await click('[data-test-filter-search-btn]');
      await click('[data-test-refresh]');
      expectRequestToBeCorrect();
    });
  });

  describe('set filters and click delete all button', function () {
    let expectRequestToBeCorrect = () => expect(false).to.eq(true);
    beforeEach(async function () {
      server.post('/tp-action-triggers/delete-all', function (_schema, request) {
        expectRequestToBeCorrect = () => {
          const params = JSON.parse(request.requestBody);
          expect(params.tpid).to.eq('tptest');
          expect(params.filter.tag).to.eq('tag');
          expect(params.filter.unique_id).to.eq('unique_id');
          expect(params.filter.threshold_type).to.eq('*max_counter');
          expect(params.filter.threshold_value).to.eq('44');
          expect(params.filter.recurrent).to.eq('true');
          expect(params.filter.min_sleep).to.eq('min_sleep');
          expect(params.filter.expiry_time).to.eq('expiry_time');
          expect(params.filter.activation_time).to.eq('activation_time');
          expect(params.filter.balance_tag).to.eq('SMS');
          expect(params.filter.balance_type).to.eq('*voice');
          expect(params.filter.min_queued_items).to.eq('15');
          expect(params.filter.actions_tag).to.eq('tag-1');
          expect(params.filter.weight).to.eq('10');
        };
        return { data: { id: '0' } };
      });
      await visit('/tariff-plans/1/tp-action-triggers');
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

      server.get('/tp-action-triggers', function (schema, request) {
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
        return { data: [{id: '1', type: 'tp-action-trigger'}] };
      });

      await visit('/tariff-plans/1/tp-action-triggers');
      await click('[data-test-sort-tag] a');
      await click('[data-test-sort-tag] a');
      expect(counter).to.eq(3);
    })
  );

  describe('click pagination link', () =>
    it('makes a correct pagination query', async function () {
      let counter = 0;

      server.get('/tp-action-triggers', function (schema, request) {
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
        return { data: [{id: '1', type: 'tp-action-trigger'}], meta: {total_pages: 2} };
      });

      await visit('/tariff-plans/1/tp-action-triggers');
      await click('[data-test-pagination-forward]');
      expect(counter).to.eq(2);
    })
  );
});
