import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';
import { setupApplicationTest } from 'ember-mocha';
import { authenticateSession } from 'ember-simple-auth/test-support';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { visit, find, click, currentRouteName } from '@ember/test-helpers';

describe('Acceptance: TpTiming.Index', function () {
  let hooks = setupApplicationTest();
  setupMirage(hooks);

  beforeEach(async function () {
    this.tariffPlan = server.create('tariff-plan', {
      id: '1',
      name: 'Test',
      alias: 'tptest',
    });
    this.tpTiming = server.create('tp-timing', {
      id: '1',
      tpid: this.tariffPlan.alias,
      tag: 'new-timing',
    });
    const user = server.create('user');
    await authenticateSession({ email: 'user@example.com', user_id: user.id });
  });

  describe('basic rendering', () =>
    it('renders specific header', async function () {
      await visit('/tariff-plans/1/tp-timings/1');
      expect(find('main h2')).to.have.trimmed.text('Timing: new-timing');
    }));

  describe('click edit button', () =>
    it('redirects to tp-timing edit page', async function () {
      await visit('/tariff-plans/1/tp-timings/1');
      await click('[data-test-tp-timing]');
      expect(currentRouteName()).to.equal(
        'tariff-plan.tp-timings.tp-timing.edit'
      );
    }));
});
