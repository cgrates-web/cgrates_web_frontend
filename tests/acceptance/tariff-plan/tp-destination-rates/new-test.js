import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';
import { setupApplicationTest } from 'ember-mocha';
import { authenticateSession } from 'ember-simple-auth/test-support';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { visit, find, findAll, click, fillIn } from '@ember/test-helpers';
import {
  selectChoose,
  selectSearch,
} from 'ember-power-select/test-support/helpers';

describe('Acceptance: TpDestinationRates.New', function () {
  let hooks = setupApplicationTest();
  setupMirage(hooks);

  beforeEach(async function () {
    this.tariffPlan = server.create('tariff-plan', {
      id: '1',
      name: 'Test',
      alias: 'tptest',
    });
    this.tpRate1 = server.create('tp-rate', {
      tpid: 'tptest',
      tag: 'ratetest1',
    });
    this.tpRate2 = server.create('tp-rate', {
      tpid: 'tptest',
      tag: 'ratetest2',
    });
    this.tpDestination1 = server.create('tp-destination', {
      tpid: 'tptest',
      tag: 'destinationtest1',
    });
    this.tpDestination2 = server.create('tp-destination', {
      tpid: 'tptest',
      tag: 'destinationtest2',
    });
    await authenticateSession({ email: 'user@example.com' });
  });

  describe('visit /tariff-plans/1/tp-destination-rates/new', () =>
    it('renders tp-destination-rate form', async function () {
      await visit('/tariff-plans/1/tp-destination-rates/new');
      expect(findAll('form input').length).to.eq(3);
      expect(findAll('form .ember-power-select-trigger').length).to.eq(4);
    }));

  describe('go away without save', () =>
    it('removes not saved tp-destination-rate', async function () {
      await visit('/tariff-plans/1/tp-destination-rates/new');
      await click('[data-test-destination-rates-link]');
      expect(findAll('table tbody tr').length).to.eq(0);
    }));

  describe('submit empty form', function () {
    beforeEach(async function () {
      await visit('/tariff-plans/1/tp-destination-rates/new');
      await click('[data-test-submit-button]');
    });
    it('displays tag error', async function () {
      expect(find('[data-test-tag] input')).to.have.class('is-invalid');
      expect(find('[data-test-tag] .invalid-feedback')).to.have.class(
        'd-block'
      );
    });
    it('displays tag error', async function () {
      expect(find('[data-test-tag] input')).to.have.class('is-invalid');
      expect(find('[data-test-tag] .invalid-feedback')).to.have.class(
        'd-block'
      );
    });
    it('displays rounding-decimals error', async function () {
      expect(find('[data-test-rounding-decimals] input')).to.have.class(
        'is-invalid'
      );
      expect(
        find('[data-test-rounding-decimals] .invalid-feedback')
      ).to.have.class('d-block');
    });
    it('displays max-cost error', async function () {
      expect(find('[data-test-max-cost] input')).to.have.class('is-invalid');
      expect(find('[data-test-max-cost] .invalid-feedback')).to.have.class(
        'd-block'
      );
    });
  });

  describe('fill form with correct data and submit', () =>
    it('saves new tp-destination-rate with correct data', async function () {
      let counter = 0;

      server.post('/tp-destination-rates/', function (schema, request) {
        counter = counter + 1;
        const params = JSON.parse(request.requestBody);
        expect(params.data.attributes['tpid']).to.eq('tptest');
        expect(params.data.attributes['tag']).to.eq('tagtest');
        expect(params.data.attributes['rates-tag']).to.eq('ratetest1');
        expect(params.data.attributes['destinations-tag']).to.eq(
          'destinationtest1'
        );
        expect(params.data.attributes['rounding-decimals']).to.eq(1);
        expect(params.data.attributes['max-cost']).to.eq(100.0);
        expect(params.data.attributes['rounding-method']).to.eq('*up');
        expect(params.data.attributes['max-cost-strategy']).to.eq('*free');
        return { data: { id: '1', type: 'tp-destination-rate' } };
      });

      await visit('/tariff-plans/1/tp-destination-rates/new');
      await fillIn('[data-test-tag] input', 'tagtest');
      await selectSearch('[data-test-tag="rates"]', 'ratetest');
      await selectChoose('[data-test-tag="rates"]', 'ratetest1');
      await selectSearch('[data-test-tag="destinations"]', 'destinationtest');
      await selectChoose('[data-test-tag="destinations"]', 'destinationtest1');
      await fillIn('[data-test-rounding-decimals] input', '1');
      await fillIn('[data-test-max-cost] input', '100.0');
      await selectChoose('[data-test-select="rounding-method"]', '*up');
      await selectChoose('[data-test-select="max-cost-strategy"]', '*free');
      await click('[data-test-submit-button]');
      expect(counter).to.eq(1);
    }));
});
