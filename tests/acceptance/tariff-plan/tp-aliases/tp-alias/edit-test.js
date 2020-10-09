import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';
import { setupApplicationTest } from 'ember-mocha';
import { authenticateSession } from 'ember-simple-auth/test-support';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { visit, click, fillIn } from '@ember/test-helpers';

describe('Acceptance: TpAliases.Edit', function () {
  let hooks = setupApplicationTest();
  setupMirage(hooks);

  beforeEach(async function () {
    this.tariffPlan = server.create('tariff-plan', {
      id: '1',
      name: 'Test',
      alias: 'tptest',
    });
    server.create('tp-alias', { id: '1', tpid: this.tariffPlan.alias });
    await authenticateSession({ email: 'user@example.com' });
  });

  describe('fill form with correct data and submit', () =>
    it('sends correct data to the backend', async function () {
      let expectCorrectRequest = () => expect(true).to.be.false;
      server.patch('/tp-aliases/:id', function (schema, request) {
        expectCorrectRequest = () => {
          const params = JSON.parse(request.requestBody);
          expect(params.data.attributes['tpid']).to.eq('tptest');
          expect(params.data.attributes['direction']).to.eq('direction');
          expect(params.data.attributes['category']).to.eq('category');
          expect(params.data.attributes['account']).to.eq('account');
          expect(params.data.attributes['subject']).to.eq('subject');
          expect(params.data.attributes['destination-id']).to.eq(
            'destination_id'
          );
          expect(params.data.attributes['context']).to.eq('context');
          expect(params.data.attributes['target']).to.eq('target');
          expect(params.data.attributes['original']).to.eq('original');
          expect(params.data.attributes['alias']).to.eq('alias');
          expect(params.data.attributes['weight']).to.eq(10);
        };
        return { data: { id: '1', type: 'tp-alias' } };
      });

      await visit('/tariff-plans/1/tp-aliases/1/edit');
      await fillIn('[data-test-tenant] input', 'tenant');
      await fillIn('[data-test-direction] input', 'direction');
      await fillIn('[data-test-category] input', 'category');
      await fillIn('[data-test-account] input', 'account');
      await fillIn('[data-test-subject] input', 'subject');
      await fillIn('[data-test-destination-id] input', 'destination_id');
      await fillIn('[data-test-context] input', 'context');
      await fillIn('[data-test-target] input', 'target');
      await fillIn('[data-test-original] input', 'original');
      await fillIn('[data-test-alias] input', 'alias');
      await fillIn('[data-test-weight] input', 10);
      await click('[data-test-submit-button]');
      expectCorrectRequest();
    }));
});
