/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
// jshint expr:true
import { describe, it, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import startApp from 'cgrates-web-frontend/tests/helpers/start-app';
import destroyApp from 'cgrates-web-frontend/tests/helpers/destroy-app';
import { authenticateSession } from 'cgrates-web-frontend/tests/helpers/ember-simple-auth';
import registerPowerSelectHelpers from 'cgrates-web-frontend/tests/helpers/ember-power-select';

registerPowerSelectHelpers();

describe("Acceptance: TpRatingPlan.Edit", function() {
  beforeEach(function() {
    this.App = startApp();
    this.tariffPlan = server.create('tariff-plan', {name: 'Test', alias: 'tptest'});
    this.tpDestinationRate1 = server.create('tp-destination-rate', {tpid: 'tptest', tag: 'destratetest1'});
    this.tpDestinationRate2 = server.create('tp-destination-rate', {tpid: 'tptest', tag: 'destratetest2'});
    this.tpTiming1 = server.create('tp-timing', {tpid: 'tptest', tag: 'timingtest1'});
    this.tpTiming2 = server.create('tp-timing', {tpid: 'tptest', tag: 'timingtest2'});
    this.tpRatingPlan = server.create('tp-rating-plan', {
      tpid: this.tariffPlan.alias,
      destrates_tag: this.tpDestinationRate1.tag,
      timing_tag: this.tpTiming1.tag
    });
    authenticateSession(this.App, {email: "user@example.com"});
  });

  afterEach(function () {
    destroyApp(this.App);
  });

  describe('fill form with incorrect data and submit', () =>
    it('does not submit data', function() {
      visit('/tariff-plans/1/tp-rating-plans');
      click('table tbody tr:first-child a.edit');
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
    it('sends correct data to the backend', function() {
      let counter = 0;

      server.patch('/tp-rating-plans/:id', (schema, request) => {
        counter = counter + 1;
        const params = JSON.parse(request.requestBody);
        expect(params.data.attributes['tpid']).to.eq('tptest');
        expect(params.data.attributes['tag']).to.eq('edited');
        expect(params.data.attributes['destrates-tag']).to.eq('destratetest2');
        expect(params.data.attributes['timing-tag']).to.eq('timingtest2');
        expect(params.data.attributes['weight']).to.eq(12.1);
        return { data: {id: this.tpRatingPlan.id, type: 'tp-rating-plan'} };
      });

      visit('/tariff-plans/1/tp-rating-plans');
      click('table tbody tr:first-child a.edit');
      return andThen(function() {
        fillIn(`#${find("label:contains('Tag')").attr('for')}`, 'edited');
        selectSearch(`#${find("label:contains('Destination rates tag')").attr('for')}`, 'destratetest');
        return andThen(function() {
          selectChoose(`#${find("label:contains('Destination rates tag')").attr('for')}`, 'destratetest2');
          selectSearch(`#${find("label:contains('Timing tag')").attr('for')}`, 'timingtest');
          return andThen(function() {
            selectChoose(`#${find("label:contains('Timing tag')").attr('for')}`, 'timingtest2');
            fillIn(`#${find("label:contains('Weight (decimal)')").attr('for')}`, '12.1');
            click('button[type="submit"]');
            return andThen(() => expect(counter).to.eq(1));
          });
        });
      });
    })
  );
});
