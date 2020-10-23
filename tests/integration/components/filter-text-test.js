import { describe, it } from 'mocha';
import { expect } from 'chai';
import { setupRenderingTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import { fillIn, find, render } from '@ember/test-helpers';

describe('Integration: FilterText', function () {
  setupRenderingTest();

  describe('basic rendering', () =>
    it('renders text input field', async function () {
      this.set('filterValue', null);
      await render(
        hbs("{{filter-text label='Test' key='test' value=filterValue}}")
      );
      expect(find('input[type="text"]')).to.exist;
      expect(find('label')).to.have.trimmed.text('Test');
    }));

  describe('typing into text input', () =>
    it('changes the value', async function () {
      this.set('filterValue', null);
      await render(
        hbs("{{filter-text label='Test' key='test' value=filterValue}}")
      );
      await fillIn('input', 'valuetest');
      expect(this.filterValue).to.eq('valuetest');
    }));
});
