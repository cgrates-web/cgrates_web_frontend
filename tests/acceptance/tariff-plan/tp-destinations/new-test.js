import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';
import { setupApplicationTest } from 'ember-mocha';
import { authenticateSession } from 'ember-simple-auth/test-support';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { visit, find, findAll, click, fillIn } from '@ember/test-helpers';

describe('Acceptance: TpDestinations.New', function () {
  let hooks = setupApplicationTest();
  setupMirage(hooks);

  beforeEach(async function () {
    this.tariffPlan = server.create('tariff-plan', {ia: '1', name: 'Test', alias: 'tptest'});
    await authenticateSession({email: 'user@example.com'});
  });

  describe('visit /tariff-plans/1/tp-destinations/new', () =>
    it('renders tp-destination form', async function () {
      await visit('/tariff-plans/1/tp-destinations/new');
      expect(findAll('form input').length).to.eq(2);
    })
  );

  describe('go away without save', () =>
    it('removes not saved tp-destination', async  function () {
      await visit('/tariff-plans/1/tp-destinations/new');
      await click('[data-test-destinations-link]');
      expect(findAll('table tbody tr').length).to.eq(0);
    })
  );

  describe('submit empty form', function () {
    beforeEach(async function () {
      await visit('/tariff-plans/1/tp-destinations/new');
      await click('[data-test-submit-button]');
    });
    it('displays tag error', async function () {
      expect(find('[data-test-tag] input')).to.have.class('is-invalid');
      expect(find('[data-test-tag] .invalid-feedback')).to.have.class('d-block');
    });
    it('displays prefix error', async function () {
      expect(find('[data-test-prefix] input')).to.have.class('is-invalid');
      expect(find('[data-test-prefix] .invalid-feedback')).to.have.class('d-block');
    });
  });

  describe('fill form with correct data and submit', () =>
    it('saves new tp-destination with correct data', async function () {
      let counter = 0;

      server.post('/tp-destinations/', function (schema, request) {
        counter = counter + 1;
        const params = JSON.parse(request.requestBody);
        expect(params.data.attributes.tpid).to.eq('tptest');
        expect(params.data.attributes.tag).to.eq('tagtest');
        expect(params.data.attributes.prefix).to.eq('+44');
        return { data: {id: '1', type: 'tp-destination'} };
      });

      await visit('/tariff-plans/1/tp-destinations/new');
      await fillIn('[data-test-tag] input', 'tagtest');
      await fillIn('[data-test-prefix] input', '+44');
      await click('[data-test-submit-button]');
      expect(counter).to.eq(1);
    })
  );
});
