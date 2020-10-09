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

describe('Acceptance: TpRatingPlans.Index', function () {
  let hooks = setupApplicationTest();
  setupMirage(hooks);

  beforeEach(async function () {
    this.tariffPlan = server.create('tariff-plan', {
      id: '1',
      name: 'Test',
      alias: 'tptest',
    });
    this.tpRatingPlans = server.createList('tp-rating-plan', 2, {
      tpid: this.tariffPlan.alias,
    });
    this.other = server.createList('tp-rating-plan', 2, { tpid: 'other' });
    await authenticateSession({ email: 'user@example.com' });
  });

  describe('visit /tariff-plans/1/tp-rating-plans', () =>
    it('renders table with tp-rating-plans', async function () {
      await visit('/tariff-plans/1/tp-rating-plans');
      expect(find('main h2').textContent).to.eq('TpRatingPlans list');
      expect(findAll('table tbody tr').length).to.eq(2);
    }));

  describe('server responsed with meta: total_records', function () {
    it('displays total records', async function () {
      server.get('/tp-rating-plans', function () {
        return { data: [], meta: { total_records: 55 } };
      });
      await visit('/tariff-plans/1/tp-rating-plans');
      expect(find('.tp-total-records').textContent.trim()).to.eq('Total: 55');
    });
  });

  describe('select tp-rating-plan', () =>
    it('reditects to tp-rating-plan page', async function () {
      await visit('/tariff-plans/1/tp-rating-plans');
      await click('table tbody tr:first-child td:first-child a');
      expect(currentRouteName()).to.equal(
        'tariff-plan.tp-rating-plans.tp-rating-plan.index'
      );
    }));

  describe('click edit button', () =>
    it('reditects to edit tp-rating-plan page', async function () {
      await visit('/tariff-plans/1/tp-rating-plans');
      await click('[data-test-tp-rating-plan-edit]');
      expect(currentRouteName()).to.equal(
        'tariff-plan.tp-rating-plans.tp-rating-plan.edit'
      );
    }));

  describe('click remove button', () =>
    it('removes tp-rating-plan', async function () {
      await visit('/tariff-plans/1/tp-rating-plans');
      await click('[data-test-tp-rating-plan-remove]');
      expect(findAll('table tbody tr').length).to.eq(1);
    }));

  describe('click add button', () =>
    it('redirects to new tp-rating-plan page', async function () {
      await visit('/tariff-plans/1/tp-rating-plans');
      await click('[data-test-add]');
      expect(currentRouteName()).to.equal('tariff-plan.tp-rating-plans.new');
    }));

  const setFilters = async () => {
    await fillIn('[data-test-filter-tag] input', 'tagtest');
    await fillIn('[data-test-filter-destrates-tag] input', 'destratetest');
    await fillIn('[data-test-filter-timing-tag] input', 'timingtest');
    await fillIn('[data-test-filter-weight] input', '12.1');
  };
  const expectFiltersQueryParams = (request) => {
    expect(request.queryParams['tpid']).to.eq('tptest');
    expect(request.queryParams['filter[tag]']).to.eq('tagtest');
    expect(request.queryParams['filter[destrates_tag]']).to.eq('destratetest');
    expect(request.queryParams['filter[timing_tag]']).to.eq('timingtest');
    expect(request.queryParams['filter[weight]']).to.eq('12.1');
  };

  describe('set filters and click search button', () =>
    it('makes a correct filter query', async function () {
      let counter = 0;

      server.get('/tp-rating-plans/', function (schema, request) {
        counter = counter + 1;
        const filterTag = request.queryParams['filter[tag]'];
        const filterDestratesTag = request.queryParams['filter[destrates_tag]'];
        const filterTimingTag = request.queryParams['filter[timing_tag]'];
        const filterWeight = request.queryParams['filter[weight]'];
        switch (counter) {
          case 1:
            expect(isBlank(filterTag)).to.eq(true);
            expect(isBlank(filterDestratesTag)).to.eq(true);
            expect(isBlank(filterTimingTag)).to.eq(true);
            expect(isBlank(filterWeight)).to.eq(true);
            break;

          default:
            expectFiltersQueryParams(request);
        }
        return { data: [{ id: '1', type: 'tp-rating-plan' }] };
      });

      await visit('/tariff-plans/1/tp-rating-plans');
      await setFilters();
      await click('[data-test-filter-search-btn]');
      expect(counter).to.eq(2);
    }));

  describe('filter and click download csv', function () {
    it('sends request to the server with filters', async function () {
      let expectRequestToBeCorrect = () => expect(false).to.eq(true);
      server.get('/tp-rating-plans/export-to-csv/', function (
        _schema,
        request
      ) {
        expectRequestToBeCorrect = () => {
          expectFiltersQueryParams(request);
        };
        return { data: [{ id: '1', type: 'tp-rating-plan' }] };
      });
      await visit('/tariff-plans/1/tp-rating-plans');
      await setFilters();
      await click('[data-test-filter-search-btn]');
      await click('[data-test-download]');
      expectRequestToBeCorrect();
    });
  });

  describe('click to upload csv link', function () {
    it('redirects to upload csv page', async function () {
      await visit('/tariff-plans/1/tp-rating-plans');
      await click('[data-test-upload]');
      expect(currentURL()).to.eq('/tariff-plans/1/tp-rating-plans/csv-import');
    });
  });

  describe('click refresh button', function () {
    it('makes a correct query', async function () {
      let expectRequestToBeCorrect = () => expect(false).to.eq(true);
      server.get('/tp-rating-plans/', function (_schema, request) {
        expectRequestToBeCorrect = () => {
          expectFiltersQueryParams(request);
        };
        return { data: [{ id: '1', type: 'tp-rating-plan' }] };
      });
      await visit('/tariff-plans/1/tp-rating-plans');
      await setFilters();
      await click('[data-test-filter-search-btn]');
      await click('[data-test-refresh]');
      expectRequestToBeCorrect();
    });
  });

  describe('filter and delete all', function () {
    let expectRequestToBeCorrect = () => expect(false).to.eq(true);
    beforeEach(async function () {
      server.post('/tp-rating-plans/delete-all', function (_schema, request) {
        expectRequestToBeCorrect = () => {
          const params = JSON.parse(request.requestBody);
          expect(params.tpid).to.eq('tptest');
          expect(params.filter.tag).to.eq('tagtest');
          expect(params.filter.destrates_tag).to.eq('destratetest');
          expect(params.filter.timing_tag).to.eq('timingtest');
          expect(params.filter.weight).to.eq('12.1');
        };
        return { tp_rating_plan: { id: '0' } };
      });
      await visit('/tariff-plans/1/tp-rating-plans');
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

      server.get('/tp-rating-plans/', function (schema, request) {
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
        return { data: [{ id: '1', type: 'tp-rating-plan' }] };
      });

      await visit('/tariff-plans/1/tp-rating-plans');
      await click('[data-test-sort-tag] a');
      await click('[data-test-sort-tag] a');
      expect(counter).to.eq(3);
    }));

  return describe('click pagination link', () =>
    it('makes a correct pagination query', async function () {
      let counter = 0;

      server.get('/tp-rating-plans/', function (schema, request) {
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
          data: [{ id: '1', type: 'tp-rating-plan' }],
          meta: { total_pages: 2 },
        };
      });

      await visit('/tariff-plans/1/tp-rating-plans');
      await click('[data-test-pagination-forward]');
      expect(counter).to.eq(2);
    }));
});
