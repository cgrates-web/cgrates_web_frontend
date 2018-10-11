import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';
import { setupApplicationTest } from 'ember-mocha';
import { authenticateSession } from 'ember-simple-auth/test-support';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { visit, click, fillIn } from '@ember/test-helpers';

describe("Acceptance: TpDestination.Edit", function() {
  let hooks = setupApplicationTest();
  setupMirage(hooks);

  beforeEach(async function() {
    this.tariffPlan = server.create('tariff-plan', {id: '1', name: 'Test', alias: 'tptest'});
    this.tpDestination = server.create('tp-destination', {id: '1', tpid: this.tariffPlan.alias});
    await authenticateSession({email: "user@example.com"});
  });

  describe('fill form with correct data and submit', () =>
    it('sends correct data to the backend', async function() {
      let counter = 0;

      server.patch('/tp-destinations/:id', (schema, request) => {
        counter = counter + 1;
        const params = JSON.parse(request.requestBody);
        expect(params.data.attributes.tpid).to.eq('tptest');
        expect(params.data.attributes.tag).to.eq('edited');
        expect(params.data.attributes.prefix).to.eq('+44');
        return { data: {id: this.tpDestination.id, type: 'tp-destination'} };
      });

      await visit('/tariff-plans/1/tp-destinations/1/edit');
      await fillIn('[data-test-tag] input', 'edited');
      await fillIn('[data-test-prefix] input', '+44');
      await click('[data-test-submit-button]');
      expect(counter).to.eq(1)
    })
  );
});
