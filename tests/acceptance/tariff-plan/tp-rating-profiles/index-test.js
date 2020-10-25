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
import { isBlank } from '@ember/utils';
import { selectChoose } from 'ember-power-select/test-support/helpers';

describe('Acceptance: TpRatingProfiles.Index', function () {
  let hooks = setupApplicationTest();
  setupMirage(hooks);

  beforeEach(async function () {
    this.tariffPlan = server.create('tariff-plan', {
      id: '1',
      name: 'Test',
      alias: 'tptest',
    });
    this.tpRatingProfiles = server.createList('tp-rating-profile', 2, {
      tpid: this.tariffPlan.alias,
    });
    this.other = server.createList('tp-rating-profile', 2, { tpid: 'other' });
    await authenticateSession({ email: 'user@example.com' });
  });

  describe('visit /tariff-plans/1/tp-rating-profiles', () =>
    it('renders table with tp-rating-profiles', async function () {
      await visit('/tariff-plans/1/tp-rating-profiles');
      expect(find('main h2')).to.have.trimmed.text('TpRatingProfiles list');
      expect(findAll('table tbody tr').length).to.eq(2);
    }));

  describe('server responsed with meta: total_records', function () {
    it('displays total records', async function () {
      server.get('/tp-rating-profiles', function () {
        return { data: [], meta: { total_records: 55 } };
      });
      await visit('/tariff-plans/1/tp-rating-profiles');
      expect(find('.tp-total-records').textContent.trim()).to.eq('Total: 55');
    });
  });

  describe('select tp-rating-profile', () =>
    it('reditects to tp-rating-profile page', async function () {
      await visit('/tariff-plans/1/tp-rating-profiles');
      await click('table tbody tr:first-child td:first-child a');
      expect(currentRouteName()).to.equal(
        'tariff-plan.tp-rating-profiles.tp-rating-profile.index'
      );
    }));

  describe('click edit button', () =>
    it('reditects to edit tp-rating-profile page', async function () {
      await visit('/tariff-plans/1/tp-rating-profiles');
      await click('[data-test-rating-profile-edit]');
      expect(currentRouteName()).to.equal(
        'tariff-plan.tp-rating-profiles.tp-rating-profile.edit'
      );
    }));

  describe('click remove button', () =>
    it('removes tp-rating-profile', async function () {
      await visit('/tariff-plans/1/tp-rating-profiles');
      await click('[data-test-rating-profile-remove]');
      expect(findAll('table tbody tr').length).to.eq(1);
    }));

  describe('click add button', () =>
    it('redirects to new tp-rating-profile page', async function () {
      await visit('/tariff-plans/1/tp-rating-profiles');
      await click('[data-test-add]');
      expect(currentRouteName()).to.equal('tariff-plan.tp-rating-profiles.new');
    }));

  const setFilters = async () => {
    await fillIn('[data-test-filter-loadid] input', 'loadtest');
    await selectChoose('[data-test-filter-direction]', '*in');
    await fillIn('[data-test-filter-tenant] input', 'tenanttest');
    await fillIn('[data-test-filter-category] input', 'categorytest');
    await fillIn('[data-test-filter-subject] input', 'subject1');
    await fillIn('[data-test-filter-fallback-subjects] input', 'subject2');
    await fillIn('[data-test-filter-activation-time] input', 'activationtime');
    await fillIn('[data-test-filter-cdr-stat-queue-ids] input', 'queuetest');
    await fillIn('[data-test-filter-rating-plan-tags] input', 'ratingplan');
  };
  const expectFiltersQueryParams = (request) => {
    expect(request.queryParams['tpid']).to.eq('tptest');
    expect(request.queryParams['filter[loadid]']).to.eq('loadtest');
    expect(request.queryParams['filter[direction]']).to.eq('*in');
    expect(request.queryParams['filter[tenant]']).to.eq('tenanttest');
    expect(request.queryParams['filter[category]']).to.eq('categorytest');
    expect(request.queryParams['filter[subject]']).to.eq('subject1');
    expect(request.queryParams['filter[fallback_subjects]']).to.eq('subject2');
    expect(request.queryParams['filter[activation_time]']).to.eq(
      'activationtime'
    );
    expect(request.queryParams['filter[cdr_stat_queue_ids]']).to.eq(
      'queuetest'
    );
    expect(request.queryParams['filter[rating_plan_tag]']).to.eq('ratingplan');
  };

  describe('set filters and click search button', () =>
    it('makes a correct filter query', async function () {
      let counter = 0;

      server.get('/tp-rating-profiles/', function (schema, request) {
        counter = counter + 1;
        const filterLoadid = request.queryParams['filter[loadid]'];
        const filterDirection = request.queryParams['filter[direction]'];
        const filterTenant = request.queryParams['filter[tenant]'];
        const filterCategory = request.queryParams['filter[category]'];
        const filterSubject = request.queryParams['filter[subject]'];
        const filterFallbackSubjects =
          request.queryParams['filter[fallback_subjects]'];
        const filterActivationTime =
          request.queryParams['filter[activation_time]'];
        const filterCdrStatQueueIds =
          request.queryParams['filter[cdr_stat_queue_ids]'];
        const filterRatingPlanTag =
          request.queryParams['filter[rating_plan_tag]'];
        switch (counter) {
          case 1:
            expect(isBlank(filterLoadid)).to.eq(true);
            expect(isBlank(filterDirection)).to.eq(true);
            expect(isBlank(filterTenant)).to.eq(true);
            expect(isBlank(filterCategory)).to.eq(true);
            expect(isBlank(filterSubject)).to.eq(true);
            expect(isBlank(filterFallbackSubjects)).to.eq(true);
            expect(isBlank(filterActivationTime)).to.eq(true);
            expect(isBlank(filterCdrStatQueueIds)).to.eq(true);
            expect(isBlank(filterRatingPlanTag)).to.eq(true);
            break;
          default:
            expectFiltersQueryParams(request);
        }
        return { data: [{ id: '1', type: 'tp-rating-profile' }] };
      });

      await visit('/tariff-plans/1/tp-rating-profiles');
      await setFilters();
      await click('[data-test-filter-search-btn]');
      expect(counter).to.eq(2);
    }));

  describe('filter and click download csv', function () {
    it('sends request to the server with filters', async function () {
      let expectRequestToBeCorrect = () => expect(false).to.eq(true);
      server.get('/tp-rating-profiles/export-to-csv/', function (
        _schema,
        request
      ) {
        expectRequestToBeCorrect = () => {
          expectFiltersQueryParams(request);
        };
        return { data: [{ id: '1', type: 'ttp-rating-profile' }] };
      });
      await visit('/tariff-plans/1/tp-rating-profiles');
      await setFilters();
      await click('[data-test-filter-search-btn]');
      await click('[data-test-download]');
      expectRequestToBeCorrect();
    });
  });

  describe('click to upload csv link', function () {
    it('redirects to upload csv page', async function () {
      await visit('/tariff-plans/1/tp-rating-profiles');
      await click('[data-test-upload]');
      expect(currentURL()).to.eq(
        '/tariff-plans/1/tp-rating-profiles/csv-import'
      );
    });
  });

  describe('click refresh button', function () {
    it('makes a correct query', async function () {
      let expectRequestToBeCorrect = () => expect(false).to.eq(true);
      server.get('/tp-rating-profiles', function (_schema, request) {
        expectRequestToBeCorrect = () => {
          expectFiltersQueryParams(request);
        };
        return { data: [{ id: '1', type: 'tp-rating-profiles' }] };
      });
      await visit('/tariff-plans/1/tp-rating-profiles');
      await setFilters();
      await click('[data-test-filter-search-btn]');
      await click('[data-test-refresh]');
      expectRequestToBeCorrect();
    });
  });

  describe('filter and delete all', function () {
    let expectRequestToBeCorrect = () => expect(false).to.eq(true);
    beforeEach(async function () {
      server.post('/tp-rating-profiles/delete-all', function (
        _schema,
        request
      ) {
        expectRequestToBeCorrect = () => {
          const params = JSON.parse(request.requestBody);
          expect(params.tpid).to.eq('tptest');
          expect(params.filter.loadid).to.eq('loadtest');
          expect(params.filter.direction).to.eq('*in');
          expect(params.filter.tenant).to.eq('tenanttest');
          expect(params.filter.category).to.eq('categorytest');
          expect(params.filter.subject).to.eq('subject1');
          expect(params.filter.fallback_subjects).to.eq('subject2');
          expect(params.filter.activation_time).to.eq('activationtime');
          expect(params.filter.cdr_stat_queue_ids).to.eq('queuetest');
          expect(params.filter.rating_plan_tag).to.eq('ratingplan');
        };
        return { tp_rating_profile: { id: '0' } };
      });
      await visit('/tariff-plans/1/tp-rating-profiles');
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

      server.get('/tp-rating-profiles/', function (schema, request) {
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
        return { data: [{ id: '1', type: 'tp-rating-profile' }] };
      });

      await visit('/tariff-plans/1/tp-rating-profiles');
      await click('[data-test-sort-tenant] a');
      await click('[data-test-sort-tenant] a');
      expect(counter).to.eq(3);
    }));

  return describe('click pagination link', () =>
    it('makes a correct pagination query', async function () {
      let counter = 0;

      server.get('/tp-rating-profiles/', function (schema, request) {
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
          data: [{ id: '1', type: 'tp-rating-profile' }],
          meta: { total_pages: 2 },
        };
      });

      await visit('/tariff-plans/1/tp-rating-profiles');
      await click('[data-test-pagination-forward]');
      expect(counter).to.eq(2);
    }));
});
