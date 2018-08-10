import { describe, it, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import startApp from 'cgrates-web-frontend/tests/helpers/start-app';
import destroyApp from 'cgrates-web-frontend/tests/helpers/destroy-app';
import { authenticateSession } from 'cgrates-web-frontend/tests/helpers/ember-simple-auth';

describe("Acceptance: Upload Tariff plane to redis", function() {
  beforeEach(function() {
    this.App = startApp();
    this.tariffPlan = server.create('tariff-plan', {name: 'Test', alias: 'tptest'});
    authenticateSession(this.App, {email: "user@exmple.com"});
  });

  afterEach(function () {
    destroyApp(this.App);
  });

  return describe('go to load tariff-plan page and fill in form', function() {
    it("sends correct request to the server", function() {
      server.post('/load-tariff-plan/', (schema, request) => {
        const params = JSON.parse(request.requestBody);

        expect(params.data.attributes.tpid).to.eq(this.tariffPlan.alias);
        expect(params.data.attributes["flush-db"]).to.eq(true);
        expect(params.data.attributes["dry-run"]).to.eq(false);
        expect(params.data.attributes.validate).to.eq(false);

        return {result: 'OK'};
    });

      visit('/tariff-plans');
      click(".row .card:first-child .card-action a:contains('Select')");
      click("ul#slide-out li a:contains('Upload to redis')");

      click("label:contains('Flush DB')");
      return click('button[type="submit"]');
    });
    return describe('backend sends success', function() {
      it('renders suceess message', function() {
        server.post('/load-tariff-plan/', () => ({result: 'OK'}));

        visit('/tariff-plans');
        click(".row .card:first-child .card-action a:contains('Select')");
        click("ul#slide-out li a:contains('Upload to redis')");
        click('button[type="submit"]');

        return andThen(() => expect(find('.alert.alert-success').text()).to.eq("Success!\xa0Tariff plan has been uploaded to CGrates"));
      });


      return describe('backend sends success', () =>
        it("renders danger message and error's text", function() {
          server.post('/load-tariff-plan/', () => ({error: 'Some error from cgrates'}));

          visit('/tariff-plans');
          click(".row .card:first-child .card-action a:contains('Select')");
          click("ul#slide-out li a:contains('Upload to redis')");
          click('button[type="submit"]');

          return andThen(() => expect(find('.alert.alert-danger').text()).to.eq("Error!\xa0Some error from cgrates"));
        })
      );
    });
  });
});
