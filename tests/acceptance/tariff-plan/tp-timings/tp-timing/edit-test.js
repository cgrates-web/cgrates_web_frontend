import { describe, it, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import startApp from 'cgrates-web-frontend/tests/helpers/start-app';
import destroyApp from 'cgrates-web-frontend/tests/helpers/destroy-app';
import { authenticateSession } from 'cgrates-web-frontend/tests/helpers/ember-simple-auth';

describe("Acceptance: TpTiming.Edit", function() {
  beforeEach(function() {
    this.App = startApp();
    this.tariffPlan = server.create('tariff-plan', {name: 'Test', alias: 'tptest'});
    this.tpTiming = server.create('tp-timing', {tpid: this.tariffPlan.alias});
    authenticateSession(this.App, {email: "user@example.com"});
  });

  afterEach(function () {
    destroyApp(this.App);
  });

  describe('fill form with incorrect data and submit', () =>
    it('does not submit data', function() {
      visit('/tariff-plans/1/tp-timings');
      click('table tbody tr:first-child a.edit');
      return andThen(function() {
        fillIn(`#${find("label:contains('Tag')").attr('for')}`, '');
        click('button[type="submit"]');
        return andThen(() => expect(find(`#${find("label:contains('Tag')").attr('for')}`).length).to.eq(1));
      });
    })
  );

  return describe('fill form with correct data and submit', () =>
    it('sends correct data to the backend', function() {
      let counter = 0;

      server.patch('/tp-timings/1/', function(schema, request) {
        counter = counter + 1;
        const params = JSON.parse(request.requestBody);
        expect(params.data.attributes.tpid).to.eq('tptest');
        expect(params.data.attributes.tag).to.eq('tagtest');
        expect(params.data.attributes.years).to.eq('2017');
        expect(params.data.attributes.months).to.eq('june');
        expect(params.data.attributes.time).to.eq('14');
        expect(params.data.attributes["month-days"]).to.eq('30');
        expect(params.data.attributes["week-days"]).to.eq('14');
        return { data: {id: '1', type: 'tp-timing'} };
      });

      visit('/tariff-plans/1/tp-timings');
      click('table tbody tr:first-child a.edit');
      return andThen(function() {
        fillIn(`#${find("label:contains('Tag')").attr('for')}`, 'tagtest');
        fillIn(`#${find("label:contains('Years')").attr('for')}`, '2017');
        fillIn(`#${find("label:contains('Months')").attr('for')}`, 'june');
        fillIn(`#${find("label:contains('Month Days')").attr('for')}`, '30');
        fillIn(`#${find("label:contains('Week Days')").attr('for')}`, '14');
        fillIn(`#${find("label:contains('Time')").attr('for')}`, '14');
        click('button[type="submit"]');
        return andThen(() => expect(counter).to.eq(1));
      });
    })
  );
});
