import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';
import { setupApplicationTest } from 'ember-mocha';
import { authenticateSession } from 'ember-simple-auth/test-support';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { visit, find, click, currentRouteName } from '@ember/test-helpers';

describe('Acceptance: TpLcrRule.Index', function () {
  let hooks = setupApplicationTest();
  setupMirage(hooks);

  beforeEach(async function () {
    this.tariffPlan = server.create('tariff-plan', {
      id: '1',
      name: 'Test',
      alias: 'tptest',
    });
    this.tpLcrRule = server.create('tp-lcr-rule', {
      tpid: this.tariffPlan.alias,
      id: 'test',
    });
    await authenticateSession({ email: 'user@example.com' });
  });

  describe('basic rendering', () =>
    it('renders specific header', async function () {
      await visit('/tariff-plans/1/tp-lcr-rules/test');
      expect(find('main h2')).to.have.trimmed.text('TpLcrRule: test');
    }));

  describe('click edit button', () =>
    it('redirects to tp-lcr-rule edit page', async function () {
      await visit('/tariff-plans/1/tp-lcr-rules/test');
      await click('[data-test-lcr-rule-edit]');
      expect(currentRouteName()).to.equal(
        'tariff-plan.tp-lcr-rules.tp-lcr-rule.edit'
      );
    }));
});
