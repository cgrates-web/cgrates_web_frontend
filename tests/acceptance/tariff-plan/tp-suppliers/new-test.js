import { describe, it, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import startApp from 'cgrates-web-frontend/tests/helpers/start-app';
import destroyApp from 'cgrates-web-frontend/tests/helpers/destroy-app';
import { authenticateSession } from 'cgrates-web-frontend/tests/helpers/ember-simple-auth';

describe("Acceptance: TpSuppliers.New", function() {
  beforeEach(function() {
    this.App = startApp();
    this.tariffPlan = server.create('tariff-plan', {name: 'Test', alias: 'tptest'});
    authenticateSession(this.App, {email: "user@example.com"});
  });

  afterEach(function () {
    destroyApp(this.App);
  });

  describe('visit /tariff-plans/1/tp-suppliers/new', () =>
    it('renders tp-supplier form', function() {
      visit('/tariff-plans/1/tp-suppliers/new');
      return andThen(() => expect(find('form input').length).to.eq(17));
    })
  );

  describe('go away without save', () =>
    it('removes not saved tp-supplier', function() {
      visit('/tariff-plans/1/tp-suppliers');
      click('.fixed-action-btn a');
      click("ul#slide-out li a:contains('Rates') ");
      return andThen(() => expect(find('table tbody tr').length).to.eq(0));
    })
  );

  describe('fill form with incorrect data and submit', () =>
    it('does not submit data', function() {
      visit('/tariff-plans/1/tp-suppliers/new');
      return andThen(function() {
        fillIn(`#${find("label:contains('Tenant')").attr('for')}`, '');
        fillIn(`#${find("label:contains('ID')").attr('for')}`, '');
        fillIn(`#${find("label:contains('Filter IDs')").attr('for')}`, '');
        fillIn(`#${find("label:contains('Activation interval')").attr('for')}`, '');
        click('button[type="submit"]');
        return andThen(() => expect(server.db.tpSuppliers.length).to.eq(0));
      });
    })
  );

  return describe('fill form with correct data and submit', () =>
    it('saves new tp-supplier with correct data', function() {
      visit('/tariff-plans/1/tp-suppliers/new');
      return andThen(function() {
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
        return andThen(() => expect(server.db.tpSuppliers.length).to.eq(1));
      });
    })
  );
});
