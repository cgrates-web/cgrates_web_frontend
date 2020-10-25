import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';
import { setupApplicationTest } from 'ember-mocha';
import { authenticateSession } from 'ember-simple-auth/test-support';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { visit, find, click, currentRouteName } from '@ember/test-helpers';
describe('Acceptance: TpActionTriggers.Index', function () {
  let hooks = setupApplicationTest();
  setupMirage(hooks);

  beforeEach(async function () {
    const tariffPlan = server.create('tariff-plan', {
      id: '1',
      name: 'Test',
      alias: 'tptest',
    });
    server.create('tp-action-trigger', {
      id: '1',
      tpid: tariffPlan.alias,
      tag: 'tag-test',
    });
    await authenticateSession({ email: 'user@example.com' });
  });

  describe('basic rendering', () =>
    it('renders specific header', async function () {
      await visit('/tariff-plans/1/tp-action-triggers/1');
      expect(find('main h2')).to.have.trimmed.text('TpActionTrigger: tag-test');
    }));

  return describe('click edit button', () =>
    it('redirects to tp-action-trigger edit page', async function () {
      await visit('/tariff-plans/1/tp-action-triggers/1');
      await click('[data-test-edit]');
      expect(currentRouteName()).to.equal(
        'tariff-plan.tp-action-triggers.tp-action-trigger.edit'
      );
    }));
});
