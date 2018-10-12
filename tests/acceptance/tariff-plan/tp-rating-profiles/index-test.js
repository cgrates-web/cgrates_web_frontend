import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';
import { setupApplicationTest } from 'ember-mocha';
import { authenticateSession } from 'ember-simple-auth/test-support';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { visit, click, find, findAll, currentRouteName, fillIn } from '@ember/test-helpers';
import { isBlank } from '@ember/utils';
import { selectChoose } from 'ember-power-select/test-support/helpers';

describe("Acceptance: TpRatingProfiles.Index", function() {
  let hooks = setupApplicationTest();
  setupMirage(hooks);

  beforeEach(async function() {
    this.tariffPlan = server.create('tariff-plan', {id: '1', name: 'Test', alias: 'tptest'});
    this.tpRatingProfiles = server.createList('tp-rating-profile', 2, {tpid: this.tariffPlan.alias});
    this.other = server.createList('tp-rating-profile', 2, {tpid: 'other'});
    await authenticateSession({email: "user@example.com"});
  });

  describe('visit /tariff-plans/1/tp-rating-profiles', () =>
    it("renders table with tp-rating-profiles", async function() {
      await visit('/tariff-plans/1/tp-rating-profiles');
      expect(find('main h2').textContent).to.eq('TpRatingProfiles list');
      expect(findAll('table tbody tr').length).to.eq(2);
    })
  );

  describe('select tp-rating-profile', () =>
    it('reditects to tp-rating-profile page', async function() {
      await visit('/tariff-plans/1/tp-rating-profiles');
      await click('table tbody tr:first-child td:first-child a');
      expect(currentRouteName()).to.equal('tariff-plan.tp-rating-profiles.tp-rating-profile.index');
    })
  );

  describe('click edit button', () =>
    it('reditects to edit tp-rating-profile page', async function() {
      await visit('/tariff-plans/1/tp-rating-profiles');
      await click('[data-test-rating-profile-edit]');
      expect(currentRouteName()).to.equal('tariff-plan.tp-rating-profiles.tp-rating-profile.edit');
    })
  );

  describe('click remove button', () =>
    it('removes tp-rating-profile', async function() {
      await visit('/tariff-plans/1/tp-rating-profiles');
      await click('[data-test-rating-profile-remove]');
      expect(findAll('table tbody tr').length).to.eq(1);
    })
  );

  describe('click add button', () =>
    it('redirects to new tp-rating-profile page', async function() {
      await visit('/tariff-plans/1/tp-rating-profiles');
      await click('[data-test-rating-profile-add]');
      expect(currentRouteName()).to.equal('tariff-plan.tp-rating-profiles.new');
    })
  );

  describe('set filters and click search button', () =>
    it('makes a correct filter query', async function() {
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

      await visit('/tariff-plans/1/tp-rating-profiles');
      await fillIn('[data-test-filter-loadid] input', 'loadtest');
      await selectChoose('[data-test-filter-direction]', '*in');
      await fillIn('[data-test-filter-tenant] input', 'tenanttest');
      await fillIn('[data-test-filter-category] input', 'categorytest');
      await fillIn('[data-test-filter-subject] input', 'subject1');
      await fillIn('[data-test-filter-fallback-subjects] input', 'subject2');
      await fillIn('[data-test-filter-activation-time] input', 'activationtime');
      await fillIn('[data-test-filter-cdr-stat-queue-ids] input', 'queuetest');
      await fillIn('[data-test-filter-rating-plan-tags] input', 'ratingplan');
      await click('[data-test-filter-search-btn]');
      expect(counter).to.eq(2);
    })
  );

  describe('click column header', () =>
    it('makes a correct sort query', async function() {
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

      await visit('/tariff-plans/1/tp-rating-profiles');
      await click('[data-test-sort-tenant] a');
      await click('[data-test-sort-tenant] a');
      expect(counter).to.eq(3);
    })
  );

  return describe('click pagination link', () =>
    it('makes a correct pagination query', async function() {
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

      await visit('/tariff-plans/1/tp-rating-profiles');
      await click('[data-test-pagination-forward]');
      expect(counter).to.eq(2);
    })
  );
});
