import { beforeEach, describe, it } from 'mocha';
import { setupApplicationTest } from 'ember-mocha';
import { authenticateSession } from 'ember-simple-auth/test-support';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { expect } from 'chai';
import { visit, click, find, currentURL } from '@ember/test-helpers';

describe('Acceptance: TariffPlan.Index', function () {
  let hooks = setupApplicationTest();
  setupMirage(hooks);

  beforeEach(async function () {
    this.tpPlan = server.create('tariff-plan', { name: 'Test TpPlan' });
    const user = server.create('user');
    await authenticateSession({ email: 'user@example.com', user_id: user.id });
    await visit('tariff-plans');
    await click('[data-test-select-tp-plan]');
  });

  it('has correct url', async function () {
    expect(currentURL()).to.equal(`/tariff-plans/${this.tpPlan.id}`);
  });
  it('renders specific header', async function () {
    expect(find('h1.page-title').textContent.trim()).to.eq(
      'Tariff plan: Test TpPlan'
    );
  });
});
