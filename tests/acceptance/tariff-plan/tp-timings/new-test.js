import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';
import { setupApplicationTest } from 'ember-mocha';
import { authenticateSession } from 'ember-simple-auth/test-support';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { visit, find, findAll, click, fillIn } from '@ember/test-helpers';

describe('Acceptance: TpTimings.New', function () {
  let hooks = setupApplicationTest();
  setupMirage(hooks);

  beforeEach(async function () {
    this.tariffPlan = server.create('tariff-plan', {
      id: '1',
      name: 'Test',
      alias: 'tptest',
    });
    await authenticateSession({ email: 'user@example.com' });
  });

  describe('visit /tariff-plans/:id/tp-timings/new', () =>
    it('renders tp-timing form', async function () {
      await visit('/tariff-plans/1/tp-timings/new');
      expect(findAll('form input').length).to.eq(6);
    }));

  describe('go away without save', () =>
    it('removes not saved tp-timing', async function () {
      await visit('/tariff-plans/1/tp-timings/new');
      await click('[data-test-tp-timings-link]');
      expect(findAll('table tbody tr').length).to.eq(0);
    }));
  describe('submit empty form', function () {
    beforeEach(async function () {
      await visit('/tariff-plans/1/tp-timings/new');
      await click('[data-test-submit-button]');
    });
    it('displays tag error', function () {
      expect(find('[data-test-tag] input')).to.have.class('is-invalid');
      expect(find('[data-test-tag] .invalid-feedback')).to.have.class(
        'd-block'
      );
    });
    it('displays years error', function () {
      expect(find('[data-test-years] input')).to.have.class('is-invalid');
      expect(find('[data-test-years] .invalid-feedback')).to.have.class(
        'd-block'
      );
    });
    it('displays months error', function () {
      expect(find('[data-test-months] input')).to.have.class('is-invalid');
      expect(find('[data-test-months] .invalid-feedback')).to.have.class(
        'd-block'
      );
    });
    it('displays month-days error', function () {
      expect(find('[data-test-month-days] input')).to.have.class('is-invalid');
      expect(find('[data-test-month-days] .invalid-feedback')).to.have.class(
        'd-block'
      );
    });
    it('displays week-days error', function () {
      expect(find('[data-test-week-days] input')).to.have.class('is-invalid');
      expect(find('[data-test-week-days] .invalid-feedback')).to.have.class(
        'd-block'
      );
    });
    it('displays time error', function () {
      expect(find('[data-test-time] input')).to.have.class('is-invalid');
      expect(find('[data-test-time] .invalid-feedback')).to.have.class(
        'd-block'
      );
    });
  });

  describe('fill form with correct data and submit', () =>
    it('saves new tp-timing with correct data', async function () {
      let counter = 0;

      server.post('/tp-timings/', function (schema, request) {
        counter = counter + 1;
        const params = JSON.parse(request.requestBody);
        expect(params.data.attributes.tpid).to.eq('tptest');
        expect(params.data.attributes.tag).to.eq('tagtest');
        expect(params.data.attributes.years).to.eq('2017');
        expect(params.data.attributes.months).to.eq('june');
        expect(params.data.attributes.time).to.eq('14');
        expect(params.data.attributes['month-days']).to.eq('30');
        expect(params.data.attributes['week-days']).to.eq('14');
        return { data: { id: '1', type: 'tp-timing' } };
      });

      await visit('/tariff-plans/1/tp-timings/new');
      await fillIn('[data-test-tag] input', 'tagtest');
      await fillIn('[data-test-years] input', '2017');
      await fillIn('[data-test-months] input', 'june');
      await fillIn('[data-test-month-days] input', '30');
      await fillIn('[data-test-week-days] input', '14');
      await fillIn('[data-test-time] input', '14');
      await click('[data-test-submit-button]');
      expect(counter).to.eq(1);
    }));
});
