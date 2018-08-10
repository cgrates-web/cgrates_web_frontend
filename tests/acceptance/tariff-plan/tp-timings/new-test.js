import { describe, it, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import startApp from 'cgrates-web-frontend/tests/helpers/start-app';
import destroyApp from 'cgrates-web-frontend/tests/helpers/destroy-app';
import { authenticateSession } from 'cgrates-web-frontend/tests/helpers/ember-simple-auth';

describe("Acceptance: TpTimings.New", function() {
  beforeEach(function() {
    this.App = startApp();
    this.tariffPlan = server.create('tariff-plan', {name: 'Test', alias: 'tptest'});
    authenticateSession(this.App, {email: "user@example.com"});
  });

  afterEach(function () {
    destroyApp(this.App);
  });

  describe('visit /tariff-plans/:id/tp-timings/new', () =>
    it('renders tp-timing form', function() {
      visit('/tariff-plans/1/tp-timings/new');
      return andThen(() => expect(find('form input').length).to.eq(6));
    })
  );

  describe('go away without save', () =>
    it('removes not saved tp-timing', function() {
      visit('/tariff-plans/1/tp-timings');
      click('.fixed-action-btn a');
      click("ul#slide-out li a:contains('Timings')");
      return andThen(() => expect(find('table tbody tr').length).to.eq(0));
    })
  );

  return describe('fill form with correct data and submit', () =>
    it('saves new tp-timing with correct data', function() {
      let counter = 0;

      server.post('/tp-timings/', function(schema, request) {
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

      visit('/tariff-plans/1/tp-timings/new');
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
