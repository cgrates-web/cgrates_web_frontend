import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';
import { setupApplicationTest } from 'ember-mocha';
import { authenticateSession } from 'ember-simple-auth/test-support';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { visit, click, find, findAll, currentRouteName, fillIn, currentURL } from '@ember/test-helpers';
import { isBlank } from '@ember/utils';
import { selectChoose } from 'ember-power-select/test-support/helpers';

describe('Acceptance: TpAttributes.Index', function () {
  let hooks = setupApplicationTest();
  setupMirage(hooks);

  beforeEach(async function () {
    this.tariffPlan = server.create('tariff-plan', { id: '1', name: 'Test', alias: 'tptest' });
    this.tpDestinations = server.createList('tp-attribute', 2, { tpid: this.tariffPlan.alias });
    this.other = server.createList('tp-attributes', 2, {tpid: 'other'});
    await authenticateSession({email: 'user@example.com'});
  });

  describe('visit /tariff-plans/1/tp-attributes', () =>
    it('renders table with tp-attributes', async function () {
      await visit('/tariff-plans/1/tp-attributes');
      expect(find('main h2').textContent).to.eq('TpAttributes list');
      expect(findAll('table tbody tr').length).to.eq(2);
    })
  );

  describe('server response with meta: total_records', function () {
    it('displays total records', async function () {
      server.get('/tp-attributes', function () {
        return { data: [], meta: { total_records: 55 } };
      });
      await visit('/tariff-plans/1/tp-attributes');
      expect(find('.tp-total-records').textContent.trim()).to.eq('Total: 55');
    });
  });

  describe('select tp-attribute', () =>
    it('reditects to tp-attributes page', async function () {
      await visit('/tariff-plans/1/tp-attributes');
      await click('table tbody tr:first-child td:first-child a');
      expect(currentRouteName()).to.equal('tariff-plan.tp-attributes.tp-attribute.index');
    })
  );

  describe('click edit button', () =>
    it('reditects to edit tp-attributes page', async function () {
      await visit('/tariff-plans/1/tp-attributes');
      await click('[data-test-attribute-edit]');
      expect(currentRouteName()).to.equal('tariff-plan.tp-attributes.tp-attribute.edit');
    })
  );

  describe('click remove button', () =>
    it('removes tp-attributes', async function () {
      await visit('/tariff-plans/1/tp-attributes');
      await click('[data-test-attribute-remove]');
      expect(findAll('table tbody tr').length).to.eq(1);
    })
  );

  describe('click add button', () =>
    it('redirects to new tp-attributes page', async function () {
      await visit('/tariff-plans/1/tp-attributes');
      await click('[data-test-add]');
      expect(currentRouteName()).to.equal('tariff-plan.tp-attributes.new');
    })
  );

  const setFilters = async () => {
    await fillIn('[data-test-filter-tenant] input', 'tenant_test');
    await fillIn('[data-test-filter-customid] input', 'custom_id_test');
    await fillIn('[data-test-filter-contexts] input', 'contexts');
    await fillIn('[data-test-filter-filter-ids] input', 'filter_ids');
    await fillIn('[data-test-filter-activation-interval] input', 'activation_interval');
    await fillIn('[data-test-filter-field-name] input', 'field_name');
    await fillIn('[data-test-filter-initial] input', 'initial');
    await fillIn('[data-test-filter-substitute] input', 'substitute');
    await selectChoose('[data-test-filter-append]', 'true');
    await selectChoose('[data-test-filter-blocker]', 'true');
    await fillIn('[data-test-filter-weight] input', 10);
  };
  const expectFiltersQueryParams = (request) => {
    expect(request.queryParams['tpid']).to.eq('tptest');
    expect(request.queryParams['filter[tenant]']).to.eq('tenant_test');
    expect(request.queryParams['filter[custom_id]']).to.eq('custom_id_test');
    expect(request.queryParams['filter[contexts]']).to.eq('contexts');
    expect(request.queryParams['filter[filter_ids]']).to.eq('filter_ids');
    expect(request.queryParams['filter[activation_interval]']).to.eq('activation_interval');
    expect(request.queryParams['filter[field_name]']).to.eq('field_name');
    expect(request.queryParams['filter[initial]']).to.eq('initial');
    expect(request.queryParams['filter[substitute]']).to.eq('substitute');
    expect(request.queryParams['filter[append]']).to.eq('true');
    expect(request.queryParams['filter[blocker]']).to.eq('true');
    expect(request.queryParams['filter[weight]']).to.eq('10');
  };

  describe('set filters and click search button', () =>
    it('makes a correct filter query', async function () {
      let counter = 0;

      server.get('/tp-attributes', function (schema, request) {
        counter = counter + 1;
        switch (counter) {
          case 1:
            expect(isBlank(request.queryParams['filter[tenant]'])).to.eq(true);
            expect(isBlank(request.queryParams['filter[custom_id]'])).to.eq(true);
            expect(isBlank(request.queryParams['filter[contexts]'])).to.eq(true);
            expect(isBlank(request.queryParams['filter[filter_ids]'])).to.eq(true);
            expect(isBlank(request.queryParams['filter[activation_interval]'])).to.eq(true);
            expect(isBlank(request.queryParams['filter[field_name]'])).to.eq(true);
            expect(isBlank(request.queryParams['filter[initial]'])).to.eq(true);
            expect(isBlank(request.queryParams['filter[substitute]'])).to.eq(true);
            expect(isBlank(request.queryParams['filter[append]'])).to.eq(true);
            expect(isBlank(request.queryParams['filter[blocker]'])).to.eq(true);
            expect(isBlank(request.queryParams['filter[weight]'])).to.eq(true);
            break;
          default:
            expectFiltersQueryParams(request);
        }
        return { data: [{id: '1', type: 'tp-attribute'}] };
      });

      await visit('/tariff-plans/1/tp-attributes');
      await setFilters();
      await click('[data-test-filter-search-btn]');
      expect(counter).to.eq(2);
    })
  );

  describe('set filters and click download csv button', function () {
    it('sends request to the server with filters', async function () {
      let expectRequestToBeCorrect = () => expect(false).to.eq(true);
      server.get('/tp-attributes/export-to-csv/', function (_schema, request) {
        expectRequestToBeCorrect = () => {
          expectFiltersQueryParams(request);
        };
        return { data: [{id: '1', type: 'tp-attribute'}] };
      });
      await visit('/tariff-plans/1/tp-attributes');
      await setFilters();
      await click('[data-test-filter-search-btn]');
      await click('[data-test-download]');
      expectRequestToBeCorrect();
    });
  });

  describe('click to upload csv button', function () {
    it('redirects to upload csv page', async function () {
      await visit('/tariff-plans/1/tp-attributes');
      await click('[data-test-upload]');
      expect(currentURL()).to.eq('/tariff-plans/1/tp-attributes/csv-import');
    });
  });

  describe('set filters and click refresh button', function () {
    it('makes a correct query', async function () {
      let expectRequestToBeCorrect = () => expect(false).to.eq(true);
      server.get('/tp-attributes', function (_schema, request) {
        expectRequestToBeCorrect = () => {
          expectFiltersQueryParams(request);
        };
        return { data: [{id: '1', type: 'tp-attribute'}] };
      });
      await visit('/tariff-plans/1/tp-attributes');
      await setFilters();
      await click('[data-test-filter-search-btn]');
      await click('[data-test-refresh]');
      expectRequestToBeCorrect();
    });
  });

  describe('set filters and click delete all button', function () {
    let expectRequestToBeCorrect = () => expect(false).to.eq(true);
    beforeEach(async function () {
      server.post('/tp-attributes/delete-all', function (_schema, request) {
        expectRequestToBeCorrect = () => {
          const params = JSON.parse(request.requestBody);
          expect(params.tpid).to.eq('tptest');
          expect(params.filter.tenant).to.eq('tenant_test');
          expect(params.filter.custom_id).to.eq('custom_id_test');
          expect(params.filter.contexts).to.eq('contexts');
          expect(params.filter.filter_ids).to.eq('filter_ids');
          expect(params.filter.activation_interval).to.eq('activation_interval');
          expect(params.filter.field_name).to.eq('field_name');
          expect(params.filter.initial).to.eq('initial');
          expect(params.filter.substitute).to.eq('substitute');
          expect(params.filter.append).to.eq('true');
          expect(params.filter.blocker).to.eq('true');
          expect(params.filter.weight).to.eq('10');
        };
        return { tp_attribute: { id: '0' } };
      });
      await visit('/tariff-plans/1/tp-attributes');
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

      server.get('/tp-attributes', function (schema, request) {
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
        return { data: [{id: '1', type: 'tp-attributes'}] };
      });

      await visit('/tariff-plans/1/tp-attributes');
      await click('[data-test-sort-tenant] a');
      await click('[data-test-sort-tenant] a');
      expect(counter).to.eq(3);
    })
  );

  describe('click pagination link', () =>
    it('makes a correct pagination query', async function () {
      let counter = 0;

      server.get('/tp-attributes', function (schema, request) {
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
        return { data: [{id: '1', type: 'tp-attribute'}], meta: {total_pages: 2} };
      });

      await visit('/tariff-plans/1/tp-attributes');
      await click('[data-test-pagination-forward]');
      expect(counter).to.eq(2);
    })
  );
});
