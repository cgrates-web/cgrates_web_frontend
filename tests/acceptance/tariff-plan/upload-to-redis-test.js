import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';
import { setupApplicationTest } from 'ember-mocha';
import { authenticateSession } from 'ember-simple-auth/test-support';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { visit, click, find } from '@ember/test-helpers';

describe('Acceptance: Upload Tariff plane to redis', function () {
  let hooks = setupApplicationTest();
  setupMirage(hooks);

  beforeEach(async function () {
    this.tariffPlan = server.create('tariff-plan', {
      id: '1',
      name: 'Test',
      alias: 'tptest',
    });
    await authenticateSession({ email: 'user@exmple.com' });
  });

  describe('go to load tariff-plan page and fill in form', function () {
    it('sends correct request to the server', async function () {
      let expectRequestToBeCorrect = () => expect(false).to.be.true;
      server.post('/load-tariff-plan/', (schema, request) => {
        expectRequestToBeCorrect = () => {
          const params = JSON.parse(request.requestBody);
          expect(params.data.attributes.tpid).to.eq(this.tariffPlan.alias);
          expect(params.data.attributes['flush-db']).to.eq(true);
          expect(params.data.attributes['dry-run']).to.eq(false);
          expect(params.data.attributes.validate).to.eq(false);
        };
        return { result: 'OK' };
      });

      await visit('/tariff-plans/1/upload-to-redis');
      await click('[data-test-flush-db] input');
      await click('[data-test-submit-button]');
      await expectRequestToBeCorrect();
    });

    describe('backend sends success', function () {
      it('renders suceess message', async function () {
        server.post('/load-tariff-plan/', () => ({ result: 'OK' }));
        await visit('/tariff-plans/1/upload-to-redis');
        await click('[data-test-flush-db] input');
        await click('[data-test-submit-button]');
        expect(find('.flash-message.alert-success')).to.exist;
      });
    });
    describe('backend sends error', function () {
      it('renders danger message', async function () {
        server.post('/load-tariff-plan/', () => ({
          error: 'Some error from cgrates',
        }));
        await visit('/tariff-plans/1/upload-to-redis');
        await click('[data-test-flush-db] input');
        await click('[data-test-submit-button]');
        expect(find('.flash-message.alert-danger')).to.exist;
      });
    });
  });
});
