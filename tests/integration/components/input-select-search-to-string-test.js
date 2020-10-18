import { describe, it, beforeEach, context } from 'mocha';
import { expect } from 'chai';
import { setupRenderingTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import { find, findAll, render } from '@ember/test-helpers';
import {
  selectSearch,
  selectChoose,
} from 'ember-power-select/test-support/helpers';
import EmberObject from '@ember/object';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';

describe('Integration: Input select search to string', function () {
  let hooks = setupRenderingTest();
  setupMirage(hooks);

  describe('when multiple select', function () {
    context('render', function () {
      beforeEach(async function () {
        this.set('model', EmberObject.create({ customId: 'test1, test2' }));
        await render(hbs`('
          {{#bs-form as |form|}}
            {{input-select-search-to-string
              searchField="customId"
              value=model.customId
              form=form
              label="Test"
              class="test-class"
              multiple=true
              dataTest="test"
            }}
          {{/bs-form}}
        ')`);
      });
      it('render multiple select', function () {
        expect(find('.ember-power-select-multiple-trigger')).to.exist;
      });
      it('has correct selected items count', function () {
        expect(
          findAll(
            '.ember-power-select-multiple-options .ember-power-select-multiple-option'
          ).length
        ).to.eq(2);
      });
      it('displays selected items', function () {
        expect(
          find(
            '.ember-power-select-multiple-options .ember-power-select-multiple-option:first-child'
          ).textContent.trim()
        ).to.contain('test1');
        expect(
          find(
            '.ember-power-select-multiple-options .ember-power-select-multiple-option:nth-child(2)'
          ).textContent.trim()
        ).to.contain('test2');
      });
      it('displays label', function () {
        expect(find('label').textContent.trim()).to.eq('Test');
      });
      it('has correct class', function () {
        expect(find('[data-test-select-search-to-str="test"]')).to.have.class(
          'test-class'
        );
      });
    });

    context('choose the value existing in the list', function () {
      it('remove selected value', async function () {
        let requestCount = 0;
        this.tariffPlan = server.create('tariff-plan', {
          id: '1',
          name: 'Test',
          alias: 'tptest',
        });
        server.create('tp-filter', {
          tpid: this.tariffPlan.alias,
          customId: 'test_id',
        });
        this.set('model', EmberObject.create({ customId: '' }));
        server.get('/tp-filters', function () {
          requestCount++;
          return {
            data: [
              {
                id: '1',
                type: 'tp-filter',
                attributes: { ['custom-id']: 'test_id' },
              },
            ],
          };
        });
        await render(hbs`('
          {{#bs-form as |form|}}
            {{input-select-search-to-string
              searchField="customId"
              searchModel="tp-filter"
              tpid="tptest"
              value=model.customId
              form=form
              multiple=true
              label="Test"
              class="test-class"
              dataTest="test"
            }}
          {{/bs-form}}
        ')`);
        await selectSearch(
          '[data-test-select-search-to-str="test"]',
          'test_id'
        );
        await selectChoose(
          '[data-test-select-search-to-str="test"]',
          'test_id'
        );
        expect(
          findAll(
            '.ember-power-select-multiple-options .ember-power-select-multiple-option'
          ).length
        ).to.eq(1);
        await selectSearch(
          '[data-test-select-search-to-str="test"]',
          'test_id'
        );
        await selectChoose(
          '[data-test-select-search-to-str="test"]',
          'test_id'
        );
        expect(requestCount).to.eq(2);
        expect(
          findAll(
            '.ember-power-select-multiple-options .ember-power-select-multiple-option'
          ).length
        ).to.eq(0);
      });
    });
  });
  describe('when single select', function () {
    context('render', function () {
      beforeEach(async function () {
        this.set('model', EmberObject.create({ customId: 'test1' }));
        await render(hbs`('
          {{#bs-form as |form|}}
            {{input-select-search-to-string
              searchField="customId"
              value=model.customId
              form=form
              label="Test"
              class="test-class"
              dataTest="test"
            }}
          {{/bs-form}}
        ')`);
      });
      it('render single select', function () {
        expect(find('.ember-power-select-trigger')).to.exist;
        expect(find('.ember-power-select-multiple-trigger')).not.to.exist;
      });
      it('displays selected item', function () {
        expect(
          find('.ember-power-select-selected-item').textContent.trim()
        ).to.eq('test1');
      });
      it('displays label', function () {
        expect(find('label').textContent.trim()).to.eq('Test');
      });
      it('has correct class', function () {
        expect(find('[data-test-select-search-to-str="test"]')).to.have.class(
          'test-class'
        );
      });
    });
  });
  describe('search', function () {
    it('makes correct query', async function () {
      this.tariffPlan = server.create('tariff-plan', {
        id: '1',
        name: 'Test',
        alias: 'tptest',
      });
      server.create('tp-filter', {
        tpid: this.tariffPlan.alias,
        customId: 'test_id',
      });
      this.set('model', EmberObject.create({ customId: '' }));

      let expectRequestToBeCorrect = () => expect(false).to.eq(true);
      server.get('/tp-filters', function (_schema, request) {
        expectRequestToBeCorrect = () => {
          expect(request.queryParams.tpid).to.eq('tptest');
          expect(request.queryParams['filter[custom_id]']).to.eq('test_id');
        };
        return { data: [{ id: '1', type: 'tp-filter' }] };
      });

      await render(hbs`('
          {{#bs-form as |form|}}
            {{input-select-search-to-string
              searchField="customId"
              searchModel="tp-filter"
              tpid="tptest"
              value=model.customId
              form=form
              label="Test"
              class="test-class"
              dataTest="test"
            }}
          {{/bs-form}}
       ')`);
      await selectSearch('[data-test-select-search-to-str="test"]', 'test_id');
      expectRequestToBeCorrect();
    });
  });
});
