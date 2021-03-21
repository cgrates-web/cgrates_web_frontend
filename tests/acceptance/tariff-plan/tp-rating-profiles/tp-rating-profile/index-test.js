import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';
import { setupApplicationTest } from 'ember-mocha';
import { authenticateSession } from 'ember-simple-auth/test-support';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { visit, find, click, currentRouteName } from '@ember/test-helpers';

describe('Acceptance: TpRatingProfile.Index', function () {
  let hooks = setupApplicationTest();
  setupMirage(hooks);

  beforeEach(async function () {
    this.tariffPlan = server.create('tariff-plan', {
      id: '1',
      name: 'Test',
      alias: 'tptest',
    });
    this.tpRatingProfile = server.create('tp-rating-profile', {
      tpid: this.tariffPlan.alias,
      id: 'test',
    });
    const user = server.create('user');
    await authenticateSession({ email: 'user@example.com', user_id: user.id });
  });

  describe('basic rendering', () =>
    it('renders specific header', async function () {
      await visit('/tariff-plans/1/tp-rating-profiles/test');
      expect(find('main h2')).to.have.trimmed.text('TpRatingProfile: test');
    }));

  describe('click edit button', () =>
    it('redirects to tp-rating-profile edit page', async function () {
      await visit('/tariff-plans/1/tp-rating-profiles/test');
      await click('[data-test-rating-profile-edit]');
      expect(currentRouteName()).to.equal(
        'tariff-plan.tp-rating-profiles.tp-rating-profile.edit'
      );
    }));
});
