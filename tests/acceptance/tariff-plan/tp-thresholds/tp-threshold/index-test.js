import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';
import { setupApplicationTest } from 'ember-mocha';
import { authenticateSession } from 'ember-simple-auth/test-support';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { visit, find, click, currentRouteName } from '@ember/test-helpers';
describe('Acceptance: TpThreshold.Index', function () {
  let hooks = setupApplicationTest();
  setupMirage(hooks);

  beforeEach(async function () {
    const tariffPlan = server.create('tariff-plan', {
      id: '1',
      name: 'Test',
      alias: 'tptest',
    });
    server.create('tp-threshold', {
      id: '1',
      tpid: tariffPlan.alias,
      customId: 'custom_id',
    });
    const user = server.create('user');
    await authenticateSession({ email: 'user@example.com', user_id: user.id });
  });

  describe('basic rendering', () =>
    it('renders specific header', async function () {
      await visit('/tariff-plans/1/tp-thresholds/1');
      expect(find('main h2')).to.have.trimmed.text('TpThreshold: custom_id');
    }));

  return describe('click edit button', () =>
    it('redirects to tp-threshold edit page', async function () {
      await visit('/tariff-plans/1/tp-thresholds/1');
      await click('[data-test-edit]');
      expect(currentRouteName()).to.equal(
        'tariff-plan.tp-thresholds.tp-threshold.edit'
      );
    }));
});
