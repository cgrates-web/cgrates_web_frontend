import { describe, it, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import startApp from 'cgrates-web-frontend/tests/helpers/start-app';
import destroyApp from 'cgrates-web-frontend/tests/helpers/destroy-app';
import { authenticateSession } from 'cgrates-web-frontend/tests/helpers/ember-simple-auth';

describe("Acceptance: TpRate.Index", function() {
  beforeEach(function() {
    this.App = startApp();
    this.tariffPlan = server.create('tariff-plan', {name: 'Test', alias: 'tptest'});
    this.tpRate = server.create('tp-rate', {tpid: this.tariffPlan.alias, tag: 'tagtest'});
    authenticateSession(this.App, {email: "user@example.com"});
  });

  afterEach(function () {
    destroyApp(this.App);
  });

  describe('basic rendering', () =>
    it('renders specific header', function() {
      visit('/tariff-plans/1/tp-rates');
      click("table tbody tr:first-child td a:contains('tagtest')");
      return andThen(() => expect(find('main h2').text()).to.eq('TpRate: tagtest'));
    })
  );

  return describe('click edit button', () =>
    it('redirects to tp-rate edit page', function() {
      visit('/tariff-plans/1/tp-rates');
      click("table tbody tr:first-child td a:contains('tagtest')");
      click('.fixed-action-btn a');
      return andThen(() => expect(currentPath()).to.equal('tariff-plans.tariff-plan.tp-rates.tp-rate.edit'));
    })
  );
});
