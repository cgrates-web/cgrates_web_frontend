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
    this.tariffPlan = server.create('tariff-plan', { id: '1', name: 'Test', alias: 'tptest' });
    server.create('tp-attribute', {id: '1', tpid: this.tariffPlan.alias});
    await authenticateSession({email: 'user@example.com'});
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
          expect(params.data.attributes['filter-ids']).to.eq('filter_ids');
          expect(params.data.attributes['activation-interval']).to.eq('activation_interval');
          expect(params.data.attributes['field-name']).to.eq('field_name');
          expect(params.data.attributes['initial']).to.eq('initial');
          expect(params.data.attributes['substitute']).to.eq('substitute');
          expect(params.data.attributes['weight']).to.eq(10);
          expect(params.data.attributes['append']).to.eq(true);
          expect(params.data.attributes['blocker']).to.eq(true);
        };
        return { data: {id: '1', type: 'tp-attribute'} };
      });

      await visit('/tariff-plans/1/tp-attributes/1/edit');
      await fillIn('[data-test-tenant] input', 'tenant');
      await fillIn('[data-test-customid] input', 'custom_id');
      await fillIn('[data-test-contexts] input', 'contexts');
      await fillIn('[data-test-filter-ids] input', 'filter_ids');
      await fillIn('[data-test-activation-interval] input', 'activation_interval');
      await fillIn('[data-test-field-name] input', 'field_name');
      await fillIn('[data-test-initial] input', 'initial');
      await fillIn('[data-test-substitute] input', 'substitute');
      await fillIn('[data-test-weight] input', 10);
      await click('[data-test-append] input');
      await click('[data-test-blocker] input');
      await click('[data-test-submit-button]');
      expectCorrectRequest();
    })
  );
});
