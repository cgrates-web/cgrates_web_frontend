import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';
import { setupApplicationTest } from 'ember-mocha';
import { authenticateSession } from 'ember-simple-auth/test-support';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { visit, click, fillIn } from '@ember/test-helpers';

describe('Acceptance: TpAttributes.Edit', function () {
  let hooks = setupApplicationTest();
  setupMirage(hooks);

  beforeEach(async function () {
    this.tariffPlan = server.create('tariff-plan', {
      id: '1',
      name: 'Test',
      alias: 'tptest',
    });
    server.create('tp-attribute', {
      id: '1',
      tpid: this.tariffPlan.alias,
      filterIds: 'test_id1',
    });
    server.create('tp-filter', {
      tpid: this.tariffPlan.alias,
      customId: 'test_id2',
    });
    server.create('tp-filter', {
      tpid: this.tariffPlan.alias,
      customId: 'test_id3',
    });
    await authenticateSession({ email: 'user@example.com' });
  });

  describe('fill form with correct data and submit', () =>
    it('sends correct data to the backend', async function () {
      let expectCorrectRequest = () => expect(true).to.be.false;
      server.patch('/tp-attributes/:id', function (schema, request) {
        expectCorrectRequest = () => {
          const params = JSON.parse(request.requestBody);
          expect(params.data.attributes['tpid']).to.eq('tptest');
          expect(params.data.attributes['tenant']).to.eq('tenant');
          expect(params.data.attributes['custom-id']).to.eq('custom_id');
          expect(params.data.attributes['contexts']).to.eq('contexts');
          expect(params.data.attributes['path']).to.eq('path');
          expect(params.data.attributes['cg-type']).to.eq('cg-type');
          expect(params.data.attributes['value']).to.eq('value');
          expect(params.data.attributes['activation-interval']).to.eq(
            'activation_interval'
          );
          expect(params.data.attributes['weight']).to.eq(10);
          expect(params.data.attributes['blocker']).to.eq(true);
        };
        return { data: { id: '1', type: 'tp-attribute' } };
      });

      await visit('/tariff-plans/1/tp-attributes/1/edit');
      await fillIn('[data-test-tenant] input', 'tenant');
      await fillIn('[data-test-customid] input', 'custom_id');
      await fillIn('[data-test-contexts] input', 'contexts');
      await fillIn('[data-test-path] input', 'path');
      await fillIn('[data-test-cg-type] input', 'cg-type');
      await fillIn('[data-test-value] input', 'value');
      await fillIn(
        '[data-test-activation-interval] input',
        'activation_interval'
      );
      await fillIn('[data-test-weight] input', 10);
      await click('[data-test-blocker] input');
      await click('[data-test-submit-button]');
      expectCorrectRequest();
    }));
});
