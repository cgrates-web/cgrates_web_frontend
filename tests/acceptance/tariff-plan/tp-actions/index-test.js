import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';
import { setupApplicationTest } from 'ember-mocha';
import { authenticateSession } from 'ember-simple-auth/test-support';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { isBlank } from '@ember/utils';
import { visit, click, find, findAll, currentRouteName, fillIn, currentURL } from '@ember/test-helpers';
import { selectChoose } from 'ember-power-select/test-support/helpers';

describe("Acceptance: TpActions.Index", function() {
  let hooks = setupApplicationTest();
  setupMirage(hooks);

  beforeEach(async function() {
    this.tariffPlan = server.create('tariff-plan', {id: '1', name: 'Test', alias: 'tptest'});
    this.tpActions = server.createList('tp-action', 2, {tpid: this.tariffPlan.alias});
    this.other = server.createList('tp-action', 2, {tpid: 'other'});
    await authenticateSession({email: "user@example.com"});
  });

  describe('visit /tariff-plans/1/tp-actions', () =>
    it("renders table with tp-actions", async function() {
      await visit('/tariff-plans/1/tp-actions');
      expect(find('main h2').textContent).to.eq('TpActions list');
      expect(findAll('table tbody tr').length).to.eq(2);
    })
  );

  describe('select tp-action', () =>
    it('reditects to tp-action page', async function() {
      await visit('/tariff-plans/1/tp-actions');
      await click('table tbody tr:first-child td:first-child a');
      expect(currentRouteName()).to.equal('tariff-plan.tp-actions.tp-action.index');
    })
  );

  describe('click edit button', () =>
    it('reditects to edit tp-action page', async function() {
      await visit('/tariff-plans/1/tp-actions');
      await click('[data-test-tp-action-edit]');
      expect(currentRouteName()).to.equal('tariff-plan.tp-actions.tp-action.edit')
    })
  );

  describe('click remove button', () =>
    it('removes tp-action', async function() {
      await visit('/tariff-plans/1/tp-actions');
      await click('[data-test-tp-action-remove]');
      expect(findAll('table tbody tr').length).to.eq(1);
    })
  );

  describe('click add button', () =>
    it('redirects to new tp-action page', async function() {
      await visit('/tariff-plans/1/tp-actions');
      await click('[data-test-add]');
      expect(currentRouteName()).to.equal('tariff-plan.tp-actions.new')
    })
  );

  const setFilters = async () => {
    await fillIn('[data-test-filter-tag] input', 'tagtest');
    await selectChoose('[data-test-filter-action]', '*log');
    await fillIn('[data-test-filter-balance-tag] input', 'balancetest');
    await selectChoose('[data-test-filter-balance-type]', '*monetary');
    await selectChoose('[data-test-filter-directions]', '*out');
    await fillIn('[data-test-filter-units] input', '120');
    await fillIn('[data-test-filter-expiry-time] input', '*unlimited');
    await fillIn('[data-test-filter-timing-tags] input', 'timingtest');
    await fillIn('[data-test-filter-destination-tags] input', 'destinationtest');
    await fillIn('[data-test-filter-rating-subject] input', 'subjecttest');
    await fillIn('[data-test-filter-categories] input', 'categoriestest');
    await fillIn('[data-test-filter-shared-groups] input', 'groupstest');
    await fillIn('[data-test-filter-balance-weight] input', '20');
    await selectChoose('[data-test-filter-balance-blocker]', 'false');
    await selectChoose('[data-test-filter-balance-disabled]', 'false');
    await fillIn('[data-test-filter-weight] input', '10');
  };
  const expectFiltersQueryParams = (request) => {
    expect(request.queryParams['tpid']).to.eq('tptest');
    expect(request.queryParams['filter[tag]']).to.eq('tagtest');
    expect(request.queryParams['filter[action]']).to.eq('*log');
    expect(request.queryParams['filter[balance_tag]']).to.eq('balancetest');
    expect(request.queryParams['filter[balance_type]']).to.eq('*monetary');
    expect(request.queryParams['filter[directions]']).to.eq('*out');
    expect(request.queryParams['filter[units]']).to.eq('120');
    expect(request.queryParams['filter[expiry_time]']).to.eq('*unlimited');
    expect(request.queryParams['filter[timing_tags]']).to.eq('timingtest');
    expect(request.queryParams['filter[destination_tags]']).to.eq('destinationtest');
    expect(request.queryParams['filter[rating_subject]']).to.eq('subjecttest');
    expect(request.queryParams['filter[categories]']).to.eq('categoriestest');
    expect(request.queryParams['filter[shared_groups]']).to.eq('groupstest');
    expect(request.queryParams['filter[balance_weight]']).to.eq('20');
    expect(request.queryParams['filter[balance_blocker]']).to.eq('false');
    expect(request.queryParams['filter[balance_disabled]']).to.eq('false');
    expect(request.queryParams['filter[weight]']).to.eq('10');
  };

  describe('set filters and click search button', () =>
    it('makes a correct filter query', async function() {
      let counter = 0;
      server.get('/tp-actions/', function(schema, request) {
        counter = counter + 1;
        const filterTag = request.queryParams['filter[tag]'];
        const filterAction = request.queryParams['filter[action]'];
        const filterBalanceTag = request.queryParams['filter[balance_tag]'];
        const filterBalanceType = request.queryParams['filter[balance_type]'];
        const filterDirections = request.queryParams['filter[directions]'];
        const filterUnits = request.queryParams['filter[units]'];
        const filterExpiryTime = request.queryParams['filter[expiry_time]'];
        const filterTimingTags = request.queryParams['filter[timing_tags]'];
        const filterDestinationTags = request.queryParams['filter[destination_tags]'];
        const filterRatingSubject = request.queryParams['filter[rating_subject]'];
        const filterCategories = request.queryParams['filter[categories]'];
        const filterSharedGroups = request.queryParams['filter[shared_groups]'];
        const filterBalanceWeight = request.queryParams['filter[balance_weight]'];
        const filterBalanceBlocker = request.queryParams['filter[balance_blocker]'];
        const filterBalanceDisabled = request.queryParams['filter[balance_disabled]'];
        const filterWeight = request.queryParams['filter[weight]'];
        switch (counter) {
          case 1:
            expect(isBlank(filterTag)).to.eq(true);
            expect(isBlank(filterAction)).to.eq(true);
            expect(isBlank(filterBalanceTag)).to.eq(true);
            expect(isBlank(filterBalanceType)).to.eq(true);
            expect(isBlank(filterDirections)).to.eq(true);
            expect(isBlank(filterUnits)).to.eq(true);
            expect(isBlank(filterExpiryTime)).to.eq(true);
            expect(isBlank(filterTimingTags)).to.eq(true);
            expect(isBlank(filterDestinationTags)).to.eq(true);
            expect(isBlank(filterRatingSubject)).to.eq(true);
            expect(isBlank(filterCategories)).to.eq(true);
            expect(isBlank(filterSharedGroups)).to.eq(true);
            expect(isBlank(filterBalanceWeight)).to.eq(true);
            expect(isBlank(filterBalanceBlocker)).to.eq(true);
            expect(isBlank(filterBalanceDisabled)).to.eq(true);
            expect(isBlank(filterWeight)).to.eq(true);
            break;
          default:
            expectFiltersQueryParams(request);
        }
        return { data: [{id: '1', type: 'tp-action'}] };
      });

      await visit('/tariff-plans/1/tp-actions');
      await setFilters();
      await click('[data-test-filter-search-btn]');
      expect(counter).to.eq(2);
    })
  );

  describe('filter and click download csv', function () {
    it('sends request to the server with filters', async function () {
      let expectRequestToBeCorrect = () => expect(false).to.eq(true);
      server.get('/tp-actions/export-to-csv/', function (_schema, request) {
        expectRequestToBeCorrect = () => {
          expectFiltersQueryParams(request);
        };
        return { data: [{id: '1', type: 'tp-action'}] };
      });
      await visit('/tariff-plans/1/tp-actions');
      await setFilters();
      await click('[data-test-filter-search-btn]');
      await click('[data-test-download]');
      expectRequestToBeCorrect();
    });
  });

  describe('click to upload csv link', function () {
    it('redirects to upload csv page', async function() {
      await visit('/tariff-plans/1/tp-actions');
      await click('[data-test-upload]');
      expect(currentURL()).to.eq('/tariff-plans/1/tp-actions/csv-import');
    });
  });

  describe('click refresh button', function () {
    it('makes a correct query', async function() {
      let expectRequestToBeCorrect = () => expect(false).to.eq(true);
      server.get('/tp-actions/', function (_schema, request) {
        expectRequestToBeCorrect = () => {
          expectFiltersQueryParams(request);
        };
        return { data: [{id: '1', type: 'tp-action'}] };
      });
      await visit('/tariff-plans/1/tp-actions');
      await setFilters();
      await click('[data-test-filter-search-btn]');
      await click('[data-test-refresh]');
      expectRequestToBeCorrect();
    });
  });

  describe('filter and delete all', function () {
    let expectRequestToBeCorrect = () => expect(false).to.eq(true);
    beforeEach(async function() {
      server.post('/tp-actions/delete-all', function (_schema, request) {
        expectRequestToBeCorrect = () => {
          const params = JSON.parse(request.requestBody);
          expect(params.tpid).to.eq('tptest');
          expect(params.filter.tag).to.eq('tagtest');
          expect(params.filter.action).to.eq('*log');
          expect(params.filter.balance_tag).to.eq('balancetest');
          expect(params.filter.balance_type).to.eq('*monetary');
          expect(params.filter.directions).to.eq('*out');
          expect(params.filter.units).to.eq('120');
          expect(params.filter.expiry_time).to.eq('*unlimited');
          expect(params.filter.timing_tags).to.eq('timingtest');
          expect(params.filter.destination_tags).to.eq('destinationtest');
          expect(params.filter.rating_subject).to.eq('subjecttest');
          expect(params.filter.categories).to.eq('categoriestest');
          expect(params.filter.shared_groups).to.eq('groupstest');
          expect(params.filter.balance_weight).to.eq('20');
          expect(params.filter.balance_blocker).to.eq('false');
          expect(params.filter.balance_disabled).to.eq('false');
          expect(params.filter.weight).to.eq('10');
        };
        return { tp_action_plan: { id: '0' } };
      });
      await visit('/tariff-plans/1/tp-actions');
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
    it('makes a correct sort query', async function() {
      let counter = 0;

      server.get('/tp-actions/', function(schema, request) {
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
        return { data: [{id: '1', type: 'tp-action'}] };
      });

      await visit('/tariff-plans/1/tp-actions');
      await click('[data-test-sort-tag] a');
      await click('[data-test-sort-tag] a');
      expect(counter).to.eq(3);
    })
  );

  describe('click pagination link', () =>
    it('makes a correct pagination query', async function() {
      let counter = 0;

      server.get('/tp-actions/', function(schema, request) {
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
        return { data: [{id: '1', type: 'tp-action'}], meta: {total_pages: 2} };
      });

      await visit('/tariff-plans/1/tp-actions');
      await click('[data-test-pagination-forward]');
      expect(counter).to.eq(2)
    })
  );
});
