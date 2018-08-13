import { describe, it } from 'mocha';
import { expect } from 'chai';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import {  fillIn } from 'ember-native-dom-helpers';


describe('Integration: InputSeconds', function() {
  setupComponentTest('input-seconds', { integration: true });

  describe('basic rendering', () =>
    it('renders number input field', function() {
      this.set('value', null);
      this.render(hbs("{{input-seconds label='Test' valueWrapper=value}}"));
      expect(this.$('input[type="number"]')).to.have.length(1);
      return expect(this.$('label').text().trim()).to.eq('Test');
    })
  );

  return describe('entering a number', () =>
    it('appends suffix', function() {
      this.set('value', null);
      this.render(hbs("{{input-seconds label='Test' valueWrapper=value }}"));
      fillIn('input', '60');
      return expect(this.get('value')).to.eq('60s');
    })
  );
});
