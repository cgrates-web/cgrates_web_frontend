import { describe, it, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import startApp from 'cgrates-web-frontend/tests/helpers/start-app';
import destroyApp from 'cgrates-web-frontend/tests/helpers/destroy-app';
import { authenticateSession } from 'cgrates-web-frontend/tests/helpers/ember-simple-auth';

describe("Acceptance: TpDestinations.New", function() {
  beforeEach(function() {
    this.App = startApp();
    this.tariffPlan = server.create('tariff-plan', {name: 'Test', alias: 'tptest'});
    authenticateSession(this.App, {email: "user@example.com"});
  });

  afterEach(function () {
    destroyApp(this.App);
  });

  describe('visit /tariff-plans/1/tp-destinations/new', () =>
    it('renders tp-destination form', function() {
      visit('/tariff-plans/1/tp-destinations/new');
      return andThen(() => expect(find('form input').length).to.eq(2));
    })
  );

  describe('go away without save', () =>
    it('removes not saved tp-destination', function() {
      visit('/tariff-plans/1/tp-destinations');
      click('.fixed-action-btn a');
      click("ul#slide-out li a:contains('Destinations')");
      return andThen(() => expect(find('table tbody tr').length).to.eq(0));
    })
  );

  describe('fill form with incorrect data and submit', () =>
    it('does not submit data', function() {
      visit('/tariff-plans/1/tp-destinations/new');
      return andThen(function() {
        fillIn(`#${find("label:contains('Tag')").attr('for')}`, '');
        fillIn(`#${find("label:contains('Prefix')").attr('for')}`, '');
        click('button[type="submit"]');
        return andThen(function() {
          expect(find(`#${find("label:contains('Tag')").attr('for')}`).length).to.eq(1);
          return expect(find(`#${find("label:contains('Prefix')").attr('for')}`).length).to.eq(1);
        });
      });
    })
  );

  return describe('fill form with correct data and submit', () =>
    it('saves new tp-destination with correct data', function() {
      let counter = 0;

      server.post('/tp-destinations/', function(schema, request) {
        counter = counter + 1;
        const params = JSON.parse(request.requestBody);
        expect(params.data.attributes.tpid).to.eq('tptest');
        expect(params.data.attributes.tag).to.eq('tagtest');
        expect(params.data.attributes.prefix).to.eq('+44');
        return { data: {id: '1', type: 'tp-destination'} };
      });

      visit('/tariff-plans/1/tp-destinations/new');
      return andThen(function() {
        fillIn(`#${find("label:contains('Tag')").attr('for')}`, 'tagtest');
        fillIn(`#${find("label:contains('Prefix')").attr('for')}`, '+44');
        click('button[type="submit"]');
        return andThen(() => expect(counter).to.eq(1));
      });
    })
  );
});
