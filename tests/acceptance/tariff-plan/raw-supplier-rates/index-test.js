import { describe, it, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import startApp from 'cgrates-web-frontend/tests/helpers/start-app';
import destroyApp from 'cgrates-web-frontend/tests/helpers/destroy-app';
import { authenticateSession } from 'cgrates-web-frontend/tests/helpers/ember-simple-auth'

describe('Acceptance | Tariff Plan | Raw Supplier Rates | Index', function() {
  let application;

  beforeEach(function() {
    application = startApp();
    server.createList('raw-supplier-rate', 3)
    server.create('tariff-plan', { name: 'Test', alias: 'tptest' })
    authenticateSession(application, { email: 'user@example.com' })
  });

  afterEach(function() {
    destroyApp(application);
  });

  describe('visit /tariff-plans/:id/raw-supplier-rates', function () {
    beforeEach(function () {
      visit('/tariff-plans/1/raw-supplier-rates')
    })
    it('renders table with rates', function () {
      andThen(() => {
        expect(find('tbody tr').length).to.eq(3)
      })
    })
  })

  describe('click to upload csv link', function () {
    it('redirects to upload csv page', function () {
      visit('/tariff-plans/1/raw-supplier-rates')
      click('[data-test-menu]')
      click('[data-test-upload]')
      andThen(() => {
        expect(currentURL()).to.eq('/tariff-plans/1/raw-supplier-rates/csv-import')
      })
    })
  })

  describe('click to resolve', function () {
    beforeEach(function () {
      visit('/tariff-plans/1/raw-supplier-rates')
      click('[data-test-menu]')
      click('[data-test-resolve]')
    });

    it('creates resolve job on the serve', function () {
      andThen(() => {
        expect(server.db.rawSupplierResolveJobs.length).to.eq(1)
      })
    });

    it('showns success flash msg', function () {
      andThen(() => {
        expect(find('.alert-success')).to.exist
      })
    });
  })

  describe('delete rate', function() {
    beforeEach(function () {
      visit('/tariff-plans/1/raw-supplier-rates')
      click('[data-test-delete-rate=1]')
    })
    it('removes rate from table', function () {
      expect(find('tbody tr').length).to.eq(2)
    })
    it('removes from DB', function () {      
      andThen(() => {
        expect(server.db.rawSupplierRates.length).to.eq(2)
      })
    })
  })
});
