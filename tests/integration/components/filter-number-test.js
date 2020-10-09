import { setupRenderingTest } from 'ember-mocha';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import hbs from 'htmlbars-inline-precompile';
import { isEqual } from '@ember/utils';
import { fillIn, find, render } from '@ember/test-helpers';

describe('Integration: FilterNumber', function () {
  setupRenderingTest();

  describe('basic rendering', () =>
    it('renders number input field', async function () {
      this.set('filterValue', null);
      await render(
        hbs("{{filter-number label='Test' key='test' value=filterValue}}")
      );
      expect(find('input')).to.exist;
      expect(find('label').textContent).to.eq('Test');
    }));

  return describe('entering valid number', () =>
    it('sends associated action', async function () {
      this.set('value', null);
      this.set('actionCounter', 0);
      this.set('pushValue', function (key, value) {
        this.set('actionCounter', this.actionCounter + 1);
        expect(key).to.eq('test');
        if (isEqual(this.actionCounter, 1)) {
          expect(value).to.eq(null);
        } else {
          expect(value).to.eq('0.01');
        }
      });
      await render(
        hbs(
          "{{filter-number label='Test' key='test' value=value onValueChange=(action pushValue) step='0.01'}}"
        )
      );
      expect(this.actionCounter).to.eq(1);
      await fillIn('input', '0.01');
      expect(this.actionCounter).to.eq(2);
    }));
});
