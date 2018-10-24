import { describe, it } from 'mocha';
import { expect } from 'chai';
import { setupRenderingTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import { click, render } from '@ember/test-helpers';
import EmberObject from '@ember/object';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';

describe('Integration: Tp index buttons', function() {
  let hooks = setupRenderingTest();
  setupMirage(hooks);

  describe('click on download csv button', function() {
    it('makes correct query', async function() {
      this.tariffPlan = server.create('tariff-plan', {id: '1', alias: 'tptest'});
      let expectRequestToBeCorrect = () => expect(false).to.be.true;
      server.namespace = '/api';
      server.get('/tp-destinations/export-to-csv', (schema, request) => {
        expectRequestToBeCorrect = () => {
          expect(request.queryParams.tpid).to.eq('tptest');
          expect(request.queryParams['filter[filter1]']).to.eq('test1');
          expect(request.queryParams['filter[filter2]']).to.eq('test2');
        };
        return {result: 'OK'};
      });

      this.set('model', EmberObject.create({ modelName: 'tp-destination' }));
      this.set('tariffPlanId', this.tariffPlan.alias);
      this.set('permittedFilters', ['filter1', 'filter2']);
      this.set('controller', EmberObject.create({ filter1: 'test1', filter2: 'test2' }));
      await render(hbs`('
        {{tp-index-buttons
          model=model
          tariffPlanId=tariffPlanId
          permittedFilters=permittedFilters
          controller=controller
        }}
      ')`);
      await click('[data-test-download]');
      expectRequestToBeCorrect();
    })
  });

  describe('click on delete all button', function() {
    it('makes correct query', async function() {
      this.tariffPlan = server.create('tariff-plan', {id: '1', alias: 'tptest'});
      let expectRequestToBeCorrect = () => expect(false).to.be.true;
      server.namespace = '/api';
      server.post('/tp-destinations/delete-all', (schema, request) => {
        expectRequestToBeCorrect = () => {
          const params = JSON.parse(request.requestBody);
          expect(params.tpid).to.eq('tptest');
          expect(params.filter.filter1).to.eq('test1');
          expect(params.filter.filter2).to.eq('test2');
        };
        return {result: 'OK'};
      });

      this.set('model', EmberObject.create({ modelName: 'tp-destination' }));
      this.set('tariffPlanId', this.tariffPlan.alias);
      this.set('permittedFilters', ['filter1', 'filter2']);
      this.set('controller', EmberObject.create({ filter1: 'test1', filter2: 'test2' }));
      await render(hbs`('
        {{tp-index-buttons
          model=model
          tariffPlanId=tariffPlanId
          permittedFilters=permittedFilters
          controller=controller
        }}
      ')`);
      await click('[data-test-delete-all]');
      expectRequestToBeCorrect();
    })
  });

  describe('click on refresh button', function() {
    it('call refresh action', async function() {
      let refreshIsCalled = false;
      this.set('refresh', function () { refreshIsCalled = true; });
      await render(hbs`('
        {{tp-index-buttons
          refresh=refresh
        }}
      ')`);
      await click('[data-test-refresh]');
      expect(refreshIsCalled).to.be.true;
    })
  });
});
