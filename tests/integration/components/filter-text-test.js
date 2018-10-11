import { describe, it } from 'mocha';
import { expect } from 'chai';
import { setupRenderingTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import { isEqual } from '@ember/utils';
import { fillIn, find, render } from '@ember/test-helpers';

describe('Integration: FilterText', function() {
  setupRenderingTest();

  describe('basic rendering', () =>
    it('renders text input field', async function() {
      this.set('filterValue', null);
      await render(hbs("{{filter-text label='Test' key='test' value=filterValue}}"));
      expect(find('input[type="text"]')).to.exist;
      expect(find('label').textContent).to.eq('Test');
    })
  );

  return describe('typing into text input', () =>
    it('sends associated action', async function() {
      this.set('filterValue', null);
      this.set('actionCounter', 0);
      this.set('pushValue', function(key, value) {
        this.set('actionCounter', this.get('actionCounter') + 1);
        expect(key).to.eq('test');
        if(isEqual(this.get('actionCounter'), 1)) {
          expect(value).to.eq(null);
        } else {
          expect(value).to.eq('valuetest');
        }
      });
      await render(hbs("{{filter-text label='Test' key='test' value=filterValue onValueChange=(action pushValue)}}"));
      expect(this.get('actionCounter')).to.eq(1);
      await fillIn('input', 'valuetest');
      expect(this.get('actionCounter')).to.eq(2);
    })
  );
});
