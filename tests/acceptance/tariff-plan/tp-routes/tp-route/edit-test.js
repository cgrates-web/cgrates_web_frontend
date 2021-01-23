import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';
import { setupApplicationTest } from 'ember-mocha';
import { authenticateSession } from 'ember-simple-auth/test-support';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { visit, click, fillIn } from '@ember/test-helpers';

describe('Acceptance: TpRoute.Edit', function () {
  let hooks = setupApplicationTest();
  setupMirage(hooks);

  beforeEach(async function () {
    this.tariffPlan = server.create('tariff-plan', {
      id: '1',
      name: 'Test',
      alias: 'tptest',
    });
    this.tpRate = server.create('tp-route', {
      id: '1',
      tpid: this.tariffPlan.alias,
    });
    await authenticateSession({ email: 'user@example.com' });
  });

  describe('fill form with correct data and submit', () =>
    it('sends correct data to the backend', async function () {
      await visit('/tariff-plans/1/tp-routes/1/edit');
      await fillIn('[data-test-custom-id] input', 'edited');
      await click('[data-test-submit-button]');
      expect(server.db.tpRoutes.findBy({ customId: 'edited' })).to.exist;
    }));
});
