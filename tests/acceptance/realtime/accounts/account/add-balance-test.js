import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';
import { setupApplicationTest } from 'ember-mocha';
import { authenticateSession } from 'ember-simple-auth/test-support';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { visit, click, find, findAll, fillIn } from '@ember/test-helpers';

describe("Acceptance: Account.AddBalance", function() {
  let hooks = setupApplicationTest();
  setupMirage(hooks);

  beforeEach(async function() {
    this.account = server.create('account', {id: 'test'});
    await authenticateSession({email: "user@eaxmple.com"});
  });

  describe('visit /realtime/accounts/:id/add-balance', () =>
    it('renders add balance form', async function() {
      await visit('/realtime/accounts/test/add-balance');
      expect(findAll('form input').length).to.eq(15);
    })
  );

  describe('submit empty form', function () {
    beforeEach(async function () {
      await visit('/realtime/accounts/test/add-balance');
      await click('[data-test-submit-button]');
    });
    it('displays balance-type error', async function () {
      expect(find('[data-test-balance-type] input')).to.have.class('is-invalid');
      expect(find('[data-test-balance-type] .invalid-feedback')).to.have.class('d-block');
    });
  });

  describe('fill form with correct data and submit', () =>
    it('submits correct data', async function() {
      let counter = 0;

      server.post('/add-balance/', function(schema, request) {
        counter = counter + 1;
        const params = JSON.parse(request.requestBody);
        expect(params.data.attributes['account']).to.eq('test');
        expect(params.data.attributes['balance-type']).to.eq('*monetary');
        expect(params.data.attributes['directions']).to.eq('*out');
        expect(params.data.attributes['value']).to.eq(100);
        expect(params.data.attributes['weight']).to.eq(10);
        expect(params.data.attributes['balance-uuid']).to.eq('11111111-2222-3333-4444-555555555555');
        expect(params.data.attributes['balance-id']).to.eq('balancetest');
        expect(params.data.attributes['expiry-time']).to.eq('0001-01-01T00:00:00Z');
        expect(params.data.attributes['rating-subject']).to.eq('ratingsubject');
        expect(params.data.attributes['categories']).to.eq('category1, category2');
        expect(params.data.attributes['destination-ids']).to.eq('destination1, destination2');
        expect(params.data.attributes['timing-ids']).to.eq('timing1, timing2');
        expect(params.data.attributes['shared-groups']).to.eq('group1, group2');
        expect(params.data.attributes['overwrite']).to.eq(false);
        expect(params.data.attributes['blocker']).to.eq(true);
        expect(params.data.attributes['disabled']).to.eq(true);
        return { data: {id: '1', type: 'add-balance'} };
      });

      await visit('/realtime/accounts/test/add-balance');
      await fillIn('[data-test-balance-type] input', '*monetary');
      await fillIn('[data-test-directions] input', '*out');
      await fillIn('[data-test-value] input', '100');
      await fillIn('[data-test-weight] input', '10');
      await fillIn('[data-test-balance-uuid] input', '11111111-2222-3333-4444-555555555555');
      await fillIn('[data-test-balance-id] input', 'balancetest');
      await fillIn('[data-test-expiry-time] input', '0001-01-01T00:00:00Z');
      await fillIn('[data-test-rating-subject] input', 'ratingsubject');
      await fillIn('[data-test-categories] input', 'category1, category2');
      await fillIn('[data-test-destination-ids] input', 'destination1, destination2');
      await fillIn('[ data-test-timing-ids] input', 'timing1, timing2');
      await fillIn('[data-test-shared-groups] input', 'group1, group2');
      await click('[data-test-overwrite] input');
      await click('[data-test-blocker] input');
      await click('[data-test-disabled] input');
      await click('[data-test-submit-button]');
      expect(counter).to.eq(1)
    })
  );
});
