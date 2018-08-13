import { describe, it, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import startApp from 'cgrates-web-frontend/tests/helpers/start-app';
import destroyApp from 'cgrates-web-frontend/tests/helpers/destroy-app';
import { authenticateSession } from 'cgrates-web-frontend/tests/helpers/ember-simple-auth';
import registerPowerSelectHelpers from 'cgrates-web-frontend/tests/helpers/ember-power-select';

registerPowerSelectHelpers();

describe("Acceptance: TpRatingPlans.New", function() {
  beforeEach(function() {
    this.App = startApp();
    this.tariffPlan = server.create('tariff-plan', {name: 'Test', alias: 'tptest'});
    this.tpDestinationRate1 = server.create('tp-destination-rate', {tpid: 'tptest', tag: 'destratetest1'});
    this.tpDestinationRate2 = server.create('tp-destination-rate', {tpid: 'tptest', tag: 'destratetest2'});
    this.tpTiming1 = server.create('tp-timing', {tpid: 'tptest', tag: 'timingtest1'});
    this.tpTiming2 = server.create('tp-timing', {tpid: 'tptest', tag: 'timingtest2'});
    authenticateSession(this.App, {email: "user@example.com"});
  });

  afterEach(function () {
    destroyApp(this.App);
  });

  describe('visit /tariff-plans/1/tp-rating-plans/new', () =>
    it('renders tp-rating-plan form', function() {
      visit('/tariff-plans/1/tp-rating-plans/new');
      return andThen(function() {
        expect(find('form input').length).to.eq(2);
        return expect(find('form .ember-power-select-trigger').length).to.eq(2);
      });
    })
  );

  describe('go away without save', () =>
    it('removes not saved tp-rating-plan', function() {
      visit('/tariff-plans/1/tp-rating-plans');
      click('.fixed-action-btn a');
      click("ul#slide-out li a:contains('RatingPlans')");
      return andThen(() => expect(find('table tbody tr').length).to.eq(0));
    })
  );

  describe('fill form with incorrect data and submit', () =>
    it('does not submit data', function() {
      visit('/tariff-plans/1/tp-rating-plans/new');
      return andThen(function() {
        fillIn(`#${find("label:contains('Tag')").attr('for')}`, '');
        fillIn(`#${find("label:contains('Weight (decimal)')").attr('for')}`, '');
        click('button[type="submit"]');
        return andThen(function() {
          expect(find(`#${find("label:contains('Tag')").attr('for')}`).length).to.eq(1);
          expect(find(`#${find("label:contains('Destination rates tag')").attr('for')}`).length).to.eq(1);
          expect(find(`#${find("label:contains('Timing tag')").attr('for')}`).length).to.eq(1);
          return expect(find(`#${find("label:contains('Weight (decimal)')").attr('for')}`).length).to.eq(1);
        });
      });
    })
  );

  return describe('fill form with correct data and submit', () =>
    it('saves new tp-rating-plan with correct data', function() {
      let counter = 0;

      server.post('/tp-rating-plans/', function(schema, request) {
        counter = counter + 1;
        const params = JSON.parse(request.requestBody);
        expect(params.data.attributes['tpid']).to.eq('tptest');
        expect(params.data.attributes['tag']).to.eq('tagtest');
        expect(params.data.attributes['destrates-tag']).to.eq('destratetest1');
        expect(params.data.attributes['timing-tag']).to.eq('timingtest1');
        expect(params.data.attributes['weight']).to.eq(12.1);
        return { data: {id: '1', type: 'tp-rating-plan'} };
      });

      visit('/tariff-plans/1/tp-rating-plans/new');
      return andThen(function() {
        fillIn(`#${find("label:contains('Tag')").attr('for')}`, 'tagtest');
        selectSearch(`#${find("label:contains('Destination rates tag')").attr('for')}`, 'destratetest');
        return andThen(function() {
          selectChoose(`#${find("label:contains('Destination rates tag')").attr('for')}`, 'destratetest1');
          selectSearch(`#${find("label:contains('Timing tag')").attr('for')}`, 'timingtest');
          return andThen(function() {
            selectChoose(`#${find("label:contains('Timing tag')").attr('for')}`, 'timingtest1');
            fillIn(`#${find("label:contains('Weight (decimal)')").attr('for')}`, '12.1');
            click('button[type="submit"]');
            return andThen(() => expect(counter).to.eq(1));
          });
        });
      });
    })
  );
});
