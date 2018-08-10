import { describe, it, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import startApp from 'cgrates-web-frontend/tests/helpers/start-app';
import destroyApp from 'cgrates-web-frontend/tests/helpers/destroy-app';
import { authenticateSession } from 'cgrates-web-frontend/tests/helpers/ember-simple-auth';

describe("Acceptance: TariffPlan.Index", function() {
  beforeEach(function() {
    this.App = startApp();
    this.tp = server.create('tariff-plan', {name: 'New'});
    authenticateSession(this.App, {email: "user@exmple.com"});
  });

  afterEach(function () {
    destroyApp(this.App);
  });

  return it('renders specic header', function() {
    visit('tariff-plans');
    click(".row .card:first-child .card-action a:contains('Select')");
    return andThen(() => expect(find('section.page-header h1').text()).to.eq('Tariff plan: New'));
  });
});
