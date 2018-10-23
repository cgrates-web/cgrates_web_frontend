import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';
import { setupApplicationTest } from 'ember-mocha';
import { authenticateSession } from 'ember-simple-auth/test-support';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { visit, click, find, findAll, currentRouteName, fillIn } from '@ember/test-helpers';
import { isBlank } from '@ember/utils';
import { selectChoose } from 'ember-power-select/test-support/helpers';

describe("Acceptance: TpLcrRules.Index", function() {
  let hooks = setupApplicationTest();
  setupMirage(hooks);

  beforeEach(async function() {
    this.tariffPlan = server.create('tariff-plan', {id: '1', name: 'Test', alias: 'tptest'});
    this.tpLcrRules = server.createList('tp-lcr-rule', 2, {tpid: this.tariffPlan.alias});
    this.other = server.createList('tp-lcr-rule', 2, {tpid: 'other'});
    await authenticateSession({email: "user@example.com"});
  });

  describe('visit /tariff-plans/1/tp-lcr-rules', () =>
    it("renders table with tp-lcr-rules", async  function() {
      await visit('/tariff-plans/1/tp-lcr-rules');
      expect(find('main h2').textContent).to.eq('TpLcrRules list');
      expect(findAll('table tbody tr').length).to.eq(2);
    })
  );

  describe('server responsed with meta: total_records', function () {
    it('displays total records', async function () {
      server.get('/tp-lcr-rules', function () {
        return { data: [], meta: { total_records: 55 } };
      });
      await visit('/tariff-plans/1/tp-lcr-rules');
      expect(find('.tp-total-records').textContent.trim()).to.eq('Total: 55');
    });
  });

  describe('select tp-lcr-rule', () =>
    it('reditects to tp-lcr-rule page', async function() {
      await visit('/tariff-plans/1/tp-lcr-rules');
      await click('table tbody tr:first-child td:first-child a');
      expect(currentRouteName()).to.equal('tariff-plan.tp-lcr-rules.tp-lcr-rule.index');
    })
  );

  describe('click edit button', () =>
    it('reditects to edit tp-lcr-rule page', async function() {
      await visit('/tariff-plans/1/tp-lcr-rules');
      await click('[data-test-tp-lcr-rule-edit]');
      expect(currentRouteName()).to.equal('tariff-plan.tp-lcr-rules.tp-lcr-rule.edit');
    })
  );

  describe('click remove button', () =>
    it('removes tp-lcr-rule', async function() {
      await visit('/tariff-plans/1/tp-lcr-rules');
      await click('[data-test-tp-lcr-rule-remove]');
      expect(findAll('table tbody tr').length).to.eq(1);
    })
  );

  describe('click add button', () =>
    it('redirects to new tp-lcr-rule page', async function() {
      await visit('/tariff-plans/1/tp-lcr-rules');
      await click('[data-test-tp-lcr-rule-add]');
      expect(currentRouteName()).to.equal('tariff-plan.tp-lcr-rules.new');
    })
  );

  describe('set filters and click search button', () =>
    it('makes a correct filter query', async function() {
      let counter = 0;

      server.get('/tp-lcr-rules/', function(schema, request) {
        counter = counter + 1;
        const filterDirection = request.queryParams['filter[direction]'];
        const filterTenant = request.queryParams['filter[tenant]'];
        const filterCategory = request.queryParams['filter[category]'];
        const filterAccount = request.queryParams['filter[account]'];
        const filterSubject = request.queryParams['filter[subject]'];
        const filterDestinationTag = request.queryParams['filter[destination_tag]'];
        const filterRpCategory = request.queryParams['filter[rp_category]'];
        const filterStrategy = request.queryParams['filter[strategy]'];
        switch (counter) {
          case 1:
            expect(isBlank(filterDirection)).to.eq(true);
            expect(isBlank(filterTenant)).to.eq(true);
            expect(isBlank(filterCategory)).to.eq(true);
            expect(isBlank(filterAccount)).to.eq(true);
            expect(isBlank(filterSubject)).to.eq(true);
            expect(isBlank(filterDestinationTag)).to.eq(true);
            expect(isBlank(filterRpCategory)).to.eq(true);
            expect(isBlank(filterStrategy)).to.eq(true);
            break;
          default:
            expect(filterDirection).to.eq('*out');
            expect(filterTenant).to.eq('cgrates');
            expect(filterCategory).to.eq('call');
            expect(filterAccount).to.eq('any');
            expect(filterSubject).to.eq('any');
            expect(filterDestinationTag).to.eq('1001');
            expect(filterRpCategory).to.eq('profile1');
            expect(filterStrategy).to.eq('*static');
        }
        return { data: [{id: '1', type: 'tp-lcr-rule'}] };
      });

      await visit('/tariff-plans/1/tp-lcr-rules');
      await selectChoose('[data-test-filter-direction]', '*out');
      await fillIn('[data-test-filter-tenant] input', 'cgrates');
      await fillIn('[data-test-filter-category] input', 'call');
      await fillIn('[data-test-filter-account] input', 'any');
      await fillIn('[data-test-filter-subject] input', 'any');
      await fillIn('[data-test-filter-destination-tag] input', '1001');
      await fillIn('[data-test-filter-rp-category] input', 'profile1');
      await selectChoose('[data-test-filter-strategy]', '*static');
      await click('[data-test-filter-search-btn]');
      expect(counter).to.eq(2);
    })
  );

  describe('click column header', () =>
    it('makes a correct sort query', async function() {
      let counter = 0;

      server.get('/tp-lcr-rules/', function(schema, request) {
        counter = counter + 1;
        const sort = request.queryParams['sort'];
        switch (counter) {
          case 1:
            expect(sort).to.eq('id');
            break;
          case 2:
            expect(sort).to.eq('destination_tag');
            break;
          default:
            expect(sort).to.eq('-destination_tag');
        }
        return { data: [{id: '1', type: 'tp-lcr-rule'}] };
      });

      await visit('/tariff-plans/1/tp-lcr-rules');
      await click('[data-test-sort-destination-tag] a');
      await click('[data-test-sort-destination-tag] a');
      expect(counter).to.eq(3);
    })
  );

  describe('click pagination link', () =>
    it('makes a correct pagination query', async function() {
      let counter = 0;

      server.get('/tp-lcr-rules/', function(schema, request) {
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
        return { data: [{id: '1', type: 'tp-lcr-rule'}], meta: {total_pages: 2} };
      });

      await visit('/tariff-plans/1/tp-lcr-rules');
      await click('[data-test-pagination-forward]');
      expect(counter).to.eq(2);
    })
  );
});
