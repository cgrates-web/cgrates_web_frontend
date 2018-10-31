import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';
import { setupApplicationTest } from 'ember-mocha';
import { authenticateSession } from 'ember-simple-auth/test-support';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { visit, find, click, currentRouteName } from '@ember/test-helpers';
describe('Acceptance: TpCharger.Index', function () {
  let hooks = setupApplicationTest();
  setupMirage(hooks);

  beforeEach(async function () {
    const tariffPlan = server.create('tariff-plan', {id: '1', name: 'Test', alias: 'tptest'});
    server.create('tp-charger', {id: '1', tpid: tariffPlan.alias, customId: 'custom_id'});
    await authenticateSession({email: 'user@example.com'});
  });

  describe('basic rendering', () =>
    it('renders specific header', async function () {
      await visit('/tariff-plans/1/tp-chargers/1');
      expect(find('main h2').textContent).to.eq('TpCharger: custom_id');
    })
  );

  return describe('click edit button', () =>
    it('redirects to tp-charger edit page', async function () {
      await visit('/tariff-plans/1/tp-chargers/1');
      await click('[data-test-edit]');
      expect(currentRouteName()).to.equal('tariff-plan.tp-chargers.tp-charger.edit');
    })
  );
});
