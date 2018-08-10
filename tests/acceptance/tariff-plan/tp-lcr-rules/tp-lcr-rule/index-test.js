import { describe, it, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import startApp from 'cgrates-web-frontend/tests/helpers/start-app';
import destroyApp from 'cgrates-web-frontend/tests/helpers/destroy-app';
import { authenticateSession } from 'cgrates-web-frontend/tests/helpers/ember-simple-auth';

describe("Acceptance: TpLcrRule.Index", function() {
  beforeEach(function() {
    this.App = startApp();
    this.tariffPlan = server.create('tariff-plan', {name: 'Test', alias: 'tptest'});
    this.tpLcrRule = server.create('tp-lcr-rule', {tpid: this.tariffPlan.alias, id: 'test'});
    authenticateSession(this.App, {email: "user@example.com"});
  });

  afterEach(function () {
    destroyApp(this.App);
  });

  describe('basic rendering', () =>
    it('renders specific header', function() {
      visit('/tariff-plans/1/tp-lcr-rules');
      click("table tbody tr:first-child td a:contains('test')");
      return andThen(() => expect(find('main h2').text()).to.eq('TpLcrRule: test'));
    })
  );

  return describe('click edit button', () =>
    it('redirects to tp-lcr-rule edit page', function() {
      visit('/tariff-plans/1/tp-lcr-rules');
      click("table tbody tr:first-child td a:contains('test')");
      click('.fixed-action-btn a');
      return andThen(() => expect(currentPath()).to.equal('tariff-plans.tariff-plan.tp-lcr-rules.tp-lcr-rule.edit'));
    })
  );
});
