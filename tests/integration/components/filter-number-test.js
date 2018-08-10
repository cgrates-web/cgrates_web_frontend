import { describe, it } from 'mocha';
import { expect } from 'chai';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import { isEqual } from '@ember/utils';
import {  fillIn } from 'ember-native-dom-helpers';


describe('Integration: FilterNumber', function() {
  setupComponentTest('filter-number', { integration: true });

  describe('basic rendering', () =>
    it('renders number input field', function() {
      this.set('filterValue', null);
      this.render(hbs("{{filter-number label='Test' key='test' value=filterValue}}"));
      expect(this.$('input[type="number"]')).to.have.length(1);
      return expect(this.$('label').text().trim()).to.eq('Test');
    })
  );

  return describe('entering valid number', () =>
    it('sends associated action', function() {
      this.set('value', null);
      this.set('actionCounter', 0);
      this.set('pushValue', function(key, value) {
        this.set('actionCounter', this.get('actionCounter') + 1);
        expect(key).to.eq('test');
        if(isEqual(this.get('actionCounter'), 1)) {
          return expect(value).to.eq(null);
        } else {
          return expect(value).to.eq('0.01');
        }
      });
      this.render(hbs("{{filter-number label='Test' key='test' value=value onValueChange=(action pushValue) step='0.01'}}"));
      expect(this.get('actionCounter')).to.eq(1);
      fillIn('input', '0.01');
      return expect(this.get('actionCounter')).to.eq(2);
    })
  );
});
