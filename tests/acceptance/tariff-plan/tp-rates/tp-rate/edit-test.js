import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';
import { setupApplicationTest } from 'ember-mocha';
import { authenticateSession } from 'ember-simple-auth/test-support';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { visit, click, fillIn } from '@ember/test-helpers';

describe('Acceptance: TpRate.Edit', function () {
  let hooks = setupApplicationTest();
  setupMirage(hooks);

  beforeEach(async function () {
    this.tariffPlan = server.create('tariff-plan', {
      id: '1',
      name: 'Test',
      alias: 'tptest',
    });
    this.tpRate = server.create('tp-rate', {
      id: '1',
      tpid: this.tariffPlan.alias,
    });
    const user = server.create('user');
    await authenticateSession({ email: 'user@example.com', user_id: user.id });
  });

  describe('fill form with correct data and submit', () =>
    it('sends correct data to the backend', async function () {
      let counter = 0;

      server.patch('/tp-rates/:id', (schema, request) => {
        counter = counter + 1;
        const params = JSON.parse(request.requestBody);
        expect(params.data.attributes['tpid']).to.eq('tptest');
        expect(params.data.attributes['tag']).to.eq('edited');
        expect(params.data.attributes['rate-unit']).to.eq('60s');
        expect(params.data.attributes['rate-increment']).to.eq('60s');
        expect(params.data.attributes['rate']).to.eq(0.01);
        expect(params.data.attributes['group-interval-start']).to.eq('60s');
        expect(params.data.attributes['connect-fee']).to.eq(0.01);
        return { data: { id: this.tpRate.id, type: 'tp-rate' } };
      });

      await visit('/tariff-plans/1/tp-rates/1/edit');
      await fillIn('[data-test-tag] input', 'edited');
      await fillIn('[data-test-second="rate-unit"] input', '60');
      await fillIn('[data-test-second="rate-increment"] input', '60');
      await fillIn('[data-test-rate] input', '0.01');
      await fillIn('[data-test-second="group-interval-start"] input', '60');
      await fillIn('[data-test-connect-fee] input', '0.01');
      await click('[data-test-submit-button]');
      expect(counter).to.eq(1);
    }));
});
