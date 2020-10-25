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

describe('Acceptance: TpLcrRules.New', function () {
  let hooks = setupApplicationTest();
  setupMirage(hooks);

  beforeEach(async function () {
    this.tariffPlan = server.create('tariff-plan', {
      id: '1',
      name: 'Test',
      alias: 'tptest',
    });
    this.tpDestination1 = server.create('tp-destination', {
      tpid: this.tariffPlan.alias,
      tag: 'DST_1001',
    });
    this.tpDestination2 = server.create('tp-destination', {
      tpid: this.tariffPlan.alias,
      tag: 'DST_1002',
    });
    await authenticateSession({ email: 'user@example.com' });
  });

  describe('visit /tariff-plans/1/tp-lcr-rules/new', () =>
    it('renders tp-lcr-rule form', async function () {
      await visit('/tariff-plans/1/tp-lcr-rules/new');
      expect(findAll('form input').length).to.eq(8);
      expect(findAll('form .ember-power-select-trigger').length).to.eq(3);
    }));

  describe('go away without save', () =>
    it('removes not saved tp-lcr-rule', async function () {
      await visit('/tariff-plans/1/tp-lcr-rules/new');
      await click('[data-test-lcr-rules-link]');
      expect(findAll('table tbody tr').length).to.eq(0);
    }));

  describe('submit empty form', function () {
    beforeEach(async function () {
      await visit('/tariff-plans/1/tp-lcr-rules/new');
      await click('[data-test-submit-button]');
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
    it('displays account error', function () {
      expect(find('[data-test-account] input')).to.have.class('is-invalid');
      expect(find('[data-test-account] .invalid-feedback')).to.have.class(
        'd-block'
      );
    });
    it('displays subject error', function () {
      expect(find('[data-test-subject] input')).to.have.class('is-invalid');
      expect(find('[data-test-subject] .invalid-feedback')).to.have.class(
        'd-block'
      );
    });
    it('displays rp-category error', function () {
      expect(find('[data-test-rp-category] input')).to.have.class('is-invalid');
      expect(find('[data-test-rp-category] .invalid-feedback')).to.have.class(
        'd-block'
      );
    });
    it('does not displays strategy-params error', function () {
      expect(find('[data-test-strategy-params] input')).not.to.have.class(
        'is-invalid'
      );
      expect(find('[data-test-strategy-params] .invalid-feedback')).not.to
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
    it('displays weight error', function () {
      expect(find('[data-test-weight] input')).to.have.class('is-invalid');
      expect(find('[data-test-weight] .invalid-feedback')).to.have.class(
        'd-block'
      );
    });
  });

  describe('fill form with correct data and submit', () =>
    it('saves new tp-lcr-rule with correct data', async function () {
      let counter = 0;

      server.post('/tp-lcr-rules/', function (schema, request) {
        counter = counter + 1;
        const params = JSON.parse(request.requestBody);
        expect(params.data.attributes['tpid']).to.eq('tptest');
        expect(params.data.attributes['direction']).to.eq('*out');
        expect(params.data.attributes['tenant']).to.eq('cgrates.org');
        expect(params.data.attributes['category']).to.eq('call');
        expect(params.data.attributes['account']).to.eq('*any');
        expect(params.data.attributes['subject']).to.eq('*any');
        expect(params.data.attributes['destination-tag']).to.eq('DST_1001');
        expect(params.data.attributes['rp-category']).to.eq('lcr_profile1');
        expect(params.data.attributes['strategy']).to.eq('*qos');
        expect(params.data.attributes['strategy-params']).to.eq('');
        expect(params.data.attributes['activation-time']).to.eq(
          '2014-01-14T00:00:00Z'
        );
        expect(params.data.attributes['weight']).to.eq(10);
        return { data: { id: '1', type: 'tp-lcr-rule' } };
      });

      await visit('/tariff-plans/1/tp-lcr-rules/new');
      await selectChoose('[data-test-select="direction"]', '*out');
      await fillIn('[data-test-tenant] input', 'cgrates.org');
      await fillIn('[data-test-category] input', 'call');
      await fillIn('[data-test-account] input', '*any');
      await fillIn('[data-test-subject] input', '*any');
      await selectSearch('[data-test-tag="destination"]', '1001');
      await selectChoose('[data-test-tag="destination"]', 'DST_1001');
      await fillIn('[data-test-rp-category] input', 'lcr_profile1');
      await selectChoose('[data-test-select="strategy"]', '*qos');
      await fillIn('[data-test-strategy-params] input', '');
      await fillIn('[data-test-activation-time] input', '2014-01-14T00:00:00Z');
      await fillIn('[data-test-weight] input', '10');
      await click('[data-test-submit-button]');
      expect(counter).to.eq(1);
    }));
});
