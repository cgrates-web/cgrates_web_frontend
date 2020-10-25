import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';
import { setupApplicationTest } from 'ember-mocha';
import { authenticateSession } from 'ember-simple-auth/test-support';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import {
  selectChoose,
  selectSearch,
} from 'ember-power-select/test-support/helpers';
import {
  visit,
  click,
  find,
  findAll,
  currentRouteName,
  fillIn,
  currentURL,
} from '@ember/test-helpers';
import { isBlank } from '@ember/utils';

describe('Acceptance: TpCdrStats.Index', function () {
  let hooks = setupApplicationTest();
  setupMirage(hooks);

  beforeEach(async function () {
    this.tariffPlan = server.create('tariff-plan', {
      id: '1',
      name: 'Test',
      alias: 'tptest',
    });
    server.createList('tp-cdr-stat', 2, { tpid: this.tariffPlan.alias });
    server.createList('tp-cdr-stat', 2, { tpid: 'other' });
    server.create('tp-destination', {
      tpid: this.tariffPlan.alias,
      tag: 'tag-1',
    });
    server.create('tp-action-trigger', {
      tpid: this.tariffPlan.alias,
      tag: 'tag-2',
    });
    await authenticateSession({ email: 'user@example.com' });
  });

  describe('visit /tariff-plans/1/tp-cdr-stats', () =>
    it('renders table with tp-cdr-stats', async function () {
      await visit('/tariff-plans/1/tp-cdr-stats');
      expect(find('main h2')).to.have.trimmed.text('TpCdrStats list');
      expect(findAll('table tbody tr').length).to.eq(2);
    }));

  describe('server response with meta: total_records', function () {
    it('displays total records', async function () {
      server.get('/tp-cdr-stats', function () {
        return { data: [], meta: { total_records: 55 } };
      });
      await visit('/tariff-plans/1/tp-cdr-stats');
      expect(find('.tp-total-records').textContent.trim()).to.eq('Total: 55');
    });
  });

  describe('select tp-cdr-stats', () =>
    it('reditects to tp-cdr-stat page', async function () {
      await visit('/tariff-plans/1/tp-cdr-stats');
      await click('table tbody tr:first-child td:first-child a');
      expect(currentRouteName()).to.equal(
        'tariff-plan.tp-cdr-stats.tp-cdr-stat.index'
      );
    }));

  describe('click edit button', () =>
    it('reditects to edit tp-cdr-stat page', async function () {
      await visit('/tariff-plans/1/tp-cdr-stats');
      await click('[data-test-tp-cdr-stat-edit]');
      expect(currentRouteName()).to.equal(
        'tariff-plan.tp-cdr-stats.tp-cdr-stat.edit'
      );
    }));

  describe('click remove button', () =>
    it('removes tp-cdr-stat', async function () {
      await visit('/tariff-plans/1/tp-cdr-stats');
      await click('[data-test-tp-cdr-stat-remove]');
      expect(findAll('table tbody tr').length).to.eq(1);
    }));

  describe('click add button', () =>
    it('redirects to new tp-cdr-stat page', async function () {
      await visit('/tariff-plans/1/tp-cdr-stats');
      await click('[data-test-add]');
      expect(currentRouteName()).to.equal('tariff-plan.tp-cdr-stats.new');
    }));

  const setFilters = async () => {
    await fillIn('[data-test-filter-tag] input', 'tag');
    await selectChoose('[data-test-filter-metrics]', 'ACD');
    await fillIn('[data-test-filter-tors] input', 'tors');
    await fillIn('[data-test-filter-cdr-hosts] input', 'cdr-hosts');
    await fillIn('[data-test-filter-cdr-sources] input', 'cdr-sources');
    await fillIn('[data-test-filter-req-types] input', 'req-types');
    await fillIn('[data-test-filter-directions] input', 'directions');
    await fillIn('[data-test-filter-tenants] input', 'tenants');
    await fillIn('[data-test-filter-categories] input', 'categories');
    await fillIn('[data-test-filter-accounts] input', 'accounts');
    await fillIn('[data-test-filter-subjects] input', 'subjects');
    await fillIn('[data-test-filter-suppliers] input', 'suppliers');
    await selectSearch('[data-test-filter-destination-ids]', 'tag-1');
    await selectChoose('[data-test-filter-destination-ids]', 'tag-1');
    await selectSearch('[data-test-filter-action-triggers]', 'tag-2');
    await selectChoose('[data-test-filter-action-triggers]', 'tag-2');
    await fillIn('[data-test-filter-queue-length] input', 22);
    await fillIn('[data-test-filter-time-window] input', 10);
    await fillIn('[data-test-filter-save-interval] input', 20);
    await fillIn('[data-test-filter-setup-interval] input', 'setup-interval');
    await fillIn('[data-test-filter-pdd-interval] input', 'pdd-interval');
    await fillIn('[data-test-filter-usage-interval] input', 'usage-interval');
    await fillIn(
      '[data-test-filter-disconnect-causes] input',
      'disconnect-causes'
    );
    await fillIn(
      '[data-test-filter-mediation-runids] input',
      'mediation-runids'
    );
    await fillIn('[data-test-filter-rated-accounts] input', 'rated-accounts');
    await fillIn('[data-test-filter-rated-subjects] input', 'rated-subjects');
    await fillIn('[data-test-filter-subjects] input', 'subjects');
    await fillIn('[data-test-filter-cost-interval] input', 'cost-interval');
  };
  const expectFiltersQueryParams = (request) => {
    expect(request.queryParams['tpid']).to.eq('tptest');
    expect(request.queryParams['filter[tag]']).to.eq('tag');
    expect(request.queryParams['filter[metrics]']).to.eq('ACD');
    expect(request.queryParams['filter[tors]']).to.eq('tors');
    expect(request.queryParams['filter[cdr_hosts]']).to.eq('cdr-hosts');
    expect(request.queryParams['filter[cdr_sources]']).to.eq('cdr-sources');
    expect(request.queryParams['filter[req_types]']).to.eq('req-types');
    expect(request.queryParams['filter[directions]']).to.eq('directions');
    expect(request.queryParams['filter[tenants]']).to.eq('tenants');
    expect(request.queryParams['filter[categories]']).to.eq('categories');
    expect(request.queryParams['filter[accounts]']).to.eq('accounts');
    expect(request.queryParams['filter[subjects]']).to.eq('subjects');
    expect(request.queryParams['filter[suppliers]']).to.eq('suppliers');
    expect(request.queryParams['filter[destination_ids]']).to.eq('tag-1');
    expect(request.queryParams['filter[action_triggers]']).to.eq('tag-2');
    expect(request.queryParams['filter[queue_length]']).to.eq('22');
    expect(request.queryParams['filter[time_window]']).to.eq('10');
    expect(request.queryParams['filter[save_interval]']).to.eq('20');
    expect(request.queryParams['filter[setup_interval]']).to.eq(
      'setup-interval'
    );
    expect(request.queryParams['filter[pdd_interval]']).to.eq('pdd-interval');
    expect(request.queryParams['filter[usage_interval]']).to.eq(
      'usage-interval'
    );
    expect(request.queryParams['filter[disconnect_causes]']).to.eq(
      'disconnect-causes'
    );
    expect(request.queryParams['filter[mediation_runids]']).to.eq(
      'mediation-runids'
    );
    expect(request.queryParams['filter[rated_accounts]']).to.eq(
      'rated-accounts'
    );
    expect(request.queryParams['filter[rated_subjects]']).to.eq(
      'rated-subjects'
    );
    expect(request.queryParams['filter[cost_interval]']).to.eq('cost-interval');
  };

  describe('set filters and click search button', () =>
    it('makes a correct filter query', async function () {
      let counter = 0;

      server.get('/tp-cdr-stats', function (schema, request) {
        counter = counter + 1;
        switch (counter) {
          case 1:
            expect(isBlank(request.queryParams['filter[tag]'])).to.eq(true);
            expect(isBlank(request.queryParams['filter[metrics]'])).to.eq(true);
            expect(isBlank(request.queryParams['filter[tors]'])).to.eq(true);
            expect(isBlank(request.queryParams['filter[cdr_hosts]'])).to.eq(
              true
            );
            expect(isBlank(request.queryParams['filter[cdr_sources]'])).to.eq(
              true
            );
            expect(isBlank(request.queryParams['filter[req_types]'])).to.eq(
              true
            );
            expect(isBlank(request.queryParams['filter[directions]'])).to.eq(
              true
            );
            expect(isBlank(request.queryParams['filter[tenants]'])).to.eq(true);
            expect(isBlank(request.queryParams['filter[categories]'])).to.eq(
              true
            );
            expect(isBlank(request.queryParams['filter[accounts]'])).to.eq(
              true
            );
            expect(isBlank(request.queryParams['filter[subjects]'])).to.eq(
              true
            );
            expect(isBlank(request.queryParams['filter[suppliers]'])).to.eq(
              true
            );
            expect(
              isBlank(request.queryParams['filter[destination_ids]'])
            ).to.eq(true);
            expect(
              isBlank(request.queryParams['filter[action_triggers]'])
            ).to.eq(true);
            expect(isBlank(request.queryParams['filter[queue_length]'])).to.eq(
              true
            );
            expect(isBlank(request.queryParams['filter[time_window]'])).to.eq(
              true
            );
            expect(isBlank(request.queryParams['filter[save_interval]'])).to.eq(
              true
            );
            expect(
              isBlank(request.queryParams['filter[setup_interval]'])
            ).to.eq(true);
            expect(isBlank(request.queryParams['filter[pdd_interval]'])).to.eq(
              true
            );
            expect(
              isBlank(request.queryParams['filter[usage_interval]'])
            ).to.eq(true);
            expect(
              isBlank(request.queryParams['filter[disconnect_causes]'])
            ).to.eq(true);
            expect(
              isBlank(request.queryParams['filter[mediation_runids]'])
            ).to.eq(true);
            expect(
              isBlank(request.queryParams['filter[rated_accounts]'])
            ).to.eq(true);
            expect(
              isBlank(request.queryParams['filter[rated_subjects]'])
            ).to.eq(true);
            expect(isBlank(request.queryParams['filter[cost_interval]'])).to.eq(
              true
            );
            break;
          default:
            expectFiltersQueryParams(request);
        }
        return { data: [{ id: '1', type: 'tp-cdr-stat' }] };
      });

      await visit('/tariff-plans/1/tp-cdr-stats');
      await setFilters();
      await click('[data-test-filter-search-btn]');
      expect(counter).to.eq(2);
    }));

  describe('set filters and click download csv button', function () {
    it('sends request to the server with filters', async function () {
      let expectRequestToBeCorrect = () => expect(false).to.eq(true);
      server.get('/tp-cdr-stats/export-to-csv/', function (_schema, request) {
        expectRequestToBeCorrect = () => {
          expectFiltersQueryParams(request);
        };
        return { data: [{ id: '1', type: 'tp-cdr-stat' }] };
      });
      await visit('/tariff-plans/1/tp-cdr-stats');
      await setFilters();
      await click('[data-test-filter-search-btn]');
      await click('[data-test-download]');
      expectRequestToBeCorrect();
    });
  });

  describe('click to upload csv button', function () {
    it('redirects to upload csv page', async function () {
      await visit('/tariff-plans/1/tp-cdr-stats');
      await click('[data-test-upload]');
      expect(currentURL()).to.eq('/tariff-plans/1/tp-cdr-stats/csv-import');
    });
  });

  describe('set filters and click refresh button', function () {
    it('makes a correct query', async function () {
      let expectRequestToBeCorrect = () => expect(false).to.eq(true);
      server.get('/tp-cdr-stats', function (_schema, request) {
        expectRequestToBeCorrect = () => {
          expectFiltersQueryParams(request);
        };
        return { data: [{ id: '1', type: 'tp-cdr-stat' }] };
      });
      await visit('/tariff-plans/1/tp-cdr-stats');
      await setFilters();
      await click('[data-test-filter-search-btn]');
      await click('[data-test-refresh]');
      expectRequestToBeCorrect();
    });
  });

  describe('set filters and click delete all button', function () {
    let expectRequestToBeCorrect = () => expect(false).to.eq(true);
    beforeEach(async function () {
      server.post('/tp-cdr-stats/delete-all', function (_schema, request) {
        expectRequestToBeCorrect = () => {
          const params = JSON.parse(request.requestBody);
          expect(params.tpid).to.eq('tptest');
          expect(params.filter.tag).to.eq('tag');
          expect(params.filter.metrics).to.eq('ACD');
          expect(params.filter.tors).to.eq('tors');
          expect(params.filter.cdr_hosts).to.eq('cdr-hosts');
          expect(params.filter.cdr_sources).to.eq('cdr-sources');
          expect(params.filter.req_types).to.eq('req-types');
          expect(params.filter.directions).to.eq('directions');
          expect(params.filter.tenants).to.eq('tenants');
          expect(params.filter.categories).to.eq('categories');
          expect(params.filter.accounts).to.eq('accounts');
          expect(params.filter.subjects).to.eq('subjects');
          expect(params.filter.suppliers).to.eq('suppliers');
          expect(params.filter.destination_ids).to.eq('tag-1');
          expect(params.filter.action_triggers).to.eq('tag-2');
          expect(params.filter.queue_length).to.eq('22');
          expect(params.filter.time_window).to.eq('10');
          expect(params.filter.save_interval).to.eq('20');
          expect(params.filter.setup_interval).to.eq('setup-interval');
          expect(params.filter.pdd_interval).to.eq('pdd-interval');
          expect(params.filter.usage_interval).to.eq('usage-interval');
          expect(params.filter.disconnect_causes).to.eq('disconnect-causes');
          expect(params.filter.mediation_runids).to.eq('mediation-runids');
          expect(params.filter.rated_accounts).to.eq('rated-accounts');
          expect(params.filter.rated_subjects).to.eq('rated-subjects');
          expect(params.filter.cost_interval).to.eq('cost-interval');
        };
        return { data: { id: '0' } };
      });
      await visit('/tariff-plans/1/tp-cdr-stats');
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

      server.get('/tp-cdr-stats', function (schema, request) {
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
        return { data: [{ id: '1', type: 'tp-cdr-stat' }] };
      });

      await visit('/tariff-plans/1/tp-cdr-stats');
      await click('[data-test-sort-tag] a');
      await click('[data-test-sort-tag] a');
      expect(counter).to.eq(3);
    }));

  describe('click pagination link', () =>
    it('makes a correct pagination query', async function () {
      let counter = 0;

      server.get('/tp-cdr-stats', function (schema, request) {
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
          data: [{ id: '1', type: 'tp-cdr-stat' }],
          meta: { total_pages: 2 },
        };
      });

      await visit('/tariff-plans/1/tp-cdr-stats');
      await click('[data-test-pagination-forward]');
      expect(counter).to.eq(2);
    }));
});
