import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';
import { setupApplicationTest } from 'ember-mocha';
import { authenticateSession } from 'ember-simple-auth/test-support';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { visit, find, findAll, click, fillIn } from '@ember/test-helpers';
import {
  selectSearch,
  selectChoose,
} from 'ember-power-select/test-support/helpers';

describe('Acceptance: TpRatingProfiles.New', function () {
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
    await authenticateSession({ email: 'user@example.com' });
  });

  describe('visit /tariff-plans/1/tp-rating-profiles/new', () =>
    it('renders tp-rating-profile form', async function () {
      await visit('/tariff-plans/1/tp-rating-profiles/new');
      expect(findAll('form input').length).to.eq(7);
      expect(findAll('form .ember-power-select-trigger').length).to.eq(2);
    }));

  describe('go away without save', () =>
    it('removes not saved tp-rating-profile', async function () {
      await visit('/tariff-plans/1/tp-rating-profiles/new');
      await click('[data-test-rating-profiles-link]');
      expect(findAll('table tbody tr').length).to.eq(0);
    }));

  describe('submit empty form', function () {
    beforeEach(async function () {
      await visit('/tariff-plans/1/tp-rating-profiles/new');
      await click('[data-test-submit-button]');
    });
    it('displays loadid error', function () {
      expect(find('[data-test-loadid] input')).to.have.class('is-invalid');
      expect(find('[data-test-loadid] .invalid-feedback')).to.have.class(
        'd-block'
      );
    });
    it('displays direction error', function () {
      expect(find('[data-test-select="direction"] div')).to.have.class(
        'is-invalid'
      );
      expect(
        find('[data-test-select="direction"] .invalid-feedback')
      ).to.have.class('d-block');
    });
    it('displays tenant error', function () {
      expect(find('[data-test-tenant] input')).to.have.class('is-invalid');
      expect(find('[data-test-tenant] .invalid-feedback')).to.have.class(
        'd-block'
      );
    });
    it('displays category error', function () {
      expect(find('[data-test-category] input')).to.have.class('is-invalid');
      expect(find('[data-test-category] .invalid-feedback')).to.have.class(
        'd-block'
      );
    });
    it('displays subject error', function () {
      expect(find('[data-test-subject] input')).to.have.class('is-invalid');
      expect(find('[data-test-subject] .invalid-feedback')).to.have.class(
        'd-block'
      );
    });
    it('does not displays fallback-subjects error', function () {
      expect(find('[data-test-fallback-subjects] input')).not.to.have.class(
        'is-invalid'
      );
      expect(find('[data-test-fallback-subjects] .invalid-feedback')).not.to
        .exist;
    });
    it('displays activation-time error', function () {
      expect(find('[data-test-activation-time] input')).to.have.class(
        'is-invalid'
      );
      expect(
        find('[data-test-activation-time] .invalid-feedback')
      ).to.have.class('d-block');
    });
    it('does not displays cdr-stat-queue-ids error', function () {
      expect(find('[data-test-cdr-stat-queue-ids] input')).not.to.have.class(
        'is-invalid'
      );
      expect(find('[data-test-cdr-stat-queue-ids] .invalid-feedback')).not.to
        .exist;
    });
    it('displays tp-rating-plan tag error', function () {
      expect(find('[data-test-tag="tp-rating-plan"] div')).to.have.class(
        'is-invalid'
      );
      expect(
        find('[data-test-tag="tp-rating-plan"] .invalid-feedback')
      ).to.have.class('d-block');
    });
  });

  describe('fill form with correct data and submit', () =>
    it('saves new tp-rating-profile with correct data', async function () {
      let counter = 0;

      server.post('/tp-rating-profiles/', function (schema, request) {
        counter = counter + 1;
        const params = JSON.parse(request.requestBody);
        expect(params.data.attributes['tpid']).to.eq('tptest');
        expect(params.data.attributes['loadid']).to.eq('loadtest');
        expect(params.data.attributes['direction']).to.eq('*in');
        expect(params.data.attributes['tenant']).to.eq('tenanttest');
        expect(params.data.attributes['category']).to.eq('categorytest');
        expect(params.data.attributes['subject']).to.eq('subject1');
        expect(params.data.attributes['fallback-subjects']).to.eq('subject2');
        expect(params.data.attributes['activation-time']).to.eq(
          'activationtime'
        );
        expect(params.data.attributes['cdr-stat-queue-ids']).to.eq('queuetest');
        expect(params.data.attributes['rating-plan-tag']).to.eq('ratingplan1');
        return { data: { id: '1', type: 'tp-rating-profile' } };
      });

      await visit('/tariff-plans/1/tp-rating-profiles/new');
      await fillIn('[data-test-loadid] input', 'loadtest');
      await selectChoose('[data-test-select="direction"]', '*in');
      await fillIn('[data-test-tenant] input', 'tenanttest');
      await fillIn('[data-test-category] input', 'categorytest');
      await fillIn('[data-test-subject] input', 'subject1');
      await fillIn('[data-test-fallback-subjects] input', 'subject2');
      await fillIn('[data-test-activation-time] input', 'activationtime');
      await fillIn('[data-test-cdr-stat-queue-ids] input', 'queuetest');
      await selectSearch('[data-test-tag="tp-rating-plan"]', 'ratingplan');
      await selectChoose('[data-test-tag="tp-rating-plan"]', 'ratingplan1');
      await click('[data-test-submit-button]');
      expect(counter).to.eq(1);
    }));
});
