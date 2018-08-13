import { describe, it, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import startApp from 'cgrates-web-frontend/tests/helpers/start-app';
import destroyApp from 'cgrates-web-frontend/tests/helpers/destroy-app';
import { authenticateSession } from 'cgrates-web-frontend/tests/helpers/ember-simple-auth';
import { isBlank } from '@ember/utils';
import registerPowerSelectHelpers from 'cgrates-web-frontend/tests/helpers/ember-power-select';

registerPowerSelectHelpers();

describe("Acceptance: TpActions.Index", function() {
  beforeEach(function() {
    this.App = startApp();
    this.tariffPlan = server.create('tariff-plan', {name: 'Test', alias: 'tptest'});
    this.tpActions = server.createList('tp-action', 2, {tpid: this.tariffPlan.alias});
    this.other = server.createList('tp-action', 2, {tpid: 'other'});
    authenticateSession(this.App, {email: "user@example.com"});
  });

  afterEach(function () {
    destroyApp(this.App);
  });

  describe('visit /tariff-plans/1/tp-actions', () =>
    it("renders table with tp-actions", function() {
      visit('/tariff-plans/1/tp-actions');
      return andThen(function() {
        expect(find('main h2').text()).to.eq('TpActions list');
        return expect(find('table tbody tr').length).to.eq(2);
      });
    })
  );

  describe('select tp-action', () =>
    it('reditects to tp-action page', function() {
      visit('/tariff-plans/1/tp-actions');
      click('table tbody tr:first-child td:first-child a');
      return andThen(() => expect(currentPath()).to.equal("tariff-plans.tariff-plan.tp-actions.tp-action.index"));
    })
  );

  describe('click edit button', () =>
    it('reditects to edit tp-action page', function() {
      visit('/tariff-plans/1/tp-actions');
      click('table tbody tr:first-child a.edit');
      return andThen(() => expect(currentPath()).to.equal('tariff-plans.tariff-plan.tp-actions.tp-action.edit'));
    })
  );

  describe('click remove button', () =>
    it('removes tp-action', function() {
      visit('/tariff-plans/1/tp-actions');
      click('table tbody tr:first-child a.remove');
      return andThen(() => expect(find('table tbody tr').length).to.eq(1));
    })
  );

  describe('click add button', () =>
    it('redirects to new tp-action page', function() {
      visit('/tariff-plans/1/tp-actions');
      click('.fixed-action-btn a');
      return andThen(() => expect(currentPath()).to.equal('tariff-plans.tariff-plan.tp-actions.new'));
    })
  );

  describe('set filters and click search button', () =>
    it('makes a correct filter query', function() {
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
            expect(filterTag).to.eq('tagtest');
            expect(filterAction).to.eq('*log');
            expect(filterBalanceTag).to.eq('balancetest');
            expect(filterBalanceType).to.eq('*monetary');
            expect(filterDirections).to.eq('*out');
            expect(filterUnits).to.eq('120');
            expect(filterExpiryTime).to.eq('*unlimited');
            expect(filterTimingTags).to.eq('timingtest');
            expect(filterDestinationTags).to.eq('destinationtest');
            expect(filterRatingSubject).to.eq('subjecttest');
            expect(filterCategories).to.eq('categoriestest');
            expect(filterSharedGroups).to.eq('groupstest');
            expect(filterBalanceWeight).to.eq('20');
            expect(filterBalanceBlocker).to.eq('false');
            expect(filterBalanceDisabled).to.eq('false');
            expect(filterWeight).to.eq('10');
        }
        return { data: [{id: '1', type: 'tp-action'}] };
      });

      visit('/tariff-plans/1/tp-actions');
      return andThen(function() {
        fillIn(`#${find("label:contains('Tag')").attr('for')}`, 'tagtest');
        selectChoose(`#${find("label:contains('Action')").attr('for')}`, '*log');
        fillIn(`#${find("label:contains('Balance tag')").attr('for')}`, 'balancetest');
        selectChoose(`#${find("label:contains('Balance type')").attr('for')}`, '*monetary');
        selectChoose(`#${find("label:contains('Directions')").attr('for')}`, '*out');
        fillIn(`#${find("label:contains('Units')").attr('for')}`, '120');
        fillIn(`#${find("label:contains('Expiry time')").attr('for')}`, '*unlimited');
        fillIn(`#${find("label:contains('Timing tags')").attr('for')}`, 'timingtest');
        fillIn(`#${find("label:contains('Destination tags')").attr('for')}`, 'destinationtest');
        fillIn(`#${find("label:contains('Rating subject')").attr('for')}`, 'subjecttest');
        fillIn(`#${find("label:contains('Categories')").attr('for')}`, 'categoriestest');
        fillIn(`#${find("label:contains('Shared groups')").attr('for')}`, 'groupstest');
        fillIn(`#${find("label:contains('Balance weight')").attr('for')}`, '20');
        selectChoose(`#${find("label:contains('Balance blocker')").attr('for')}`, 'false');
        selectChoose(`#${find("label:contains('Balance disabled')").attr('for')}`, 'false');
        fillIn(`#${find("label:contains('Weight')").attr('for')}`, '10');
        click('button.search-button');
        return andThen(() => expect(counter).to.eq(2));
      });
    })
  );

  describe('click column header', () =>
    it('makes a correct sort query', function() {
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

      visit('/tariff-plans/1/tp-actions');
      click(".sort-header a:contains('Tag')");
      click(".sort-header a:contains('Tag')");
      return andThen(() => expect(counter).to.eq(3));
    })
  );

  return describe('click pagination link', () =>
    it('makes a correct pagination query', function() {
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

      visit('/tariff-plans/1/tp-actions');
      click("ul.pagination li a:contains('2')");
      return andThen(() => expect(counter).to.eq(2));
    })
  );
});
