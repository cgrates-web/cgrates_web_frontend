import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';
import { setupApplicationTest } from 'ember-mocha';
import { authenticateSession } from 'ember-simple-auth/test-support';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { visit, click, fillIn } from '@ember/test-helpers';

describe('Acceptance: TpSharedGroups.Edit', function () {
  let hooks = setupApplicationTest();
  setupMirage(hooks);
  beforeEach(async function () {
    this.tariffPlan = server.create('tariff-plan', {
      id: '1',
      name: 'Test',
      alias: 'tptest',
    });
    server.create('tp-shared-group', { id: '1', tpid: this.tariffPlan.alias });
    await authenticateSession({ email: 'user@example.com' });
  });
  describe('fill form with correct data and submit', () =>
    it('sends correct data to the backend', async function () {
      let expectCorrectRequest = () => expect(true).to.be.false;
      server.patch('/tp-shared-groups/:id', function (schema, request) {
        expectCorrectRequest = () => {
          const params = JSON.parse(request.requestBody);
          expect(params.data.attributes['tpid']).to.eq('tptest');
          expect(params.data.attributes['tag']).to.eq('tag');
          expect(params.data.attributes['account']).to.eq('account');
          expect(params.data.attributes['strategy']).to.eq('strategy');
          expect(params.data.attributes['rating-subject']).to.eq(
            'rating_subject'
          );
        };
        return { data: { id: '1', type: 'tp-shared-group' } };
      });
      await visit('/tariff-plans/1/tp-shared-groups/1/edit');
      await fillIn('[data-test-tag] input', 'tag');
      await fillIn('[data-test-account] input', 'account');
      await fillIn('[data-test-strategy] input', 'strategy');
      await fillIn('[data-test-rating-subject] input', 'rating_subject');
      await click('[data-test-submit-button]');
      expectCorrectRequest();
    }));
});
