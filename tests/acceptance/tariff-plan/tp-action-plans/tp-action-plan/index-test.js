import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';
import { setupApplicationTest } from 'ember-mocha';
import { authenticateSession } from 'ember-simple-auth/test-support';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { visit, click, find, currentURL } from '@ember/test-helpers';

describe("Acceptance: TpActionPlan.Index", function() {
  let hooks = setupApplicationTest();
  setupMirage(hooks);

  beforeEach(async function() {
    this.tariffPlan = server.create('tariff-plan', {id: '1', name: 'Test', alias: 'tptest'});
    this.tpActionPlan = server.create('tp-action-plan', {id: '1', tpid: this.tariffPlan.alias, tag: 'test'});
    await authenticateSession({email: "user@example.com"});
  });

  describe('visit TpActionPlan index page', function () {
    it('has correct url', async function () {
      await visit('/tariff-plans/1/tp-action-plans/1');
      expect(currentURL()).to.equal('/tariff-plans/1/tp-action-plans/1')
    });
    it('renders specific header', async function () {
      await visit('/tariff-plans/1/tp-action-plans/1');
      expect(find('main h2').textContent).to.eq('TpActionPlan: test');
    })
  });

  describe('click edit button', () =>
    it('redirects to tp-action-plan edit page', async function() {
      await visit('/tariff-plans/1/tp-action-plans/1');
      await click('[data-test-edit]');
      expect(currentURL()).to.eq('/tariff-plans/1/tp-action-plans/1/edit')
    })
  );
});
