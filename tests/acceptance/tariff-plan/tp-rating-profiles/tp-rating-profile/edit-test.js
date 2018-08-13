import { describe, it, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import startApp from 'cgrates-web-frontend/tests/helpers/start-app';
import destroyApp from 'cgrates-web-frontend/tests/helpers/destroy-app';
import { authenticateSession } from 'cgrates-web-frontend/tests/helpers/ember-simple-auth';
import registerPowerSelectHelpers from 'cgrates-web-frontend/tests/helpers/ember-power-select';

registerPowerSelectHelpers();

describe("Acceptance: TpRatingProfile.Edit", function() {
  beforeEach(function() {
    this.App = startApp();
    this.tariffPlan = server.create('tariff-plan', {name: 'Test', alias: 'tptest'});
    this.tpRatingPlan1 = server.create('tp-rating-plan', {tpid: 'tptest', tag: 'ratingplan1'});
    this.tpRatingPlan2 = server.create('tp-rating-plan', {tpid: 'tptest', tag: 'ratingplan2'});
    this.tpRatingProfile = server.create('tp-rating-profile', {
      tpid: this.tariffPlan.alias,
      rating_plan_tag: this.tpRatingPlan1.tag
    });
    authenticateSession(this.App, {email: "user@example.com"});
  });

  afterEach(function () {
    destroyApp(this.App);
  });

  describe('fill form with incorrect data and submit', () =>
    it('does not submit data', function() {
      visit('/tariff-plans/1/tp-rating-profiles');
      click('table tbody tr:first-child a.edit');
      return andThen(function() {
        fillIn(`#${find("label:contains('Load ID')").attr('for')}`, '');
        fillIn(`#${find("label:contains('Tenant')").attr('for')}`, '');
        fillIn(`#${find("label:contains('Category')").attr('for')}`, '');
        fillIn(`#${find("label:contains('Subject')").attr('for')}`, '');
        fillIn(`#${find("label:contains('Fallback subjects')").attr('for')}`, '');
        fillIn(`#${find("label:contains('Activation time')").attr('for')}`, '');
        fillIn(`#${find("label:contains('CDR stat queue IDs')").attr('for')}`, '');
        click('button[type="submit"]');
        return andThen(function() {
          expect(find(`#${find("label:contains('Load ID')").attr('for')}`).length).to.eq(1);
          expect(find(`#${find("label:contains('Direction')").attr('for')}`).length).to.eq(1);
          expect(find(`#${find("label:contains('Tenant')").attr('for')}`).length).to.eq(1);
          expect(find(`#${find("label:contains('Category')").attr('for')}`).length).to.eq(1);
          expect(find(`#${find("label:contains('Subject')").attr('for')}`).length).to.eq(1);
          expect(find(`#${find("label:contains('Fallback subjects')").attr('for')}`).length).to.eq(1);
          expect(find(`#${find("label:contains('Activation time')").attr('for')}`).length).to.eq(1);
          expect(find(`#${find("label:contains('CDR stat queue IDs')").attr('for')}`).length).to.eq(1);
          return expect(find(`#${find("label:contains('Rating plan tag')").attr('for')}`).length).to.eq(1);
        });
      });
    })
  );

  return describe('fill form with correct data and submit', () =>
    it('sends correct data to the backend', function() {
      let counter = 0;

      server.patch('/tp-rating-profiles/:id', (schema, request) => {
        counter = counter + 1;
        const params = JSON.parse(request.requestBody);
        expect(params.data.attributes['tpid']).to.eq('tptest');
        expect(params.data.attributes['loadid']).to.eq('loadtest');
        expect(params.data.attributes['direction']).to.eq('*out');
        expect(params.data.attributes['tenant']).to.eq('tenanttest');
        expect(params.data.attributes['category']).to.eq('categorytest');
        expect(params.data.attributes['subject']).to.eq('subject1');
        expect(params.data.attributes['fallback-subjects']).to.eq('subject2');
        expect(params.data.attributes['activation-time']).to.eq('activationtime');
        expect(params.data.attributes['cdr-stat-queue-ids']).to.eq('queuetest');
        expect(params.data.attributes['rating-plan-tag']).to.eq('ratingplan2');
        return { data: {id: this.tpRatingProfile.id, type: 'tp-rating-profile'} };
      });

      visit('/tariff-plans/1/tp-rating-profiles');
      click('table tbody tr:first-child a.edit');
      return andThen(function() {
        fillIn(`#${find("label:contains('Load ID')").attr('for')}`, 'loadtest');
        selectChoose(`#${find("label:contains('Direction')").attr('for')}`, '*out');
        fillIn(`#${find("label:contains('Tenant')").attr('for')}`, 'tenanttest');
        fillIn(`#${find("label:contains('Category')").attr('for')}`, 'categorytest');
        fillIn(`#${find("label:contains('Subject')").attr('for')}`, 'subject1');
        fillIn(`#${find("label:contains('Fallback subjects')").attr('for')}`, 'subject2');
        fillIn(`#${find("label:contains('Activation time')").attr('for')}`, 'activationtime');
        fillIn(`#${find("label:contains('CDR stat queue IDs')").attr('for')}`, 'queuetest');
        selectSearch(`#${find("label:contains('Rating plan tag')").attr('for')}`, 'ratingplan');
        return andThen(function() {
          selectChoose(`#${find("label:contains('Rating plan tag')").attr('for')}`, 'ratingplan2');
          click('button[type="submit"]');
          return andThen(() => expect(counter).to.eq(1));
        });
      });
    })
  );
});
