import { describe, it, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import startApp from 'cgrates-web-frontend/tests/helpers/start-app';
import destroyApp from 'cgrates-web-frontend/tests/helpers/destroy-app';
import { authenticateSession } from 'cgrates-web-frontend/tests/helpers/ember-simple-auth';
import registerPowerSelectHelpers from 'cgrates-web-frontend/tests/helpers/ember-power-select';

registerPowerSelectHelpers();

describe("Acceptance: TpActionPlan.Edit", function() {
  beforeEach(function() {
    this.App = startApp();
    this.tariffPlan = server.create('tariff-plan', {name: 'Test', alias: 'tptest'});
    this.tpAction1 = server.create('tp-action', {tpid: this.tariffPlan.alias, tag: 'actiontest1'});
    this.tpAction2 = server.create('tp-action', {tpid: this.tariffPlan.alias, tag: 'actiontest2'});
    this.tpActionPlan = server.create('tp-action-plan', {
      tpid: this.tariffPlan.alias,
      actions_tag: this.tpAction1.tag
    });
    authenticateSession(this.App, {email: "user@example.com"});
  });

  afterEach(function () {
    destroyApp(this.App);
  });

  describe('fill form with incorrect data and submit', () =>
    it('does not submit data', function() {
      visit('/tariff-plans/1/tp-action-plans');
      click('table tbody tr:first-child a.edit');
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
    it('sends correct data to the backend', function() {
      let counter = 0;

      server.patch('/tp-action-plans/:id', (schema, request) => {
        counter = counter + 1;
        const params = JSON.parse(request.requestBody);
        expect(params.data.attributes['tpid']).to.eq('tptest');
        expect(params.data.attributes['tag']).to.eq('edited');
        expect(params.data.attributes['actions-tag']).to.eq('actiontest2');
        expect(params.data.attributes['timing-tag']).to.eq('*asap');
        expect(params.data.attributes['weight']).to.eq(10);
        return { data: {id: this.tpActionPlan.id, type: 'tp-action-plan'} };
      });

      visit('/tariff-plans/1/tp-action-plans');
      click('table tbody tr:first-child a.edit');
      return andThen(function() {
        fillIn(`#${find("label:contains('Tag')").attr('for')}`, 'edited');
        selectSearch(`#${find("label:contains('Actions tag')").attr('for')}`, 'actiontest');
        return andThen(function() {
          selectChoose(`#${find("label:contains('Actions tag')").attr('for')}`, 'actiontest2');
          fillIn(`#${find("label:contains('Timing tag')").attr('for')}`, '*asap');
          fillIn(`#${find("label:contains('Weight')").attr('for')}`, '10');
          click('button[type="submit"]');
          return andThen(() => expect(counter).to.eq(1));
        });
      });
    })
  );
});
