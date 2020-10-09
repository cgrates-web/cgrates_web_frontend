import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';
import { setupApplicationTest } from 'ember-mocha';
import { authenticateSession } from 'ember-simple-auth/test-support';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { visit, click, fillIn } from '@ember/test-helpers';
import {
  selectChoose,
  selectSearch,
} from 'ember-power-select/test-support/helpers';

describe('Acceptance: TpLcrRule.Edit', function () {
  let hooks = setupApplicationTest();
  setupMirage(hooks);

  beforeEach(async function () {
    this.tariffPlan = server.create('tariff-plan', {
      id: '1',
      name: 'Test',
      alias: 'tptest',
    });
    this.tpDestination1 = server.create('tp-destination', {
      tpid: this.tariffPlan.alias,
      tag: 'DST_1001',
    });
    this.tpDestination2 = server.create('tp-destination', {
      tpid: this.tariffPlan.alias,
      tag: 'DST_1002',
    });
    this.tpLcrRule = server.create('tp-lcr-rule', {
      id: '1',
      tpid: this.tariffPlan.alias,
      destination_tag: this.tpDestination1.tag,
    });
    await authenticateSession({ email: 'user@example.com' });
  });

  return describe('fill form with correct data and submit', () =>
    it('sends correct data to the backend', async function () {
      let counter = 0;

      server.patch('/tp-lcr-rules/:id', (schema, request) => {
        counter = counter + 1;
        const params = JSON.parse(request.requestBody);
        expect(params.data.attributes['tpid']).to.eq('tptest');
        expect(params.data.attributes['direction']).to.eq('*out');
        expect(params.data.attributes['tenant']).to.eq('cgrates.org');
        expect(params.data.attributes['category']).to.eq('call');
        expect(params.data.attributes['account']).to.eq('1001');
        expect(params.data.attributes['subject']).to.eq('*any');
        expect(params.data.attributes['destination-tag']).to.eq('DST_1002');
        expect(params.data.attributes['rp-category']).to.eq('lcr_profile1');
        expect(params.data.attributes['strategy']).to.eq('*load_distribution');
        expect(params.data.attributes['strategy-params']).to.eq(
          'supplier1:5;supplier2:3;*default:1'
        );
        expect(params.data.attributes['activation-time']).to.eq(
          '2014-01-14T00:00:00Z'
        );
        expect(params.data.attributes['weight']).to.eq(10);
        return { data: { id: this.tpLcrRule.id, type: 'tp-lcr-rule' } };
      });

      await visit('/tariff-plans/1/tp-lcr-rules/1/edit');
      await selectChoose('[data-test-select="direction"]', '*out');
      await fillIn('[data-test-tenant] input', 'cgrates.org');
      await fillIn('[data-test-category] input', 'call');
      await fillIn('[data-test-account] input', '1001');
      await fillIn('[data-test-subject] input', '*any');
      await selectSearch('[data-test-tag="destination"]', 'DST_1002');
      await selectChoose('[data-test-tag="destination"]', 'DST_1002');
      await fillIn('[data-test-rp-category] input', 'lcr_profile1');
      await selectChoose('[data-test-select="strategy"]', '*load_distribution');
      await fillIn(
        '[data-test-strategy-params] input',
        'supplier1:5;supplier2:3;*default:1'
      );
      await fillIn('[data-test-activation-time] input', '2014-01-14T00:00:00Z');
      await fillIn('[data-test-weight] input', '10');
      await click('[data-test-submit-button]');
      expect(counter).to.eq(1);
    }));
});
