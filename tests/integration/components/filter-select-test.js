import { describe, it } from 'mocha';
import { expect } from 'chai';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import { isEqual } from '@ember/utils';
import { clickTrigger, selectChoose } from 'cgrates-web-frontend/tests/helpers/ember-power-select';

describe('Integration: FilterSelect', function() {
  setupComponentTest('filter-select', { integration: true });

  describe('basic rendering', () =>
    it('renders select with options', function() {
      this.set('value', 'test1');
      this.set('content', ['test1', 'test2']);
      this.render(hbs("{{filter-select label='Test' key='test' value=value content=content}}"));
      expect(this.$('.input-field .ember-power-select-trigger')).to.have.length(1);
      expect(this.$('label').text().trim()).to.eq('Test');
      expect(this.$('.ember-power-select-selected-item').text().trim()).to.eq('test1');
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
    it('sends associated action', function() {
      this.set('value', null);
      this.set('content', ['test1', 'test2']);
      this.set('actionCounter', 0);
      this.set('pushValue', function(key, value) {
        this.set('actionCounter', this.get('actionCounter') + 1);
        expect(key).to.eq('test');
        if(isEqual(this.get('actionCounter'), 1)) {
          return expect(value).to.eq(null);
        } else {
          return expect(value).to.eq('test1');
        }
      });
      this.render(hbs("{{filter-select key='test' value=value onValueChange=(action pushValue) content=content}}"));
      expect(this.get('actionCounter')).to.eq(1);
      clickTrigger();
      selectChoose('.ember-power-select-trigger', 'test1');
      return expect(this.get('actionCounter')).to.eq(2);
    })
  );
});
