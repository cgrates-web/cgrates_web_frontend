import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';
import { setupApplicationTest } from 'ember-mocha';
import { authenticateSession } from 'ember-simple-auth/test-support';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { visit, find, click, currentRouteName } from '@ember/test-helpers';

describe('Acceptance: TpAction.Index', function () {
  let hooks = setupApplicationTest();
  setupMirage(hooks);

  beforeEach(async function () {
    this.tariffPlan = server.create('tariff-plan', {
      id: '1',
      name: 'Test',
      alias: 'tptest',
    });
    this.tpAction = server.create('tp-action', {
      id: '1',
      tpid: this.tariffPlan.alias,
      tag: 'test',
    });
    const user = server.create('user');
    await authenticateSession({ email: 'user@example.com', user_id: user.id });
  });

  describe('basic rendering', function () {
    it('renders specific header', async function () {
      await visit('/tariff-plans/1/tp-actions/1');
      expect(find('main h2')).to.have.trimmed.text('TpAction: test');
    });
  });

  describe('click edit button', () =>
    it('redirects to tp-action edit page', async function () {
      await visit('/tariff-plans/1/tp-actions/1');
      await click('[data-test-edit]');
      expect(currentRouteName()).to.equal(
        'tariff-plan.tp-actions.tp-action.edit'
      );
    }));
});
