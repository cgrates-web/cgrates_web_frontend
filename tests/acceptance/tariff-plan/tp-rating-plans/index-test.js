import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';
import { setupApplicationTest } from 'ember-mocha';
import { authenticateSession } from 'ember-simple-auth/test-support';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { visit, click, find, findAll, currentRouteName, fillIn } from '@ember/test-helpers';
import { isBlank } from '@ember/utils';

describe('Acceptance: TpRatingPlans.Index', function () {
  let hooks = setupApplicationTest();
  setupMirage(hooks);

  beforeEach(async function () {
    this.tariffPlan = server.create('tariff-plan', {id: '1', name: 'Test', alias: 'tptest'});
    this.tpRatingPlans = server.createList('tp-rating-plan', 2, {tpid: this.tariffPlan.alias});
    this.other = server.createList('tp-rating-plan', 2, {tpid: 'other'});
    await authenticateSession({email: 'user@example.com'});
  });

  describe('visit /tariff-plans/1/tp-rating-plans', () =>
    it('renders table with tp-rating-plans', async function () {
      await visit('/tariff-plans/1/tp-rating-plans');
      expect(find('main h2').textContent).to.eq('TpRatingPlans list');
      expect(findAll('table tbody tr').length).to.eq(2);
    })
  );

  describe('select tp-rating-plan', () =>
    it('reditects to tp-rating-plan page', async function () {
      await visit('/tariff-plans/1/tp-rating-plans');
      await click('table tbody tr:first-child td:first-child a');
      expect(currentRouteName()).to.equal('tariff-plan.tp-rating-plans.tp-rating-plan.index');
    })
  );

  describe('click edit button', () =>
    it('reditects to edit tp-rating-plan page', async function () {
      await visit('/tariff-plans/1/tp-rating-plans');
      await click('[data-test-tp-rating-plan-edit]');
      expect(currentRouteName()).to.equal('tariff-plan.tp-rating-plans.tp-rating-plan.edit');
    })
  );

  describe('click remove button', () =>
    it('removes tp-rating-plan', async function () {
      await visit('/tariff-plans/1/tp-rating-plans');
      await click('[data-test-tp-rating-plan-remove]');
      expect(findAll('table tbody tr').length).to.eq(1);
    })
  );

  describe('click add button', () =>
    it('redirects to new tp-rating-plan page', async function () {
      await visit('/tariff-plans/1/tp-rating-plans');
      await click('[data-test-tp-rating-plan-add]');
      expect(currentRouteName()).to.equal('tariff-plan.tp-rating-plans.new');
    })
  );

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
            expect(filterTag).to.eq('tagtest');
            expect(filterDestratesTag).to.eq('destratetest');
            expect(filterTimingTag).to.eq('timingtest');
            expect(filterWeight).to.eq('12.1');
        }
        return { data: [{id: '1', type: 'tp-rating-plan'}] };
      });

      await visit('/tariff-plans/1/tp-rating-plans');
      await fillIn('[data-test-filter-tag] input', 'tagtest');
      await fillIn('[data-test-filter-destrates-tag] input', 'destratetest');
      await fillIn('[data-test-filter-timing-tag] input', 'timingtest');
      await fillIn('[data-test-filter-weight] input', '12.1');
      await click('[data-test-filter-search-btn]');
      expect(counter).to.eq(2);
    })
  );

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
        return { data: [{id: '1', type: 'tp-rating-plan'}] };
      });

      await visit('/tariff-plans/1/tp-rating-plans');
      await click('[data-test-sort-tag] a');
      await click('[data-test-sort-tag] a');
      expect(counter).to.eq(3);
    })
  );

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
        return { data: [{id: '1', type: 'tp-rating-plan'}], meta: {total_pages: 2} };
      });

      await visit('/tariff-plans/1/tp-rating-plans');
      await click('[data-test-pagination-forward]');
      expect(counter).to.eq(2);
    })
  );
});
