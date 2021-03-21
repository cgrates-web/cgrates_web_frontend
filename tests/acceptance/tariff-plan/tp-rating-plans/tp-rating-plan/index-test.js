import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';
import { setupApplicationTest } from 'ember-mocha';
import { authenticateSession } from 'ember-simple-auth/test-support';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { visit, find, click, currentRouteName } from '@ember/test-helpers';

describe('Acceptance: TpRatingPlan.Index', function () {
  let hooks = setupApplicationTest();
  setupMirage(hooks);

  beforeEach(async function () {
    this.tariffPlan = server.create('tariff-plan', {
      id: '1',
      name: 'Test',
      alias: 'tptest',
    });
    this.tpRatingPlan = server.create('tp-rating-plan', {
      id: '1',
      tpid: this.tariffPlan.alias,
      tag: 'tagtest',
    });
    const user = server.create('user');
    await authenticateSession({ email: 'user@example.com', user_id: user.id });
  });

  describe('basic rendering', () =>
    it('renders specific header', async function () {
      await visit('/tariff-plans/1/tp-rating-plans/1');
      expect(find('main h2')).to.have.trimmed.text('TpRatingPlan: tagtest');
    }));

  describe('click edit button', () =>
    it('redirects to tp-rating-plan edit page', async function () {
      await visit('/tariff-plans/1/tp-rating-plans/1');
      await click('[data-test-tp-rating-plan-edit]');
      expect(currentRouteName()).to.equal(
        'tariff-plan.tp-rating-plans.tp-rating-plan.edit'
      );
    }));
});
