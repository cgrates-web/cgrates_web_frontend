import { describe, it, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import startApp from 'cgrates-web-frontend/tests/helpers/start-app';
import destroyApp from 'cgrates-web-frontend/tests/helpers/destroy-app';
import { authenticateSession } from 'cgrates-web-frontend/tests/helpers/ember-simple-auth';
import registerPowerSelectHelpers from 'cgrates-web-frontend/tests/helpers/ember-power-select';

registerPowerSelectHelpers();

describe("Acceptance: TpActionPlans.New", function() {
  beforeEach(function() {
    this.App = startApp();
    this.tariffPlan = server.create('tariff-plan', {name: 'Test', alias: 'tptest'});
    this.tpAction1 = server.create('tp-action', {tpid: this.tariffPlan.alias, tag: 'actiontest1'});
    this.tpAction2 = server.create('tp-action', {tpid: this.tariffPlan.alias, tag: 'actiontest2'});
    authenticateSession(this.App, {email: "user@example.com"});
  });

  afterEach(function () {
    destroyApp(this.App);
  });

  describe('visit /tariff-plans/1/tp-action-plans/new', () =>
    it('renders tp-action-plan form', function() {
      visit('/tariff-plans/1/tp-action-plans/new');
      return andThen(function() {
        expect(find('form input').length).to.eq(3);
        return expect(find('form .ember-power-select-trigger').length).to.eq(1);
      });
    })
  );

  describe('go away without save', () =>
    it('removes not saved tp-action-plan', function() {
      visit('/tariff-plans/1/tp-action-plans');
      click('.fixed-action-btn a');
      click("ul#slide-out li a:contains('ActionPlans')");
      return andThen(() => expect(find('table tbody tr').length).to.eq(0));
    })
  );

  describe('fill form with incorrect data and submit', () =>
    it('does not submit data', function() {
      visit('/tariff-plans/1/tp-action-plans/new');
      return andThen(function() {
        fillIn(`#${find("label:contains('Tag')").attr('for')}`, '');
        fillIn(`#${find("label:contains('Timing tag')").attr('for')}`, '');
        fillIn(`#${find("label:contains('Weight')").attr('for')}`, '');
        click('button[type="submit"]');
        return andThen(function() {
          expect(find(`#${find("label:contains('Tag')").attr('for')}`).length).to.eq(1);
          expect(find(`#${find("label:contains('Actions tag')").attr('for')}`).length).to.eq(1);
          expect(find(`#${find("label:contains('Timing tag')").attr('for')}`).length).to.eq(1);
          return expect(find(`#${find("label:contains('Weight')").attr('for')}`).length).to.eq(1);
        });
      });
    })
  );

  return describe('fill form with correct data and submit', () =>
    it('saves new tp-action-plan with correct data', function() {
      let counter = 0;

      server.post('/tp-action-plans/', function(schema, request) {
        counter = counter + 1;
        const params = JSON.parse(request.requestBody);
        expect(params.data.attributes['tpid']).to.eq('tptest');
        expect(params.data.attributes['tag']).to.eq('tagtest');
        expect(params.data.attributes['actions-tag']).to.eq('actiontest1');
        expect(params.data.attributes['timing-tag']).to.eq('*asap');
        expect(params.data.attributes['weight']).to.eq(10);
        return { data: {id: '1', type: 'tp-action-plan'} };
      });

      visit('/tariff-plans/1/tp-action-plans/new');
      return andThen(function() {
        fillIn(`#${find("label:contains('Tag')").attr('for')}`, 'tagtest');
        selectSearch(`#${find("label:contains('Actions tag')").attr('for')}`, 'actiontest');
        return andThen(function() {
          selectChoose(`#${find("label:contains('Actions tag')").attr('for')}`, 'actiontest1');
          fillIn(`#${find("label:contains('Timing tag')").attr('for')}`, '*asap');
          fillIn(`#${find("label:contains('Weight')").attr('for')}`, '10');
          click('button[type="submit"]');
          return andThen(() => expect(counter).to.eq(1));
        });
      });
    })
  );
});
