import { describe, it } from 'mocha';
import { expect } from 'chai';
import { setupRenderingTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import { find, fillIn, click, render } from '@ember/test-helpers';

const testFilter = {
  type: 'filter-text',
  label: 'Test',
  key: 'test',
  value: '',
};

describe('Integration: FiltersBlock', function () {
  setupRenderingTest();

  describe('basic rendering', () =>
    it('renders a form', async function () {
      await render(hbs('{{filters-block}}'));
      expect(find('h5')).to.have.trimmed.text('Filters');
      expect(find('form')).to.exist;
      expect(find('button')).to.exist;
    }));

  describe('setting filter values and clicking search button', () =>
    it('sends action with correct arguments', async function () {
      this.set('filterValue', '');
      this.set('actionTriggered', false);
      this.set('search', function (filters) {
        this.set('actionTriggered', true);
        return expect(filters).to.deep.equal({ test: 'valuetest' });
      });
      await render(hbs`(
        {{#filters-block search=(action search) as |block|}}
        {{filter-text label='Test' key='test' value=filterValue onValueChange=(action 'pushValue' target=block)}}
        {{/filters-block}}
      )`);
      await fillIn('input', 'valuetest');
      await click('[data-test-filter-search-btn]');
      expect(this.actionTriggered).to.be.ok;
    }));

  return describe('setting filter values and clicking reset button', () =>
    it('sends action and passes null values', async function () {
      this.set('filter', testFilter);
      this.set('actionTriggered', false);
      this.set('search', function (filters) {
        this.set('actionTriggered', true);
        expect(filters).to.deep.equal({ test: null });
      });
      await render(hbs`
        {{#filters-block search=(action search)}}
          {{filter-text
            label="Test"
            key="test"
            value=filterValue
          }}
        {{/filters-block}}
      `);
      await fillIn('input', 'valuetest');
      await click('[data-test-filter-reset-btn]');
      expect(this.actionTriggered).to.be.ok;
    }));
});
