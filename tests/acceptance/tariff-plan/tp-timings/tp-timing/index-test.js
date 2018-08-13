import { describe, it, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import startApp from 'cgrates-web-frontend/tests/helpers/start-app';
import destroyApp from 'cgrates-web-frontend/tests/helpers/destroy-app';
import { authenticateSession } from 'cgrates-web-frontend/tests/helpers/ember-simple-auth';

describe("Acceptance: TpTiming.Index", function() {
  beforeEach(function() {
    this.App = startApp();
    this.tariffPlan = server.create('tariff-plan', {name: 'Test', alias: 'tptest'});
    this.tpTiming = server.create('tp-timing', {tpid: this.tariffPlan.alias, tag: 'new-timing'});
    authenticateSession(this.App, {email: "user@example.com"});
  });

  afterEach(function () {
    destroyApp(this.App);
  });

  describe('basic rendering', () =>
    it('renders specific header', function() {
      visit('/tariff-plans/1/tp-timings');
      click("table tbody tr:first-child td a:contains('new-timing')");
      return andThen(() => expect(find('main h2').text()).to.eq('Timing: new-timing'));
    })
  );

  return describe('click edit button', () =>
    it('redirects to tp-timing edit page', function() {
      visit('/tariff-plans/1/tp-timings');
      click("table tbody tr:first-child td a:contains('new-timing')");
      click('.fixed-action-btn a');
      return andThen(() => expect(currentPath()).to.equal('tariff-plans.tariff-plan.tp-timings.tp-timing.edit'));
    })
  );
});
