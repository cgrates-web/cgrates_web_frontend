import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';
import { setupApplicationTest } from 'ember-mocha';
import { authenticateSession } from 'ember-simple-auth/test-support';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { isBlank } from '@ember/utils';
import { visit, click, findAll, currentRouteName, fillIn } from '@ember/test-helpers';

describe('Acceptance: TpActionPlans.Index', function () {
  let hooks = setupApplicationTest();
  setupMirage(hooks);

  beforeEach(async function () {
    this.tariffPlan = server.create('tariff-plan', { id: '1', name: 'Test', alias: 'tptest'});
    this.tpActionPlans = server.createList('tp-action-plan', 2, {tpid: this.tariffPlan.alias});
    this.other = server.createList('tp-action-plan', 2, {tpid: 'other'});
    await authenticateSession({email: 'user@example.com'});
  });

  describe('visit /tariff-plans/1/tp-action-plans', () =>
    it('renders table with tp-action-plans', async function () {
      await visit('/tariff-plans/1/tp-action-plans');
      expect(findAll('table tbody tr').length).to.eq(2);
    })
  );

  describe('select tp-action-plan', () =>
    it('reditects to tp-action-plan page', async function () {
      await visit('/tariff-plans/1/tp-action-plans');
      await click('table tbody tr:first-child td:first-child a');
      expect(currentRouteName()).to.equal('tariff-plan.tp-action-plans.tp-action-plan.index');
    })
  );

  describe('click edit button', () =>
    it('reditects to edit tp-action-plan page', async function () {
      await visit('/tariff-plans/1/tp-action-plans');
      await click('[data-test-tp-action-plan-edit]');
      expect(currentRouteName()).to.equal('tariff-plan.tp-action-plans.tp-action-plan.edit');
    })
  );

  describe('click remove button', () =>
    it('removes tp-action-plan', async function () {
      await visit('/tariff-plans/1/tp-action-plans');
      await click('[data-test-tp-action-plan-remove]');
      expect(findAll('table tbody tr').length).to.eq(1);
    })
  );

  describe('click add button', () =>
    it('redirects to new tp-action-plan page', async function () {
      await visit('/tariff-plans/1/tp-action-plans');
      await click('[data-test-tp-action-plan-add]');
      expect(currentRouteName()).to.equal('tariff-plan.tp-action-plans.new');
    })
  );

  describe('set filters and click search button', () =>
    it('makes a correct filter query', async function () {
      let counter = 0;
      server.get('/tp-action-plans/', function (schema, request) {
        counter = counter + 1;
        const filterTag = request.queryParams['filter[tag]'];
        const filterActionsTag = request.queryParams['filter[actions_tag]'];
        const filterTimingTag = request.queryParams['filter[timing_tag]'];
        const filterWeight = request.queryParams['filter[weight]'];
        switch (counter) {
          case 1:
            expect(isBlank(filterTag)).to.eq(true);
            expect(isBlank(filterActionsTag)).to.eq(true);
            expect(isBlank(filterTimingTag)).to.eq(true);
            expect(isBlank(filterWeight)).to.eq(true);
            break;
          default:
            expect(filterTag).to.eq('tagtest');
            expect(filterActionsTag).to.eq('actionstagtest');
            expect(filterTimingTag).to.eq('timingtagtest');
            expect(filterWeight).to.eq('10');
        }
        return { data: [{id: '1', type: 'tp-action-plan'}] };
      });

      await visit('/tariff-plans/1/tp-action-plans');
      await fillIn('[data-test-filter-tag] input', 'tagtest');
      await fillIn('[data-test-filter-actions-tag] input', 'actionstagtest');
      await fillIn('[data-test-filter-timing-tag] input', 'timingtagtest');
      await fillIn('[data-test-filter-weight] input', '10');

      await click('[data-test-filter-search-btn]');
      expect(counter).to.eq(2);
    })
  );

  describe('click column header', () =>
    it('makes a correct sort query', async function () {
      let counter = 0;
      server.get('/tp-action-plans/', function (schema, request) {
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
        return { data: [{id: '1', type: 'tp-action-plan'}] };
      });

      await visit('/tariff-plans/1/tp-action-plans');
      await click('[data-test-sort-tag] a');
      await click('[data-test-sort-tag] a');
      expect(counter).to.eq(3);
    })
  );

  describe('click pagination link', () =>
    it('makes a correct pagination query', async function () {
      let counter = 0;
      server.get('/tp-action-plans/', function (schema, request) {
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
        return { data: [{id: '1', type: 'tp-action-plan'}], meta: {total_pages: 2} };
      });

      await visit('/tariff-plans/1/tp-action-plans');
      await click('[data-test-pagination-forward]');
      expect(counter).to.eq(2);
    })
  );
});
