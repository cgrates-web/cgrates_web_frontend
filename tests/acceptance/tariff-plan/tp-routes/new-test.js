import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';
import { setupApplicationTest } from 'ember-mocha';
import { authenticateSession } from 'ember-simple-auth/test-support';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { visit, findAll, click, fillIn } from '@ember/test-helpers';

describe('Acceptance: TpRoute.New', function () {
  let hooks = setupApplicationTest();
  setupMirage(hooks);

  beforeEach(async function () {
    this.tariffPlan = server.create('tariff-plan', {
      id: '1',
      name: 'Test',
      alias: 'tptest',
    });
    await authenticateSession({ email: 'user@example.com' });
  });

  describe('visit /tariff-plans/1/tp-routes/new', () =>
    it('renders tp-route form', async function () {
      await visit('/tariff-plans/1/tp-routes/new');
      expect(findAll('form input').length).to.eq(16);
    }));

  describe('fill form with correct data and submit', () =>
    it('saves new tp-route with correct data', async function () {
      const attrs = {
        customId: 'my-route',
        tenant: 'my-tenant',
        weight: 10,
        routeWeight: 10,
        routeId: 'my-route-id'
      }
      await visit('/tariff-plans/1/tp-routes/new');
      await fillIn('[data-test-custom-id] input', attrs.customId);
      await fillIn('[data-test-route-id] input', attrs.routeId);
      await fillIn('[data-test-tenant] input', attrs.tenant);
      await fillIn('[data-test-weight] input', attrs.weight);
      await fillIn('[data-test-route-weight] input', attrs.routeWeight);
      await click('[data-test-submit-button]');

      expect(server.db.tpRoutes.findBy(attrs)).to.exist;
    }));
});
