import { describe, it, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import startApp from 'cgrates-web-frontend/tests/helpers/start-app';
import destroyApp from 'cgrates-web-frontend/tests/helpers/destroy-app';
import { authenticateSession } from 'cgrates-web-frontend/tests/helpers/ember-simple-auth';

describe("Acceptance: TariffPlan.Edit", function() {
  beforeEach(function() {
    this.App = startApp();
    this.tp = server.create('tariff-plan');
    authenticateSession(this.App, {email: "user@exmple.com"});
  });

  afterEach(function () {
    destroyApp(this.App);
  });

  describe('fill form with correct data and submit', () =>
    it('sends correct data to the backend', function() {
      let counter = 0;

      server.patch('/tariff-plans/:id', (schema, request) => {
        counter = counter + 1;
        const params = JSON.parse(request.requestBody);
        expect(params.data.attributes.name).to.eq('New Tariff');
        expect(params.data.attributes.alias).to.eq('new_tariff');
        expect(params.data.attributes.description).to.eq('description');
        return { data: {id: this.tp.id, type: 'tariff-plans'} };
      });

      visit('/tariff-plans');
      click(".row .card:first-child .card-action a:contains('Edit')");
      return andThen(function() {
        fillIn(`#${find("label:contains('Name')").attr('for')}`, 'New Tariff');
        fillIn(`#${find("label:contains('Alias')").attr('for')}`, 'new_tariff');
        fillIn(`#${find("label:contains('Description')").attr('for')}`, 'description');
        click('button[type="submit"]');
        return andThen(() => expect(counter).to.eq(1));
      });
    })
  );

  return describe('fill form with incorrect data and submit', () =>
    it('sets invalid class for inputs', function() {
      visit('/tariff-plans');
      click(".row .card:first-child .card-action a:contains('Edit')");
      return andThen(function() {
        fillIn(`#${find("label:contains('Name')").attr('for')}`, '');
        click('button[type="submit"]');
        return expect(find(`#${find("label:contains('Name')").attr('for')}`).length).to.eq(1);
      });
    })
  );
});
