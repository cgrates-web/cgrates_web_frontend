import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';
import { setupApplicationTest } from 'ember-mocha';
import { authenticateSession } from 'ember-simple-auth/test-support';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import {
  visit,
  click,
  find,
  findAll,
  currentRouteName,
  fillIn,
  currentURL,
} from '@ember/test-helpers';
import {
  selectChoose,
  selectSearch,
} from 'ember-power-select/test-support/helpers';
import { isBlank } from '@ember/utils';

describe('Acceptance: TpDerivedChargers.Index', function () {
  let hooks = setupApplicationTest();
  setupMirage(hooks);

  beforeEach(async function () {
    this.tariffPlan = server.create('tariff-plan', {
      id: '1',
      name: 'Test',
      alias: 'tptest',
    });
    server.createList('tp-derived-charger', 2, { tpid: this.tariffPlan.alias });
    server.createList('tp-derived-charger', 2, { tpid: 'other' });
    server.create('tp-destination', {
      tpid: this.tariffPlan.alias,
      tag: 'tag-1',
    });
    await authenticateSession({ email: 'user@example.com' });
  });

  describe('visit /tariff-plans/1/tp-derived-chargers', () =>
    it('renders table with tp-derived-chargers', async function () {
      await visit('/tariff-plans/1/tp-derived-chargers');
      expect(find('main h2').textContent).to.eq('TpDerivedChargers list');
      expect(findAll('table tbody tr').length).to.eq(2);
    }));

  describe('server response with meta: total_records', function () {
    it('displays total records', async function () {
      server.get('/tp-derived-chargers', function () {
        return { data: [], meta: { total_records: 55 } };
      });
      await visit('/tariff-plans/1/tp-derived-chargers');
      expect(find('.tp-total-records').textContent.trim()).to.eq('Total: 55');
    });
  });

  describe('select tp-derived-charger', () =>
    it('reditects to tp-derived-charger page', async function () {
      await visit('/tariff-plans/1/tp-derived-chargers');
      await click('table tbody tr:first-child td:first-child a');
      expect(currentRouteName()).to.equal(
        'tariff-plan.tp-derived-chargers.tp-derived-charger.index'
      );
    }));

  describe('click edit button', () =>
    it('reditects to edit tp-derived-charger page', async function () {
      await visit('/tariff-plans/1/tp-derived-chargers');
      await click('[data-test-tp-derived-charger-edit]');
      expect(currentRouteName()).to.equal(
        'tariff-plan.tp-derived-chargers.tp-derived-charger.edit'
      );
    }));

  describe('click remove button', () =>
    it('removes tp-derived-charger', async function () {
      await visit('/tariff-plans/1/tp-derived-chargers');
      await click('[data-test-tp-derived-charger-remove]');
      expect(findAll('table tbody tr').length).to.eq(1);
    }));

  describe('click add button', () =>
    it('redirects to new tp-derived-charger page', async function () {
      await visit('/tariff-plans/1/tp-derived-chargers');
      await click('[data-test-add]');
      expect(currentRouteName()).to.equal(
        'tariff-plan.tp-derived-chargers.new'
      );
    }));

  const setFilters = async () => {
    await fillIn('[data-test-filter-loadid] input', 'loadid');
    await fillIn('[data-test-filter-direction] input', 'direction');
    await fillIn('[data-test-filter-tenant] input', 'tenant');
    await fillIn('[data-test-filter-category] input', 'category');
    await fillIn('[data-test-filter-account] input', 'account');
    await fillIn('[data-test-filter-subject] input', 'subject');
    await selectSearch('[data-test-filter-destination-ids]', 'tag-1');
    await selectChoose('[data-test-filter-destination-ids]', 'tag-1');
  };
  const expectFiltersQueryParams = (request) => {
    expect(request.queryParams['tpid']).to.eq('tptest');
    expect(request.queryParams['filter[loadid]']).to.eq('loadid');
    expect(request.queryParams['filter[direction]']).to.eq('direction');
    expect(request.queryParams['filter[tenant]']).to.eq('tenant');
    expect(request.queryParams['filter[category]']).to.eq('category');
    expect(request.queryParams['filter[account]']).to.eq('account');
    expect(request.queryParams['filter[subject]']).to.eq('subject');
    expect(request.queryParams['filter[destination_ids]']).to.eq('tag-1');
  };

  describe('set filters and click search button', () =>
    it('makes a correct filter query', async function () {
      let counter = 0;

      server.get('/tp-derived-chargers', function (schema, request) {
        counter = counter + 1;
        switch (counter) {
          case 1:
            expect(isBlank(request.queryParams['filter[loadid]'])).to.eq(true);
            expect(isBlank(request.queryParams['filter[direction]'])).to.eq(
              true
            );
            expect(isBlank(request.queryParams['filter[tenant]'])).to.eq(true);
            expect(isBlank(request.queryParams['filter[category]'])).to.eq(
              true
            );
            expect(isBlank(request.queryParams['filter[account]'])).to.eq(true);
            expect(isBlank(request.queryParams['filter[subject]'])).to.eq(true);
            expect(
              isBlank(request.queryParams['filter[destination_ids]'])
            ).to.eq(true);
            break;
          default:
            expectFiltersQueryParams(request);
        }
        return { data: [{ id: '1', type: 'tp-derived-charger' }] };
      });

      await visit('/tariff-plans/1/tp-derived-chargers');
      await setFilters();
      await click('[data-test-filter-search-btn]');
      expect(counter).to.eq(2);
    }));

  describe('set filters and click download csv button', function () {
    it('sends request to the server with filters', async function () {
      let expectRequestToBeCorrect = () => expect(false).to.eq(true);
      server.get('/tp-derived-chargers/export-to-csv/', function (
        _schema,
        request
      ) {
        expectRequestToBeCorrect = () => {
          expectFiltersQueryParams(request);
        };
        return { data: [{ id: '1', type: 'tp-derived-charger' }] };
      });
      await visit('/tariff-plans/1/tp-derived-chargers');
      await setFilters();
      await click('[data-test-filter-search-btn]');
      await click('[data-test-download]');
      expectRequestToBeCorrect();
    });
  });

  describe('click to upload csv button', function () {
    it('redirects to upload csv page', async function () {
      await visit('/tariff-plans/1/tp-derived-chargers');
      await click('[data-test-upload]');
      expect(currentURL()).to.eq(
        '/tariff-plans/1/tp-derived-chargers/csv-import'
      );
    });
  });

  describe('set filters and click refresh button', function () {
    it('makes a correct query', async function () {
      let expectRequestToBeCorrect = () => expect(false).to.eq(true);
      server.get('/tp-derived-chargers', function (_schema, request) {
        expectRequestToBeCorrect = () => {
          expectFiltersQueryParams(request);
        };
        return { data: [{ id: '1', type: 'tp-derived-charger' }] };
      });
      await visit('/tariff-plans/1/tp-derived-chargers');
      await setFilters();
      await click('[data-test-filter-search-btn]');
      await click('[data-test-refresh]');
      expectRequestToBeCorrect();
    });
  });

  describe('set filters and click delete all button', function () {
    let expectRequestToBeCorrect = () => expect(false).to.eq(true);
    beforeEach(async function () {
      server.post('/tp-derived-chargers/delete-all', function (
        _schema,
        request
      ) {
        expectRequestToBeCorrect = () => {
          const params = JSON.parse(request.requestBody);
          expect(params.tpid).to.eq('tptest');
          expect(params.filter.loadid).to.eq('loadid');
          expect(params.filter.direction).to.eq('direction');
          expect(params.filter.tenant).to.eq('tenant');
          expect(params.filter.category).to.eq('category');
          expect(params.filter.account).to.eq('account');
          expect(params.filter.subject).to.eq('subject');
          expect(params.filter.destination_ids).to.eq('tag-1');
        };
        return { data: { id: '0' } };
      });
      await visit('/tariff-plans/1/tp-derived-chargers');
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

      server.get('/tp-derived-chargers', function (schema, request) {
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
        return { data: [{ id: '1', type: 'tp-derived-charger' }] };
      });

      await visit('/tariff-plans/1/tp-derived-chargers');
      await click('[data-test-sort-tenant] a');
      await click('[data-test-sort-tenant] a');
      expect(counter).to.eq(3);
    }));

  describe('click pagination link', () =>
    it('makes a correct pagination query', async function () {
      let counter = 0;

      server.get('/tp-derived-chargers', function (schema, request) {
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
        return {
          data: [{ id: '1', type: 'tp-derived-charger' }],
          meta: { total_pages: 2 },
        };
      });

      await visit('/tariff-plans/1/tp-derived-chargers');
      await click('[data-test-pagination-forward]');
      expect(counter).to.eq(2);
    }));
});
