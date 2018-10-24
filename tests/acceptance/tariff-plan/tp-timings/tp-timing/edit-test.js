import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';
import { setupApplicationTest } from 'ember-mocha';
import { authenticateSession } from 'ember-simple-auth/test-support';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { visit, click, fillIn } from '@ember/test-helpers';

describe('Acceptance: TpTiming.Edit', function () {
  let hooks = setupApplicationTest();
  setupMirage(hooks);

  beforeEach(async function () {
    this.tariffPlan = server.create('tariff-plan', {id: '1', name: 'Test', alias: 'tptest'});
    this.tpTiming = server.create('tp-timing', {id: '1', tpid: this.tariffPlan.alias});
    await authenticateSession({email: 'user@example.com'});
  });

  describe('fill form with correct data and submit', () =>
    it('sends correct data to the backend', async function () {
      let counter = 0;

      server.patch('/tp-timings/1/', function (schema, request) {
        counter = counter + 1;
        const params = JSON.parse(request.requestBody);
        expect(params.data.attributes.tpid).to.eq('tptest');
        expect(params.data.attributes.tag).to.eq('tagtest');
        expect(params.data.attributes.years).to.eq('2017');
        expect(params.data.attributes.months).to.eq('june');
        expect(params.data.attributes.time).to.eq('14');
        expect(params.data.attributes['month-days']).to.eq('30');
        expect(params.data.attributes['week-days']).to.eq('14');
        return { data: {id: '1', type: 'tp-timing'} };
      });

      await visit('/tariff-plans/1/tp-timings/1/edit');
      await fillIn('[data-test-tag] input', 'tagtest');
      await fillIn('[data-test-years] input', '2017');
      await fillIn('[data-test-months] input', 'june');
      await fillIn('[data-test-month-days] input', '30');
      await fillIn('[data-test-week-days] input', '14');
      await fillIn('[data-test-time] input', '14');
      await click('[data-test-submit-button]');
      expect(counter).to.eq(1);
    })
  );
});
