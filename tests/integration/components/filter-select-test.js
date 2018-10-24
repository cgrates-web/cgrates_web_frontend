import { describe, it } from 'mocha';
import { expect } from 'chai';
import { setupRenderingTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import { isEqual } from '@ember/utils';
import { selectChoose } from 'ember-power-select/test-support/helpers';
import { find, click, render } from '@ember/test-helpers';

describe('Integration: FilterSelect', function () {
  setupRenderingTest();

  describe('basic rendering', () =>
    it('renders select with options', async function () {
      this.set('value', 'test1');
      this.set('content', ['test1', 'test2']);
      await render(hbs("{{filter-select label='Test' key='test' value=value content=content}}"));
      expect(find('label').textContent).to.eq('Test');
      expect(find('.ember-power-select-selected-item').textContent.trim()).to.eq('test1');
      await click('.ember-power-select-trigger');
      expect(find('.ember-power-select-option:nth-child(1)').textContent.trim()).to.eq('test1');
      expect(find('.ember-power-select-option:nth-child(2)').textContent.trim()).to.eq('test2');
    })
  );

  return describe('selecting an item', () =>
    it('sends associated action', async function () {
      this.set('value', null);
      this.set('content', ['test1', 'test2']);
      this.set('actionCounter', 0);
      this.set('pushValue', function (key, value) {
        this.set('actionCounter', this.get('actionCounter') + 1);
        expect(key).to.eq('test');
        if (isEqual(this.get('actionCounter'), 1)) {
          expect(value).to.eq(null);
        } else {
          expect(value).to.eq('test1');
        }
      });
      await render(hbs("{{filter-select key='test' value=value onValueChange=(action pushValue) content=content}}"));
      expect(this.get('actionCounter')).to.eq(1);
      await selectChoose('.ember-power-select-trigger', 'test1');
      expect(this.get('actionCounter')).to.eq(2);
    })
  );
});
