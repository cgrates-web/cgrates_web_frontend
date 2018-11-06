import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';
import { setupApplicationTest } from 'ember-mocha';
import { authenticateSession } from 'ember-simple-auth/test-support';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { visit, find, findAll, click, fillIn } from '@ember/test-helpers';

describe('Acceptance: TpSharedGroups.New', function () {
  let hooks = setupApplicationTest();
  setupMirage(hooks);
  beforeEach(async function () {
    this.tariffPlan = server.create('tariff-plan', { id: '1', name: 'Test', alias: 'tptest' });
    await authenticateSession({email: 'user@example.com'});
  });
  describe('visit /tariff-plans/1/tp-shared-groups/new', () =>
    it('renders tp-shared-group form', async function () {
      await visit('/tariff-plans/1/tp-shared-groups/new');
      expect(findAll('form input').length).to.eq(4);
    })
  );
  describe('go away without save', () =>
    it('removes not saved tp-shared-group', async  function () {
      await visit('/tariff-plans/1/tp-shared-groups/new');
      await click('[data-test-tp-shared-groups-link]');
      expect(findAll('table tbody tr').length).to.eq(0);
    })
  );
  describe('submit empty form', function () {
    beforeEach(async function () {
      await visit('/tariff-plans/1/tp-shared-groups/new');
      await click('[data-test-submit-button]');
    });
    it('displays tag error', async function () {
      expect(find('[data-test-tag] input')).to.have.class('is-invalid');
      expect(find('[data-test-tag] .invalid-feedback')).to.have.class('d-block');
    });
    it('displays account error', async function () {
      expect(find('[data-test-account] input')).to.have.class('is-invalid');
      expect(find('[data-test-account] .invalid-feedback')).to.have.class('d-block');
    });
    it('displays rating-subject error', async function () {
      expect(find('[data-test-rating-subject] input')).to.have.class('is-invalid');
      expect(find('[data-test-rating-subject] .invalid-feedback')).to.have.class('d-block');
    });
  });
  describe('fill form with correct data and submit', () =>
    it('sends correct data to the backend', async function () {
      let expectCorrectRequest = () => expect(true).to.be.false;
      server.post('/tp-shared-groups', function (schema, request) {
        expectCorrectRequest = () => {
          const params = JSON.parse(request.requestBody);
          expect(params.data.attributes['tpid']).to.eq('tptest');
          expect(params.data.attributes['tag']).to.eq('tag');
          expect(params.data.attributes['account']).to.eq('account');
          expect(params.data.attributes['strategy']).to.eq('strategy');
          expect(params.data.attributes['rating-subject']).to.eq('rating_subject');
        };
        return { data: {id: '1', type: 'tp-shared-group'} };
      });
      await visit('/tariff-plans/1/tp-shared-groups/new');
      await fillIn('[data-test-tag] input', 'tag');
      await fillIn('[data-test-account] input', 'account');
      await fillIn('[data-test-strategy] input', 'strategy');
      await fillIn('[data-test-rating-subject] input', 'rating_subject');
      await click('[data-test-submit-button]');
      expectCorrectRequest();
    })
  );
});
