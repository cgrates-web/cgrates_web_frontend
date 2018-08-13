import { describe, it, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import startApp from 'cgrates-web-frontend/tests/helpers/start-app';
import destroyApp from 'cgrates-web-frontend/tests/helpers/destroy-app';
import { authenticateSession } from 'cgrates-web-frontend/tests/helpers/ember-simple-auth';

describe("Acceptance: TpRates.New", function() {
  beforeEach(function() {
    this.App = startApp();
    this.tariffPlan = server.create('tariff-plan', {name: 'Test', alias: 'tptest'});
    authenticateSession(this.App, {email: "user@example.com"});
  });

  afterEach(function () {
    destroyApp(this.App);
  });

  describe('visit /tariff-plans/1/tp-rates/new', () =>
    it('renders tp-rate form', function() {
      visit('/tariff-plans/1/tp-rates/new');
      return andThen(() => expect(find('form input').length).to.eq(6));
    })
  );

  describe('go away without save', () =>
    it('removes not saved tp-rate', function() {
      visit('/tariff-plans/1/tp-rates');
      click('.fixed-action-btn a');
      click("ul#slide-out li a:contains('Rates') ");
      return andThen(() => expect(find('table tbody tr').length).to.eq(0));
    })
  );

  describe('fill form with incorrect data and submit', () =>
    it('does not submit data', function() {
      visit('/tariff-plans/1/tp-rates/new');
      return andThen(function() {
        fillIn(`#${find("label:contains('Tag')").attr('for')}`, '');
        fillIn(`#${find("label:contains('Rate unit (seconds)')").attr('for')}`, '');
        fillIn(`#${find("label:contains('Rate increment (seconds)')").attr('for')}`, '');
        fillIn(`#${find("label:contains('Rate (decimal)')").attr('for')}`, '');
        fillIn(`#${find("label:contains('Group interval start (seconds)')").attr('for')}`, '');
        fillIn(`#${find("label:contains('Connect fee (decimal)')").attr('for')}`, '');
        click('button[type="submit"]');
        return andThen(function() {
          expect(find(`#${find("label:contains('Tag')").attr('for')}`).length).to.eq(1);
          expect(find(`#${find("label:contains('Rate unit (seconds)')").attr('for')}`).length).to.eq(1);
          expect(find(`#${find("label:contains('Rate increment (seconds)')").attr('for')}`).length).to.eq(1);
          expect(find(`#${find("label:contains('Rate (decimal)')").attr('for')}`).length).to.eq(1);
          expect(find(`#${find("label:contains('Group interval start (seconds)')").attr('for')}`).length).to.eq(1);
          return expect(find(`#${find("label:contains('Connect fee (decimal)')").attr('for')}`).length).to.eq(1);
        });
      });
    })
  );

  return describe('fill form with correct data and submit', () =>
    it('saves new tp-rate with correct data', function() {
      let counter = 0;

      server.post('/tp-rates/', function(schema, request) {
        counter = counter + 1;
        const params = JSON.parse(request.requestBody);
        expect(params.data.attributes['tpid']).to.eq('tptest');
        expect(params.data.attributes['tag']).to.eq('tagtest');
        expect(params.data.attributes['rate-unit']).to.eq('60s');
        expect(params.data.attributes['rate-increment']).to.eq('60s');
        expect(params.data.attributes['rate']).to.eq(0.01);
        expect(params.data.attributes['group-interval-start']).to.eq('60s');
        expect(params.data.attributes['connect-fee']).to.eq(0.01);
        return { data: {id: '1', type: 'tp-rate'} };
      });

      visit('/tariff-plans/1/tp-rates/new');
      return andThen(function() {
        fillIn(`#${find("label:contains('Tag')").attr('for')}`, 'tagtest');
        fillIn(`#${find("label:contains('Rate unit (seconds)')").attr('for')}`, '60');
        fillIn(`#${find("label:contains('Rate increment (seconds)')").attr('for')}`, '60');
        fillIn(`#${find("label:contains('Rate (decimal)')").attr('for')}`, '0.01');
        fillIn(`#${find("label:contains('Group interval start (seconds)')").attr('for')}`, '60');
        fillIn(`#${find("label:contains('Connect fee (decimal)')").attr('for')}`, '0.01');
        click('button[type="submit"]');
        return andThen(() => expect(counter).to.eq(1));
      });
    })
  );
});
