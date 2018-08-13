import { describe, it, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import startApp from 'cgrates-web-frontend/tests/helpers/start-app';
import destroyApp from 'cgrates-web-frontend/tests/helpers/destroy-app';
import { authenticateSession } from 'cgrates-web-frontend/tests/helpers/ember-simple-auth';

describe("Acceptance: TpSupplier.Edit", function() {
  beforeEach(function() {
    this.App = startApp();
    this.tariffPlan = server.create('tariff-plan', {name: 'Test', alias: 'tptest'});
    this.tpSupplier = server.create('tp-supplier', {tpid: this.tariffPlan.alias});
    authenticateSession(this.App, {email: "user@example.com"});
  });

  afterEach(function () {
    destroyApp(this.App);
  });

  describe('fill form with incorrect data and submit', () =>
    it('does not submit data', function() {
      let counter = 0;
      server.post('/tp-suppliers/', function() {
        counter = counter + 1;
        return {};
      });
      visit('/tariff-plans/1/tp-suppliers');
      click('table tbody tr:first-child a.edit');
      return andThen(function() {
        fillIn(`#${find("label:contains('Tenant')").attr('for')}`, '');
        fillIn(`#${find("label:contains('ID')").attr('for')}`, '');
        click('button[type="submit"]');
        return andThen(() => expect(counter).to.eq(0));
      });
    })
  );

  return describe('fill form with correct data and submit', () =>
    it('sends correct data to the backend', function() {
      visit('/tariff-plans/1/tp-suppliers');
      click('table tbody tr:first-child a.edit');

      return andThen(() => {
        fillIn(`#${find("label:contains('Tenant')").attr('for')}`, 'Test');
        fillIn(`#${find("label:contains('ID')").attr('for')}`, 'Test');
        fillIn(`#${find("label:contains('Filter IDs')").attr('for')}`, '1,2');
        fillIn(`#${find("label:contains('Sorting')").attr('for')}`, 'ASC');
        fillIn(`#${find("label:contains('Activation interval')").attr('for')}`, 'Test');
        fillIn(`#${find("label:contains('Supplier ID')").attr('for')}`, 'Hansa');
        fillIn(`#${find("label:contains('Supplier Filter IDs')").attr('for')}`, '1');
        fillIn(`#${find("label:contains('Supplier Account IDs')").attr('for')}`, '1');
        fillIn(`#${find("label:contains('Supplier Ratingplan IDs')").attr('for')}`, '1');
        fillIn(`#${find("label:contains('Supplier Resource IDs')").attr('for')}`, '1');
        fillIn(`#${find("label:contains('Supplier Stat IDs')").attr('for')}`, '1');
        fillIn(`#${find("label:contains('Supplier weight')").attr('for')}`, 1);
        fillIn(`#${find("label:contains('Weight')").attr('for')}`, 100);
        click('button[type="submit"]');
        return andThen(() => {
          this.tpSupplier.reload();
          expect(this.tpSupplier.tenant).to.eq('Test');
          expect(this.tpSupplier.customId).to.eq('Test');
          expect(this.tpSupplier.filterIds).to.eq('1,2');
          expect(this.tpSupplier.activationInterval).to.eq('Test');
          expect(this.tpSupplier.supplierId).to.eq('Hansa');
          expect(this.tpSupplier.supplierFilterIds).to.eq('1');
          expect(this.tpSupplier.supplierAccountIds).to.eq('1');
          expect(this.tpSupplier.supplierRatingplanIds).to.eq('1');
          return expect(this.tpSupplier.supplierResourceIds).to.eq('1');
        });
      });
    })
  );
});
