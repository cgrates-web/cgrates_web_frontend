import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';
import { setupApplicationTest } from 'ember-mocha';
import { authenticateSession } from 'ember-simple-auth/test-support';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { visit, click, fillIn } from '@ember/test-helpers';
import { selectChoose } from 'ember-power-select/test-support/helpers';

describe("Acceptance: TpAction.Edit", function() {
  let hooks = setupApplicationTest();
  setupMirage(hooks);

  beforeEach(async function() {
    this.tariffPlan = server.create('tariff-plan', {id: '1', name: 'Test', alias: 'tptest'});
    this.tpAction = server.create('tp-action', {id: '1', tpid: this.tariffPlan.alias});
    await authenticateSession({email: "user@example.com"});
  });

  describe('fill form with correct data and submit', () =>
    it('sends correct data to the backend', async function() {
      let counter = 0;

      server.patch('/tp-actions/:id', (schema, request) => {
        counter = counter + 1;
        const params = JSON.parse(request.requestBody);
        expect(params.data.attributes['tpid']).to.eq('tptest');
        expect(params.data.attributes['tag']).to.eq('edited');
        expect(params.data.attributes['action']).to.eq('*log');
        expect(params.data.attributes['balance-tag']).to.eq('balancetest');
        expect(params.data.attributes['balance-type']).to.eq('*monetary');
        expect(params.data.attributes['directions']).to.eq('*out');
        expect(params.data.attributes['units']).to.eq('120');
        expect(params.data.attributes['expiry-time']).to.eq('*unlimited');
        expect(params.data.attributes['timing-tags']).to.eq('timingtest');
        expect(params.data.attributes['destination-tags']).to.eq('*any');
        expect(params.data.attributes['rating-subject']).to.eq('subjecttest');
        expect(params.data.attributes['categories']).to.eq('categoriestest');
        expect(params.data.attributes['shared-groups']).to.eq('groupstest');
        expect(params.data.attributes['balance-weight']).to.eq('20');
        expect(params.data.attributes['balance-blocker']).to.eq('false');
        expect(params.data.attributes['balance-disabled']).to.eq('false');
        expect(params.data.attributes['extra-parameters']).to.eq('parameterstest');
        expect(params.data.attributes['filter']).to.eq('filtertest');
        expect(params.data.attributes['weight']).to.eq(10);
        return { data: {id: this.tpAction.id, type: 'tp-action'} };
      });

      await visit('/tariff-plans/1/tp-actions/1/edit');
      await fillIn('[data-test-tag] input', 'edited');
      await selectChoose('[data-test-select="action"]', '*log');
      await fillIn('[data-test-balance-tag] input', 'balancetest');
      await selectChoose('[data-test-select="balance-type"]', '*monetary');
      await selectChoose('[data-test-select="directions"]', '*out');
      await fillIn('[data-test-units] input', '120');
      await fillIn('[data-test-expiry-time] input', '*unlimited');
      await fillIn('[data-test-timing-tags] input', 'timingtest');
      await selectChoose('[data-test-tag="destination"]', '*any');
      await fillIn('[data-test-rating-subject] input', 'subjecttest');
      await fillIn('[data-test-categories] input', 'categoriestest');
      await fillIn('[data-test-shared-groups] input', 'groupstest');
      await fillIn('[data-test-balance-weight] input', '20');
      await selectChoose('[data-test-select="balance-blocker"]', 'false');
      await selectChoose('[data-test-select="balance-disabled"]', 'false');
      await fillIn('[data-test-extra-parameters] input', 'parameterstest');
      await fillIn('[data-test-filter] input', 'filtertest');
      await fillIn('[data-test-weight] input', '10');
      await click('[data-test-submit-button]');
      expect(counter).to.eq(1);
    })
  );
});
