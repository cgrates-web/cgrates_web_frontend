import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';
import { setupApplicationTest } from 'ember-mocha';
import { authenticateSession } from 'ember-simple-auth/test-support';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { visit, click, fillIn } from '@ember/test-helpers';
import {
  selectSearch,
  selectChoose,
} from 'ember-power-select/test-support/helpers';

describe('Acceptance: TpRatingProfile.Edit', function () {
  let hooks = setupApplicationTest();
  setupMirage(hooks);

  beforeEach(async function () {
    this.tariffPlan = server.create('tariff-plan', {
      id: '1',
      name: 'Test',
      alias: 'tptest',
    });
    this.tpRatingPlan1 = server.create('tp-rating-plan', {
      tpid: 'tptest',
      tag: 'ratingplan1',
    });
    this.tpRatingPlan2 = server.create('tp-rating-plan', {
      tpid: 'tptest',
      tag: 'ratingplan2',
    });
    this.tpRatingProfile = server.create('tp-rating-profile', {
      id: '1',
      tpid: this.tariffPlan.alias,
      rating_plan_tag: this.tpRatingPlan1.tag,
    });
    const user = server.create('user');
    await authenticateSession({ email: 'user@example.com', user_id: user.id });
  });

  describe('fill form with correct data and submit', () =>
    it('sends correct data to the backend', async function () {
      let counter = 0;

      server.patch('/tp-rating-profiles/:id', (schema, request) => {
        counter = counter + 1;
        const params = JSON.parse(request.requestBody);
        expect(params.data.attributes['tpid']).to.eq('tptest');
        expect(params.data.attributes['loadid']).to.eq('loadtest');
        expect(params.data.attributes['tenant']).to.eq('tenanttest');
        expect(params.data.attributes['category']).to.eq('categorytest');
        expect(params.data.attributes['subject']).to.eq('subject1');
        expect(params.data.attributes['fallback-subjects']).to.eq('subject2');
        expect(params.data.attributes['activation-time']).to.eq(
          'activationtime'
        );
        expect(params.data.attributes['rating-plan-tag']).to.eq('ratingplan2');
        return {
          data: { id: this.tpRatingProfile.id, type: 'tp-rating-profile' },
        };
      });

      await visit('/tariff-plans/1/tp-rating-profiles/1/edit');
      await fillIn('[data-test-loadid] input', 'loadtest');
      await fillIn('[data-test-tenant] input', 'tenanttest');
      await fillIn('[data-test-category] input', 'categorytest');
      await fillIn('[data-test-subject] input', 'subject1');
      await fillIn('[data-test-fallback-subjects] input', 'subject2');
      await fillIn('[data-test-activation-time] input', 'activationtime');
      await selectSearch('[data-test-tag="tp-rating-plan"]', 'ratingplan');
      await selectChoose('[data-test-tag="tp-rating-plan"]', 'ratingplan2');
      await click('[data-test-submit-button]');
      expect(counter).to.eq(1);
    }));
});
