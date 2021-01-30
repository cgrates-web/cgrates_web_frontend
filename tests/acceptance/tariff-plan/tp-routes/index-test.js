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
} from '@ember/test-helpers';

describe('Acceptance: TpRoutes.Index', function () {
  let hooks = setupApplicationTest();
  setupMirage(hooks);

  const setFilters = async () => {
    await fillIn('[data-test-filter-custom-id] input', '123');
  };

  beforeEach(async function () {
    this.tariffPlan = server.create('tariff-plan', {
      id: '1',
      name: 'Test',
      alias: 'tptest',
    });
    this.TpRoutes = server.createList('tp-route', 2, {
      tpid: this.tariffPlan.alias,
    });
    this.other = server.createList('tp-route', 2, { tpid: 'other' });
    await authenticateSession({ email: 'user@example.com' });
  });

  describe('visit /tariff-plans/1/tp-routes', () =>
    it('renders table with tp-routes', async function () {
      await visit('/tariff-plans/1/tp-routes');
      expect(find('main h2')).to.have.trimmed.text('Routes list');
      expect(findAll('table tbody tr').length).to.eq(2);
    }));

  describe('server responsed with meta: total_records', function () {
    it('displays total records', async function () {
      server.get('/tp-routes', function () {
        return { data: [], meta: { total_records: 55 } };
      });
      await visit('/tariff-plans/1/tp-routes');
      expect(find('.tp-total-records').textContent.trim()).to.eq('Total: 55');
    });
  });

  describe('select tp-route', () =>
    it('reditects to tp-route page', async function () {
      await visit('/tariff-plans/1/tp-routes');
      await click('table tbody tr td');
      expect(currentRouteName()).to.equal(
        'tariff-plan.tp-routes.tp-route.index'
      );
    }));

  describe('click edit button', () =>
    it('reditects to edit tp-route page', async function () {
      await visit('/tariff-plans/1/tp-routes');
      await click('[data-test-tp-route-edit]');
      expect(currentRouteName()).to.equal(
        'tariff-plan.tp-routes.tp-route.edit'
      );
    }));

  describe('click remove button', () =>
    it('removes tp-route', async function () {
      await visit('/tariff-plans/1/tp-routes');
      await click('[data-test-tp-route-remove]');
      expect(findAll('table tbody tr').length).to.eq(1);
    }));

  describe('click add button', () =>
    it('redirects to new tp-route page', async function () {
      await visit('/tariff-plans/1/tp-routes');
      await click('[data-test-add]');
      expect(currentRouteName()).to.equal('tariff-plan.tp-routes.new');
    }));

  describe('filter and delete all', function () {
    let expectRequestToBeCorrect = () => expect(false).to.eq(true);
    beforeEach(async function () {
      server.post('/tp-routes/delete-all', function (_schema, request) {
        expectRequestToBeCorrect = () => {
          const params = JSON.parse(request.requestBody);
          expect(params.tpid).to.eq('tptest');
          expect(params.filter.custom_id).to.eq('123');
        };
        return { tp_route: { id: '0' } };
      });
      await visit('/tariff-plans/1/tp-routes');
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

      server.get('/tp-routes/', function (schema, request) {
        counter = counter + 1;
        const sort = request.queryParams['sort'];
        switch (counter) {
          case 1:
            expect(sort).to.eq('id');
            break;
          case 2:
            expect(sort).to.eq('custom_id');
            break;
          default:
            expect(sort).to.eq('-custom_id');
        }
        return { data: [{ id: '1', type: 'tp-route' }] };
      });

      await visit('/tariff-plans/1/tp-routes');
      await click('[data-test-sort-custom-id] a');
      await click('[data-test-sort-custom-id] a');
      expect(counter).to.eq(3);
    }));

  return describe('click pagination link', () =>
    it('makes a correct pagination query', async function () {
      let counter = 0;

      server.get('/tp-routes/', function (schema, request) {
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
          data: [{ id: '1', type: 'tp-route' }],
          meta: { total_pages: 2 },
        };
      });

      await visit('/tariff-plans/1/tp-routes');
      await click('[data-test-pagination-forward]');
      expect(counter).to.eq(2);
    }));
});
