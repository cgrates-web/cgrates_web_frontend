import { describe, it, context, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import { clickTrigger, typeInSearch } from 'cgrates-web-frontend/tests/helpers/ember-power-select';
import { startMirage } from 'cgrates-web-frontend/initializers/ember-cli-mirage';
import wait from 'ember-test-helpers/wait';
import { isEqual } from '@ember/utils';

describe('Integration: InputTags', function() {
  setupComponentTest('input-tags', { integration: true });

  beforeEach(function() {
    return this.server = startMirage();
  });

  afterEach(function() {
    return this.server.shutdown();
  });

  describe('basic rendering', function() {
    context('do not allow *any value', () =>
      it('renders select with options', function() {
        this.set('value', 'test1');
        this.set('errors', ['errortest']);
        this.render(hbs("{{input-tags value=value label='Test' errors=errors}}"));
        expect(this.$('.input-field .ember-power-select-trigger')).to.have.length(1);
        expect(this.$('label').text().trim()).to.eq('Test');
        expect(this.$('.ember-power-select-selected-item').text().trim()).to.eq('test1');
        expect(this.$('.error-message').text().trim()).to.eq('errortest');
        expect(this.$('label').attr('for')).to.eq(this.$('.ember-power-select-trigger').attr('id'));
        expect(this.$('.ember-power-select-trigger').attr('id')).to.eq(`${this.$('.input-field').attr('id')}-select`);
        clickTrigger();
        expect(this.$('.ember-power-select-options')).to.have.length(1);
        return expect(this.$('.ember-power-select-option--search-message')).to.have.length(1);
      })
    );

    return context('allow *any value', () =>
      it('renders *any option', function() {
        this.set('value', 'test1');
        this.set('errors', ['errortest']);
        this.render(hbs("{{input-tags value=value label='Test' errors=errors allowAny=true}}"));
        expect(this.$('.input-field .ember-power-select-trigger')).to.have.length(1);
        clickTrigger();
        expect(this.$('.ember-power-select-option--search-message')).to.have.length(0);
        expect(this.$('.ember-power-select-options .ember-power-select-option')).to.have.length(1);
        return expect(this.$('.ember-power-select-options .ember-power-select-option').text().trim()).to.eq('*any');
      })
    );
  });

  return describe('searching for a tag', function() {
    context('do not allow *any value', () =>
      it('sends correct query to the server', function() {
        let allClear = false;

        this.server.get('/tp-rates/', function(schema, request) {
          const tpid = request.queryParams['tpid'];
          const filter = request.queryParams['filter[tag]'];
          const sort = request.queryParams['sort'];
          if(isEqual(tpid, 'tptest') && isEqual(filter, 'tagtest') && isEqual(sort, 'tag')) {
            allClear = true;
          }
          return { data: [{id: '1', type: 'tp-rate'}] };
        });

        this.set('value', null);
        this.render(hbs("{{input-tags value=value label='Test' modelName='tp-rate' tpid='tptest'}}"));
        clickTrigger();
        typeInSearch('tagtest');
        return wait().then(() => expect(allClear).to.eq(true));
      })
    );

    return context('allow *any value', () =>
      it('displays *any along with results', function() {
        this.server.get('/tp-rates/', () => ({ data: [{id: '1', type: 'tp-rate', attributes: {tag: 'test'}}] }));

        this.set('value', null);
        this.render(hbs("{{input-tags value=value label='Test' modelName='tp-rate' tpid='tptest' allowAny=true}}"));
        clickTrigger();
        typeInSearch('tagtest');
        return wait().then(function() {
          expect(this.$('.ember-power-select-options .ember-power-select-option')).to.have.length(2);
          expect(this.$('.ember-power-select-options .ember-power-select-option:first-of-type').text().trim()).to.eq('test');
          return expect(this.$('.ember-power-select-options .ember-power-select-option:last-of-type').text().trim()).to.eq('*any');
        });
      })
    );
  });
});
