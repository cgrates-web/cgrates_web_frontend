import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';
import { setupRenderingTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import { find, click, render } from '@ember/test-helpers';
import { selectChoose } from 'ember-power-select/test-support/helpers';
import EmberObject from '@ember/object';

describe('Integration: InputSelect', function() {
  setupRenderingTest();

  describe('basic rendering', function () {
    beforeEach(async function () {
      this.set('content', ['test1', 'test2']);
      this.set('model', EmberObject.create({inputSelect: 'test1'}));
      await render(hbs`('
        {{#bs-form model=model as |form|}}
          {{input-select
            property='inputSelect'
            form=form
            label='Test'
            content=content
            class='test-class'
            dataTest='test'
          }}
        {{/bs-form}}
      ')`);
    });
    it('displays selected item', function () {
      expect(find('.ember-power-select-selected-item').textContent.trim()).to.eq('test1');
    });
    it('displays options', async function () {
      await click('.ember-power-select-trigger');
      expect(find('.ember-power-select-option:nth-child(1)').textContent.trim()).to.eq('test1');
      expect(find('.ember-power-select-option:nth-child(2)').textContent.trim()).to.eq('test2');
    });
    it('displays label', function () {
      expect(find('label').textContent.trim()).to.eq('Test');

    });
    it('has correct class', function () {
      expect(find('[data-test-select="test"]')).to.have.class('test-class');
    });
  });

  return describe('selecting an item', () =>
    it('changes value', async function() {
      this.set('content', ['test1', 'test2']);
      this.set('model', EmberObject.create({inputSelect: 'test1'}));
      await render(hbs`('
        {{#bs-form model=model as |form|}}
          {{input-select
            property='inputSelect'
            form=form
            label='Test'
            content=content
          }}
        {{/bs-form}}
      ')`);
      await selectChoose('.ember-power-select-trigger', 'test2');
      expect(this.get('model.inputSelect')).to.eq('test2');
    })
  );
});
