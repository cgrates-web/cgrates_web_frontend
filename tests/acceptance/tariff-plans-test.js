import { describe, it, beforeEach, afterEach, context } from 'mocha';
import { expect } from 'chai';
import { setupApplicationTest } from 'ember-mocha';
import { authenticateSession } from 'ember-simple-auth/test-support';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { visit, find, findAll, click, currentURL } from '@ember/test-helpers';
import Mirage from 'ember-cli-mirage';

describe('Acceptance: TariffPlans', function () {
  let hooks = setupApplicationTest();
  setupMirage(hooks);

  beforeEach(async function () {
    await authenticateSession({email: 'user@exmple.com'});
  });

  describe('visit /tariff-plans', function () {
    it('renders list of tariff-plans cards', async function () {
      server.createList('tariff-plan', 5);
      await visit('/tariff-plans');
      expect(findAll('[data-test-tarif-plan-card]').length).to.eq(5);
    });
    it('displays tp-plan name', async function () {
      this.tpPlan = server.create('tariff-plan');
      await visit('/tariff-plans');
      expect(find('[data-test-tarif-plan-card] .card-header').textContent).to.eq(this.tpPlan.name);
    });
    it('displays tp-plan description', async function () {
      this.tpPlan = server.create('tariff-plan');
      await visit('/tariff-plans');
      expect(find('[data-test-tarif-plan-card] .card-text').textContent.trim()).to.eq(this.tpPlan.description);
    });
  });

  describe('select tariff plan', () =>
    it('reditects to tariff plan page', async function () {
      this.tpPlan = server.create('tariff-plan');
      await visit('/tariff-plans');
      await click('[data-test-tarif-plan-card] [data-test-select-tp-plan]');
      expect(currentURL()).to.eq(`/tariff-plans/${this.tpPlan.id}`);
    })
  );

  describe('click to edit button', () =>
    it('reditects to edit tariff plan page', async function () {
      this.tpPlan = server.create('tariff-plan');
      await visit('/tariff-plans');
      await click('[data-test-tarif-plan-card] [data-test-edit-tp-plan]');
      expect(currentURL()).to.equal(`/tariff-plans/${this.tpPlan.id}/edit`);
    })
  );

  describe('click to add button', () =>
    it('redirects to tariff-plans/new page', async function () {
      this.tpPlan = server.create('tariff-plan');
      await visit('/tariff-plans');
      await click('[data-test-add-tp-plan]');
      expect(currentURL()).to.equal('/tariff-plans/new');
    })
  );

  describe('click to remove button', function () {
    const standardConfirmDialog = window.confirm;
    beforeEach(function () {
      window.confirm = function () {
        return true;
      };
    });
    afterEach(function () {
      window.confirm = standardConfirmDialog;
    });
    context('when server return ok', function () {
      let expectCorrectRequest;
      beforeEach(async function () {
        this.tpPlan = server.create('tariff-plan', {id: '1'});
        expectCorrectRequest = () => expect(true).to.be.false;
        server.delete('/tariff-plans/:id', (schema, request) => {
          expectCorrectRequest = () => {
            expect(request.params.id).to.eq(this.tpPlan.id);
          };
          return '';
        });
        await visit('/tariff-plans');
        await click('[data-test-tarif-plan-card] [data-test-tp-remove]');
      });

      it('makes correct query', function () {
        expectCorrectRequest();
      });
      it('remove tariff plan', function () {
        expect(findAll('[data-test-tarif-plan-card]').length).to.eq(0);
      });
      it('shows success flash messages', function () {
        expect(find('.flash-message.alert-success')).to.exist;
      });
    });
    context('when server return with error', function () {
      beforeEach(async function () {
        this.tpPlan = server.create('tariff-plan', {id: '1'});
        server.delete('/tariff-plans/:id', () => {
          return new Mirage.Response(200);
        });
        await visit('/tariff-plans');
        await click('[data-test-tarif-plan-card] [data-test-tp-remove]');
      });
      it('dies not remove tariff plan', function () {
        expect(findAll('[data-test-tarif-plan-card]').length).to.eq(1);
      });
      it('shows danger flash messages', function () {
        expect(find('.flash-message.alert-danger')).to.exist;
      });
    });
  });
});
