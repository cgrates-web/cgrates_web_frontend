import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';
import { setupApplicationTest } from 'ember-mocha';
import { authenticateSession } from 'ember-simple-auth/test-support';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { visit, find, click, currentRouteName } from '@ember/test-helpers';

describe('Acceptance: RawSupplierRate.Index', function () {
  let hooks = setupApplicationTest();
  setupMirage(hooks);

  beforeEach(async function () {
    this.tariffPlan = server.create('tariff-plan', {
      id: '1',
      name: 'Test',
      alias: 'tptest',
    });
    server.create('raw-supplier-rate', { id: '1' });
    await authenticateSession({ email: 'user@example.com' });
  });

  describe('basic rendering', () =>
    it('renders specific header', async function () {
      await visit('/tariff-plans/1/raw-supplier-rates/1');
      expect(find('main h2')).to.have.trimmed.text('Raw supplier rate: 1');
    }));

  describe('click edit button', () =>
    it('redirects to tp-rate edit page', async function () {
      await visit('/tariff-plans/1/raw-supplier-rates/1');
      await click('[data-test-supplier-rate-edit]');
      expect(currentRouteName()).to.eq(
        'tariff-plan.raw-supplier-rates.raw-supplier-rate.edit'
      );
    }));
});
