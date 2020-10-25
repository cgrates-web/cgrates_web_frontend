import { describe, it, beforeEach, context } from 'mocha';
import { expect } from 'chai';
import { setupRenderingTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import { find, findAll, render } from '@ember/test-helpers';
import {
  selectSearch,
  selectChoose,
} from 'ember-power-select/test-support/helpers';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';

describe('Integration: Filter select search to string', function () {
  const hooks = setupRenderingTest();
  setupMirage(hooks);

  describe('when multiple select', function () {
    context('render', function () {
      beforeEach(async function () {
        await render(hbs`
        {{filter-select-search-to-string
          label="Test label"
          key="testKey"
          value="test1,test2"
          searchModel="tp-action"
          searchField="tag"
          multiple=true
          tpid="tpid"
        }}
        `);
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
        expect(find('label').textContent.trim()).to.eq('Test label');
      });
    });
  });
  describe('when single select', function () {
    context('render', function () {
      beforeEach(async function () {
        await render(hbs`
        {{filter-select-search-to-string
          label="Test label"
          key="testKey"
          value="test1"
          searchModel="tp-action"
          searchField="tag"
          tpid="tpid"
        }}
      `);
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
    });
  });
  describe('search', function () {
    let expectRequestToBeCorrect;

    beforeEach(async function () {
      this.tariffPlan = server.create('tariff-plan', {
        id: '1',
        name: 'Test',
        alias: 'tptest',
      });
      server.create('tp-action', {
        tpid: this.tariffPlan.alias,
        tag: 'test_tag',
      });

      expectRequestToBeCorrect = () => expect(false).to.eq(true);
      server.get('/tp-actions', function (_schema, request) {
        expectRequestToBeCorrect = () => {
          expect(request.queryParams.tpid).to.eq('tptest');
          expect(request.queryParams['filter[tag]']).to.eq('test_tag');
        };

        return {
          data: [
            { id: '1', type: 'tp-action', attributes: { tag: 'test_tag' } },
          ],
        };
      });

      this.set('value', null);
      await render(hbs`
        {{filter-select-search-to-string
          label="Test label"
          key="testKey"
          value=value
          searchModel="tp-action"
          searchField="tag"
          multiple=true
          tpid="tptest"
        }}
      `);
      await selectSearch('.ember-power-select-trigger', 'test_tag');
    });
    it('makes correct query', async function () {
      expectRequestToBeCorrect();
    });
    it('sets value', async function () {
      await selectChoose('.ember-power-select-trigger', 'test_tag');
      expect(this.value).to.eq('test_tag');
    });
  });
});
