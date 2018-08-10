import { describe, it, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import startApp from 'cgrates-web-frontend/tests/helpers/start-app';
import destroyApp from 'cgrates-web-frontend/tests/helpers/destroy-app';
import { authenticateSession } from '../helpers/ember-simple-auth';

describe("Acceptance: TariffPlans", function() {
  beforeEach(function() {
    this.App = startApp();
    this.tps = server.createList('tariff-plan', 5);
    authenticateSession(this.App, {email: "user@exmple.com"});
  });

  afterEach(function () {
    destroyApp(this.App);
  });

  describe('visit /tariff-plans', () =>
    it('renders list of tariff-plans cards', function() {
      visit('/tariff-plans');
      return andThen(() => {
        expect(find('.row .card').length).to.eq(5);
        return expect(find('.row .card .card-title').text()).to.eq(this.tps.map(tp => tp.name).join(''));
      });
    })
  );

  describe('select tariff plan', () =>
    it('reditects to tariff plan page', function() {
      visit('/tariff-plans');
      click(".row .card:first-child .card-action a:contains('Select')");
      return andThen(() => expect(currentPath()).to.equal("tariff-plans.tariff-plan.index"));
    })
  );

  describe('go to edit tariff plan page', () =>
    it('reditects to tariff plan page', function() {
      visit('/tariff-plans');
      click(".row .card:first-child .card-action a:contains('Edit')");
      return andThen(() => expect(currentPath()).to.equal('tariff-plans.tariff-plan.edit'));
    })
  );

  return describe('click to add button', () =>
    it('redirects to tariff-plans/new page', function() {
      visit('/tariff-plans');
      click('.fixed-action-btn a');
      return andThen(() => expect(currentPath()).to.equal('tariff-plans.new'));
    })
  );
});
