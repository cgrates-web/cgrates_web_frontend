import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';
import { setupApplicationTest } from 'ember-mocha';
import { authenticateSession } from 'ember-simple-auth/test-support';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { visit, find, click, currentRouteName } from '@ember/test-helpers';

describe('Acceptance: TpDestinationRate.Index', function () {
  let hooks = setupApplicationTest();
  setupMirage(hooks);

  beforeEach(async function () {
    this.tariffPlan = server.create('tariff-plan', {
      id: '1',
      name: 'Test',
      alias: 'tptest',
    });
    server.create('tp-destination-rate', {
      id: '1',
      tpid: this.tariffPlan.alias,
      tag: 'tagtest',
    });
    await authenticateSession({ email: 'user@example.com' });
  });

  describe('basic rendering', () =>
    it('renders specific header', async function () {
      await visit('/tariff-plans/1/tp-destination-rates/1');
      expect(find('main h2')).to.have.trimmed.text('TpDestinationRate: tagtest');
    }));

  describe('click edit button', () =>
    it('redirects to tp-destination-rate edit page', async function () {
      await visit('/tariff-plans/1/tp-destination-rates/1');
      await click('[data-test-edit]');
      expect(currentRouteName()).to.equal(
        'tariff-plan.tp-destination-rates.tp-destination-rate.edit'
      );
    }));
});
