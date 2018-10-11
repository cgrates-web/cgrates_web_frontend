import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';
import { setupApplicationTest } from 'ember-mocha';
import { authenticateSession } from 'ember-simple-auth/test-support';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { visit, click, fillIn } from '@ember/test-helpers';
import { selectSearch, selectChoose } from 'ember-power-select/test-support/helpers';

describe("Acceptance: TpActionPlan.Edit", function() {
  let hooks = setupApplicationTest();
  setupMirage(hooks);

  beforeEach(async function() {
    this.tariffPlan = server.create('tariff-plan', {id: '1', name: 'Test', alias: 'tptest'});
    this.tpAction1 = server.create('tp-action', {tpid: this.tariffPlan.alias, tag: 'actiontest1'});
    this.tpAction2 = server.create('tp-action', {tpid: this.tariffPlan.alias, tag: 'actiontest2'});
    this.tpActionPlan = server.create('tp-action-plan', {
      id: 'tp_action_plan_id',
      tpid: this.tariffPlan.alias,
      actions_tag: this.tpAction1.tag
    });
    await authenticateSession({email: "user@example.com"});
  });

  return describe('fill form with correct data and submit', () =>
    it('sends correct data to the backend', async function() {
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

      await visit('/tariff-plans/1/tp-action-plans/tp_action_plan_id/edit');
      await fillIn('[data-test-tag] input', 'edited');
      await selectSearch('[data-test-tag="action"]', 'actiontest');
      await selectChoose('[data-test-tag="action"]', 'actiontest2');
      await fillIn('[data-test-timing-tag] input', '*asap');
      await fillIn('[data-test-weight] input', '10');
      await click('[data-test-submit-button]');
      expect(counter).to.eq(1)
    })
  );
});
