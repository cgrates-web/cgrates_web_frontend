import { beforeEach, describe, it } from 'mocha';
import { expect } from 'chai';
import { setupApplicationTest } from 'ember-mocha';
import { authenticateSession } from 'ember-simple-auth/test-support';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { visit, click, findAll, find, currentURL } from '@ember/test-helpers';

describe('Acceptance | Tariff Plan | Raw Supplier Rates | Index', function() {
  let hooks = setupApplicationTest();
  setupMirage(hooks);

  beforeEach(async function() {
    server.createList('raw-supplier-rate', 3);
    server.create('tariff-plan', { id: '1', name: 'Test', alias: 'tptest' });
    await authenticateSession({ email: 'user@example.com' });
  });

  describe('visit /tariff-plans/:id/raw-supplier-rates', function () {
    beforeEach(async function() {
      await visit('/tariff-plans/1/raw-supplier-rates');
    });
    it('renders table with rates', function () {
      expect(findAll('[data-test-rate]').length).to.eq(3);
    });
  });

  describe('click to upload csv link', function () {
    it('redirects to upload csv page', async function() {
      await visit('/tariff-plans/1/raw-supplier-rates');
      await click('[data-test-upload]');
      expect(currentURL()).to.eq('/tariff-plans/1/raw-supplier-rates/csv-import');
    })
  });

  describe('click to resolve', function () {
    beforeEach(async function() {
      await visit('/tariff-plans/1/raw-supplier-rates');
      await click('[data-test-resolve]');
    });

    it('creates resolve job on the serve', function () {
      expect(server.db.rawSupplierResolveJobs.length).to.eq(1);
    });

    it('shows success flash msg', function () {
      expect(find('.flash-message.alert-success')).to.exist;
    });
  });

  describe('delete rate', function() {
    beforeEach(async function() {
      await visit('/tariff-plans/1/raw-supplier-rates');
      await click('table tr:first-child [data-test-delete-rate]');
    });
    it('removes rate from table', function () {
      expect(findAll('[data-test-rate]').length).to.eq(2);
    });
    it('removes from DB', function () {
      expect(server.db.rawSupplierRates.length).to.eq(2);
    });
  });

  describe('filter and delete all', function () {
    let expectRequestToBeCorrect = () => expect(false).to.eq(true);
    beforeEach(async function() {
      server.post('/raw-supplier-rates/delete-all', function (_schema, request) {
        expectRequestToBeCorrect = () => {
          const params = JSON.parse(request.requestBody);
          expect(params.filter.prefix).to.eq('1');
          expect(Object.keys(params.filter).length).to.eq(1);
          expect(params.tpid).to.eq('1');
        };
        return { raw_supplier_rates: { id: '0' } };
      });
      await visit('/tariff-plans/1/raw-supplier-rates?prefix=1');
      await click('[data-test-delete-all]')
    });

    it('sends request to the server with filters', function () {
      expectRequestToBeCorrect();
    });

    it('shows flash messages', function () {
      expect(find('.flash-message.alert-success')).to.exist;
    });
  })
});
