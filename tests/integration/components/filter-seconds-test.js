import { describe, it } from 'mocha';
import { expect } from 'chai';
import { setupRenderingTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import { isEqual } from '@ember/utils';
import { fillIn, find, render } from '@ember/test-helpers';

describe('Integration: FilterSeconds', function () {
  setupRenderingTest();

  describe('basic rendering', () =>
    it('renders number input field', async function () {
      this.set('filterValue', null);
      await render(hbs("{{filter-seconds label='Test' key='test' value=filterValue}}"));
      expect(find('input')).to.exist;
      expect(find('label').textContent).to.eq('Test');
    })
  );

  return describe('entering valid number', () =>
    it('sends associated action', async function () {
      this.set('value', null);
      this.set('actionCounter', 0);
      this.set('pushValue', function (key, value) {
        this.set('actionCounter', this.get('actionCounter') + 1);
        expect(key).to.eq('test');
        if (isEqual(this.get('actionCounter'), 1)) {
          expect(value).to.eq(null);
        } else {
          expect(value).to.eq('60s');
        }
      });
      await render(hbs("{{filter-seconds label='Test' key='test' value=value onValueChange=(action pushValue) step='0.01'}}"));
      expect(this.get('actionCounter')).to.eq(1);
      await fillIn('input', '60');
      expect(this.get('actionCounter')).to.eq(2);
    })
  );
});
