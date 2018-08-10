import { describe, it } from 'mocha';
import { expect } from 'chai';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import {  fillIn, click } from 'ember-native-dom-helpers';

const testFilter = {
  type: 'filter-text',
  label: 'Test',
  key: 'test',
  value: ''
};

describe('Integration: FiltersBlock', function() {
  setupComponentTest('filters-block', { integration: true });

  describe('basic rendering', () =>
    it('renders a form', function() {
      this.render(hbs("{{filters-block}}"));
      expect(this.$('h5').text().trim()).to.eq('Filters');
      expect(this.$('form')).to.have.length(1);
      return expect(this.$('button')).to.have.length(2);
    })
  );

  describe('setting filter values and clicking search button', () =>
    it('sends action with correct arguments', function() {
      this.set('filterValue', '');
      this.set('actionTriggered', false);
      this.set('search', function(filters) {
        this.set('actionTriggered', true);
        return expect(filters).to.deep.equal({'test': 'valuetest'});
    });
      this.render(hbs(`\
        {{#filters-block search=(action search) as |block|}} \
        {{filter-text label='Test' key='test' value=filterValue onValueChange=(action 'pushValue' target=block)}} \
        {{/filters-block}}\
      `));
      fillIn('input', 'valuetest');
      click('button.search-button');
      return expect(this.get('actionTriggered')).to.be.ok;
    })
  );

  return describe('setting filter values and clicking reset button', () =>
    it('sends action and passes null values', function() {
      this.set('filter', testFilter);
      this.set('actionTriggered', false);
      this.set('search', function(filters) {
        this.set('actionTriggered', true);
        return expect(filters).to.deep.equal({'test': null});
    });
      this.render(hbs(`\
        {{#filters-block search=(action search) as |block|}} \
        {{filter-text label='Test' key='test' value=filterValue onValueChange=(action 'pushValue' target=block)}} \
        {{/filters-block}}\
      `));
      fillIn('input', 'valuetest');
      click('button.reset-button');
      return expect(this.get('actionTriggered')).to.be.ok;
    })
  );
});
