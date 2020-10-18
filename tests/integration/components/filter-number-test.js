import { setupRenderingTest } from 'ember-mocha';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import hbs from 'htmlbars-inline-precompile';
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
      expect(find('label')).to.have.trimmed.text('Test');
    }));

  describe('entering valid number', () =>
    it('changes the value', async function () {
      this.set('value', null);
      this.set('actionCounter', 0);
      await render(
        hbs(
          "{{filter-number label='Test' key='test' value=value step='0.01'}}"
        )
      );
      await fillIn('input', '0.01');
      expect(this.value).to.eq('0.01')
    }));
});
