import { setupRenderingTest } from 'ember-mocha';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { describe, it, context, beforeEach } from 'mocha';
import { expect } from 'chai';
import hbs from 'htmlbars-inline-precompile';
import { selectSearch } from 'ember-power-select/test-support/helpers';
import { isEqual } from '@ember/utils';
import { find, click, render, findAll } from '@ember/test-helpers';
import EmberObject from '@ember/object';

describe('Integration: InputTags', function () {
  let hooks = setupRenderingTest();
  setupMirage(hooks);

  describe('basic rendering', function () {
    context('do not allow *any value', function () {
      beforeEach(async function () {
        this.set('model', EmberObject.create({ inputTag: 'test1' }));
        await render(hbs`('
          {{#bs-form model=model as |form|}}
            {{input-tags
              property='inputTag'
              form=form
              label='Test'
              class='test-class'
              dataTest='test'
            }}
          {{/bs-form}}
        ')`);
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
        expect(find('[data-test-tag="test"]')).to.have.class('test-class');
      });
    });

    context('allow *any value', () =>
      it('renders *any option', async function () {
        this.set('model', EmberObject.create({ inputTag: 'test1' }));
        await render(hbs`('
          {{#bs-form model=model as |form|}}
            {{input-tags
              property='inputTag'
              form=form
              allowAny=true
            }}
          {{/bs-form}}
        ')`);
        await click('.ember-power-select-trigger');
        expect(find('.ember-power-select-option').textContent.trim()).to.eq(
          '*any'
        );
      })
    );
  });

  return describe('searching for a tag', function () {
    context('do not allow *any value', () =>
      it('sends correct query to the server', async function () {
        let allClear = false;

        this.server.get('/tp-rates/', function (schema, request) {
          const tpid = request.queryParams['tpid'];
          const filter = request.queryParams['filter[tag]'];
          const sort = request.queryParams['sort'];
          if (
            isEqual(tpid, 'tptest') &&
            isEqual(filter, 'tagtest') &&
            isEqual(sort, 'tag')
          ) {
            allClear = true;
          }
          return { data: [{ id: '1', type: 'tp-rate' }] };
        });

        this.set('model', EmberObject.create({}));
        await render(hbs`('
          {{#bs-form model=model as |form|}}
            {{input-tags
              property='inputTag'
              form=form
              modelName='tp-rate' 
              tpid='tptest'
            }}
          {{/bs-form}}
        ')`);
        await selectSearch('.ember-power-select-trigger', 'tagtest');
        expect(allClear).to.eq(true);
      })
    );

    context('allow *any value', () =>
      it('displays *any along with results', async function () {
        this.server.get('/tp-rates/', () => ({
          data: [{ id: '1', type: 'tp-rate', attributes: { tag: 'test' } }],
        }));
        this.set('model', EmberObject.create({}));
        await render(hbs`('
          {{#bs-form model=model as |form|}}
            {{input-tags
              property='inputTag'
              form=form
              allowAny=true
              modelName='tp-rate' 
              tpid='tptest'
            }}
          {{/bs-form}}
        ')`);
        await selectSearch('.ember-power-select-trigger', 'tagtest');
        expect(
          findAll('.ember-power-select-options .ember-power-select-option')
            .length
        ).to.eq(2);
        expect(
          find(
            '.ember-power-select-options .ember-power-select-option:first-of-type'
          ).textContent.trim()
        ).to.eq('test');
        expect(
          find(
            '.ember-power-select-options .ember-power-select-option:last-of-type'
          ).textContent.trim()
        ).to.eq('*any');
      })
    );
  });
});
