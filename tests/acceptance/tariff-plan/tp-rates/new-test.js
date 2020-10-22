import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';
import { setupApplicationTest } from 'ember-mocha';
import { authenticateSession } from 'ember-simple-auth/test-support';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { visit, find, findAll, click, fillIn } from '@ember/test-helpers';

describe('Acceptance: TpRates.New', function () {
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

  describe('visit /tariff-plans/1/tp-rates/new', () =>
    it('renders tp-rate form', async function () {
      await visit('/tariff-plans/1/tp-rates/new');
      expect(findAll('form input').length).to.eq(6);
    }));

  describe('submit empty form', function () {
    beforeEach(async function () {
      await visit('/tariff-plans/1/tp-rates/new');
      await click('[data-test-submit-button]');
    });
    it('displays tag error', function () {
      expect(find('[data-test-tag] input')).to.have.class('is-invalid');
      expect(find('[data-test-tag] .invalid-feedback')).to.have.class(
        'd-block'
      );
    });
    it('displays rate-unit error', function () {
      expect(find('[data-test-second="rate-unit"] input')).to.have.class(
        'is-invalid'
      );
      expect(
        find('[data-test-second="rate-unit"] .invalid-feedback')
      ).to.have.class('d-block');
    });
    it('displays rate-increment error', function () {
      expect(find('[data-test-second="rate-increment"] input')).to.have.class(
        'is-invalid'
      );
      expect(
        find('[data-test-second="rate-increment"] .invalid-feedback')
      ).to.have.class('d-block');
    });
    it('displays rate error', function () {
      expect(find('[data-test-rate] input')).to.have.class('is-invalid');
      expect(find('[data-test-rate] .invalid-feedback')).to.have.class(
        'd-block'
      );
    });
    it('displays group-interval-start error', function () {
      expect(
        find('[data-test-second="group-interval-start"] input')
      ).to.have.class('is-invalid');
      expect(
        find('[data-test-second="group-interval-start"] .invalid-feedback')
      ).to.have.class('d-block');
    });
    it('displays connect-fee error', function () {
      expect(find('[data-test-connect-fee] input')).to.have.class('is-invalid');
      expect(find('[data-test-connect-fee] .invalid-feedback')).to.have.class(
        'd-block'
      );
    });
  });

  return describe('fill form with correct data and submit', () =>
    it('saves new tp-rate with correct data', async function () {
      let counter = 0;

      server.post('/tp-rates/', function (schema, request) {
        counter = counter + 1;
        const params = JSON.parse(request.requestBody);
        expect(params.data.attributes['tpid']).to.eq('tptest');
        expect(params.data.attributes['tag']).to.eq('tagtest');
        expect(params.data.attributes['rate-unit']).to.eq('60s');
        expect(params.data.attributes['rate-increment']).to.eq('60s');
        expect(params.data.attributes['rate']).to.eq(0.01);
        expect(params.data.attributes['group-interval-start']).to.eq('60s');
        expect(params.data.attributes['connect-fee']).to.eq(0.01);
        return { data: { id: '1', type: 'tp-rate' } };
      });

      await visit('/tariff-plans/1/tp-rates/new');
      await fillIn('[data-test-tag] input', 'tagtest');
      await fillIn('[data-test-second="rate-unit"] input', '60');
      await fillIn('[data-test-second="rate-increment"] input', '60');
      await fillIn('[data-test-rate] input', '0.01');
      await fillIn('[data-test-second="group-interval-start"] input', '60');
      await fillIn('[data-test-connect-fee] input', '0.01');
      await click('[data-test-submit-button]');
      expect(counter).to.eq(1);
    }));
});
