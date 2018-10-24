import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';
import { setupApplicationTest } from 'ember-mocha';
import { authenticateSession } from 'ember-simple-auth/test-support';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { visit, click, find, findAll, currentRouteName, fillIn } from '@ember/test-helpers';
import { isBlank } from '@ember/utils';

describe('Acceptance: TpTimings.Index', function () {
  let hooks = setupApplicationTest();
  setupMirage(hooks);

  beforeEach(async function () {
    this.tariffPlan = server.create('tariff-plan', {id: '1', name: 'Test', alias: 'tptest'});
    this.tpTiming = server.createList('tp-timing', 2, {tpid: this.tariffPlan.alias});
    this.other = server.createList('tp-destination', 2, {tpid: 'other'});
    await authenticateSession({email: 'user@example.com'});
  });

  describe('visit /tariff-plans/1/tp-timings', () =>
    it('renders table with tp-timings', async function () {
      await visit('/tariff-plans/1/tp-timings');
      expect(find('main h2').textContent).to.eq('Timings list');
      expect(findAll('table tbody tr').length).to.eq(2);
    })
  );

  describe('select tp-timings', () =>
    it('reditects to tp-timings page', async function () {
      await visit('/tariff-plans/1/tp-timings');
      await click('table tbody tr:first-child td:first-child a');
      expect(currentRouteName()).to.equal('tariff-plan.tp-timings.tp-timing.index');
    })
  );

  describe('click edit button', () =>
    it('reditects to edit tp-timing page', async function () {
      await visit('/tariff-plans/1/tp-timings');
      await click('[data-test-tp-timing-edit]');
      expect(currentRouteName()).to.equal('tariff-plan.tp-timings.tp-timing.edit');
    })
  );

  describe('click remove button', () =>
    it('removes tp-timing', async function () {
      await visit('/tariff-plans/1/tp-timings');
      await click('[data-test-tp-timing-remove]');
      expect(findAll('table tbody tr').length).to.eq(1);
    })
  );

  describe('click add button', () =>
    it('redirects to new tp-timings page', async function () {
      await visit('/tariff-plans/1/tp-timings');
      await click('[data-test-tp-timing-add]');
      expect(currentRouteName()).to.equal('tariff-plan.tp-timings.new');
    })
  );

  describe('set filters and click search button', () =>
    it('makes a correct filter query', async function () {
      let counter = 0;

      server.get('/tp-timings/', function (schema, request) {
        counter = counter + 1;
        const filterTag = request.queryParams['filter[tag]'];
        switch (counter) {
          case 1:
            expect(isBlank(filterTag)).to.eq(true);
            break;
          default:
            expect(filterTag).to.eq('tagtest');
        }
        return { data: [{id: '1', type: 'tp-timing'}] };
      });

      await visit('/tariff-plans/1/tp-timings');
      await fillIn('[data-test-filter-tag] input', 'tagtest');
      await click('[data-test-filter-search-btn]');
      expect(counter).to.eq(2);
    })
  );

  describe('click column header', () =>
    it('makes a correct sort query', async function () {
      let counter = 0;

      server.get('/tp-timings/', function (schema, request) {
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
        return { data: [{id: '1', type: 'tp-timing'}] };
      });

      await visit('/tariff-plans/1/tp-timings');
      await click('[data-test-sort-tag] a');
      await click('[data-test-sort-tag] a');
      expect(counter).to.eq(3);
    })
  );

  return describe('click pagination link', () =>
    it('makes a correct pagination query', async function () {
      let counter = 0;

      server.get('/tp-timings/', function (schema, request) {
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
        return { data: [{id: '1', type: 'tp-timings'}], meta: {total_pages: 2} };
      });

      await visit('/tariff-plans/1/tp-timings');
      await click('[data-test-pagination-forward]');
      expect(counter).to.eq(2);
    })
  );
});
