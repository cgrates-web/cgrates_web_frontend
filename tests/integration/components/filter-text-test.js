import { describe, it } from 'mocha';
import { expect } from 'chai';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import { isEqual } from '@ember/utils';
import {  fillIn } from 'ember-native-dom-helpers';


describe('Integration: FilterText', function() {
  setupComponentTest('filter-text', { integration: true });

  describe('basic rendering', () =>
    it('renders text input field', function() {
      this.set('filterValue', null);
      this.render(hbs("{{filter-text label='Test' key='test' value=filterValue}}"));
      expect(this.$('input[type="text"]')).to.have.length(1);
      return expect(this.$('label').text().trim()).to.eq('Test');
    })
  );

  return describe('typing into text input', () =>
    it('sends associated action', function() {
      this.set('filterValue', null);
      this.set('actionCounter', 0);
      this.set('pushValue', function(key, value) {
        this.set('actionCounter', this.get('actionCounter') + 1);
        expect(key).to.eq('test');
        if(isEqual(this.get('actionCounter'), 1)) {
          return expect(value).to.eq(null);
        } else {
          return expect(value).to.eq('valuetest');
        }
      });
      this.render(hbs("{{filter-text label='Test' key='test' value=filterValue onValueChange=(action pushValue)}}"));
      expect(this.get('actionCounter')).to.eq(1);
      fillIn('input', 'valuetest');
      return expect(this.get('actionCounter')).to.eq(2);
    })
  );
});
