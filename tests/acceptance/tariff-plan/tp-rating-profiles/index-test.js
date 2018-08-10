import { describe, it, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import startApp from 'cgrates-web-frontend/tests/helpers/start-app';
import destroyApp from 'cgrates-web-frontend/tests/helpers/destroy-app';
import { authenticateSession } from 'cgrates-web-frontend/tests/helpers/ember-simple-auth';
import { isBlank } from '@ember/utils';
import registerPowerSelectHelpers from 'cgrates-web-frontend/tests/helpers/ember-power-select';

registerPowerSelectHelpers();

describe("Acceptance: TpRatingProfiles.Index", function() {
  beforeEach(function() {
    this.App = startApp();
    this.tariffPlan = server.create('tariff-plan', {name: 'Test', alias: 'tptest'});
    this.tpRatingProfiles = server.createList('tp-rating-profile', 2, {tpid: this.tariffPlan.alias});
    this.other = server.createList('tp-rating-profile', 2, {tpid: 'other'});
    authenticateSession(this.App, {email: "user@example.com"});
  });

  afterEach(function () {
    destroyApp(this.App);
  });

  describe('visit /tariff-plans/1/tp-rating-profiles', () =>
    it("renders table with tp-rating-profiles", function() {
      visit('/tariff-plans/1/tp-rating-profiles');
      return andThen(function() {
        expect(find('main h2').text()).to.eq('TpRatingProfiles list');
        return expect(find('table tbody tr').length).to.eq(2);
      });
    })
  );

  describe('select tp-rating-profile', () =>
    it('reditects to tp-rating-profile page', function() {
      visit('/tariff-plans/1/tp-rating-profiles');
      click('table tbody tr:first-child td:first-child a');
      return andThen(() => expect(currentPath()).to.equal("tariff-plans.tariff-plan.tp-rating-profiles.tp-rating-profile.index"));
    })
  );

  describe('click edit button', () =>
    it('reditects to edit tp-rating-profile page', function() {
      visit('/tariff-plans/1/tp-rating-profiles');
      click('table tbody tr:first-child a.edit');
      return andThen(() => expect(currentPath()).to.equal('tariff-plans.tariff-plan.tp-rating-profiles.tp-rating-profile.edit'));
    })
  );

  describe('click remove button', () =>
    it('removes tp-rating-profile', function() {
      visit('/tariff-plans/1/tp-rating-profiles');
      click('table tbody tr:first-child a.remove');
      return andThen(() => expect(find('table tbody tr').length).to.eq(1));
    })
  );

  describe('click add button', () =>
    it('redirects to new tp-rating-profile page', function() {
      visit('/tariff-plans/1/tp-rating-profiles');
      click('.fixed-action-btn a');
      return andThen(() => expect(currentPath()).to.equal('tariff-plans.tariff-plan.tp-rating-profiles.new'));
    })
  );

  describe('set filters and click search button', () =>
    it('makes a correct filter query', function() {
      let counter = 0;

      server.get('/tp-rating-profiles/', function(schema, request) {
        counter = counter + 1;
        const filterLoadid = request.queryParams['filter[loadid]'];
        const filterDirection = request.queryParams['filter[direction]'];
        const filterTenant = request.queryParams['filter[tenant]'];
        const filterCategory = request.queryParams['filter[category]'];
        const filterSubject = request.queryParams['filter[subject]'];
        const filterFallbackSubjects = request.queryParams['filter[fallback_subjects]'];
        const filterActivationTime = request.queryParams['filter[activation_time]'];
        const filterCdrStatQueueIds = request.queryParams['filter[cdr_stat_queue_ids]'];
        const filterRatingPlanTag = request.queryParams['filter[rating_plan_tag]'];
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
            expect(filterLoadid).to.eq('loadtest');
            expect(filterDirection).to.eq('*in');
            expect(filterTenant).to.eq('tenanttest');
            expect(filterCategory).to.eq('categorytest');
            expect(filterSubject).to.eq('subject1');
            expect(filterFallbackSubjects).to.eq('subject2');
            expect(filterActivationTime).to.eq('activationtime');
            expect(filterCdrStatQueueIds).to.eq('queuetest');
            expect(filterRatingPlanTag).to.eq('ratingplan');
        }
        return { data: [{id: '1', type: 'tp-rating-profile'}] };
      });

      visit('/tariff-plans/1/tp-rating-profiles');
      return andThen(function() {
        fillIn(`#${find("label:contains('Load ID')").attr('for')}`, 'loadtest');
        selectChoose(`#${find("label:contains('Direction')").attr('for')}`, '*in');
        fillIn(`#${find("label:contains('Tenant')").attr('for')}`, 'tenanttest');
        fillIn(`#${find("label:contains('Category')").attr('for')}`, 'categorytest');
        fillIn(`#${find("label:contains('Subject')").attr('for')}`, 'subject1');
        fillIn(`#${find("label:contains('Fallback subjects')").attr('for')}`, 'subject2');
        fillIn(`#${find("label:contains('Activation time')").attr('for')}`, 'activationtime');
        fillIn(`#${find("label:contains('CDR stat queue IDs')").attr('for')}`, 'queuetest');
        fillIn(`#${find("label:contains('Rating plan tag')").attr('for')}`, 'ratingplan');
        click('button.search-button');
        return andThen(() => expect(counter).to.eq(2));
      });
    })
  );

  describe('click column header', () =>
    it('makes a correct sort query', function() {
      let counter = 0;

      server.get('/tp-rating-profiles/', function(schema, request) {
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
        return { data: [{id: '1', type: 'tp-rating-profile'}] };
      });

      visit('/tariff-plans/1/tp-rating-profiles');
      click(".sort-header a:contains('Tenant')");
      click(".sort-header a:contains('Tenant')");
      return andThen(() => expect(counter).to.eq(3));
    })
  );

  return describe('click pagination link', () =>
    it('makes a correct pagination query', function() {
      let counter = 0;

      server.get('/tp-rating-profiles/', function(schema, request) {
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
        return { data: [{id: '1', type: 'tp-rating-profile'}], meta: {total_pages: 2} };
      });

      visit('/tariff-plans/1/tp-rating-profiles');
      click("ul.pagination li a:contains('2')");
      return andThen(() => expect(counter).to.eq(2));
    })
  );
});
