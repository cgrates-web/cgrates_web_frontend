import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';
import { setupApplicationTest } from 'ember-mocha';
import { authenticateSession } from 'ember-simple-auth/test-support';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { visit, find, click, currentRouteName } from '@ember/test-helpers';

describe('Acceptance: TpFilter.Index', function () {
  let hooks = setupApplicationTest();
  setupMirage(hooks);

  beforeEach(async function () {
    const tariffPlan = server.create('tariff-plan', {
      id: '1',
      name: 'Test',
      alias: 'tptest',
    });
    server.create('tp-filter', {
      id: '1',
      tpid: tariffPlan.alias,
      customId: 'tagtest',
    });
    const user = server.create('user');
    await authenticateSession({ email: 'user@example.com', user_id: user.id });
  });

  describe('basic rendering', () =>
    it('renders specific header', async function () {
      await visit('/tariff-plans/1/tp-filters/1');
      await expect(find('main h2')).to.have.trimmed.text('TpFilter: tagtest');
    }));

  describe('click edit button', () =>
    it('redirects to tp-filter edit page', async function () {
      await visit('/tariff-plans/1/tp-filters/1');
      await click('[data-test-tp-filter-edit]');
      expect(currentRouteName()).to.equal(
        'tariff-plan.tp-filters.tp-filter.edit'
      );
    }));
});
