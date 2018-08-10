import { describe, it } from 'mocha';
import { expect } from 'chai';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import { clickTrigger, selectChoose } from 'cgrates-web-frontend/tests/helpers/ember-power-select';

describe('Integration: InputSelect', function() {
  setupComponentTest('input-select', { integration: true });

  describe('basic rendering', () =>
    it('renders select with options', function() {
      this.set('value', 'test1');
      this.set('errors', ['errortest']);
      this.set('content', ['test1', 'test2']);
      this.render(hbs("{{input-select value=value label='Test' errors=errors content=content}}"));
      expect(this.$('.input-field .ember-power-select-trigger')).to.have.length(1);
      expect(this.$('label').text().trim()).to.eq('Test');
      expect(this.$('.ember-power-select-selected-item').text().trim()).to.eq('test1');
      expect(this.$('.error-message').text().trim()).to.eq('errortest');
      expect(this.$('label').attr('for')).to.eq(this.$('.ember-power-select-trigger').attr('id'));
      expect(this.$('.ember-power-select-trigger').attr('id')).to.eq(`${this.$('.input-field').attr('id')}-select`);
      clickTrigger();
      expect(this.$('.ember-power-select-options')).to.have.length(1);
      expect(this.$('.ember-power-select-option')).to.have.length(2);
      expect(this.$('.ember-power-select-option:nth-child(1)').text().trim()).to.eq('test1');
      return expect(this.$('.ember-power-select-option:nth-child(2)').text().trim()).to.eq('test2');
    })
  );

  return describe('selecting an item', () =>
    it('changes value', function() {
      this.set('value', 'test1');
      this.set('content', ['test1', 'test2']);
      this.render(hbs("{{input-select value=value label='Test' content=content}}"));
      clickTrigger();
      selectChoose('.ember-power-select-trigger', 'test2');
      return expect(this.get('value')).to.eq('test2');
    })
  );
});
