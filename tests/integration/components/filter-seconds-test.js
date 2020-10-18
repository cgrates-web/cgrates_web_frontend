import { describe, it } from 'mocha';
import { expect } from 'chai';
import { setupRenderingTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import { fillIn, find, render } from '@ember/test-helpers';

describe('Integration: FilterSeconds', function () {
  setupRenderingTest();

  describe('basic rendering', () =>
    it('renders number input field', async function () {
      this.set('filterValue', null);
      await render(
        hbs("{{filter-seconds label='Test' key='test' value=filterValue}}")
      );
      expect(find('input')).to.exist;
      expect(find('label')).to.have.trimmed.text('Test');
    }));

  describe('entering valid number', function () {
    it('updates the value', async function () {
      this.set('value', null);
      await render(
        hbs(
          "{{filter-seconds label='Test' key='test' value=value step='0.01'}}"
        )
      );
      await fillIn('input', '60');
      expect(this.value).to.eq('60s');
    });
  });
});
