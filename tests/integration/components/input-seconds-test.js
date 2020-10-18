import { describe, it, beforeEach, context } from 'mocha';
import { expect } from 'chai';
import { setupRenderingTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import { find, fillIn, render } from '@ember/test-helpers';
import EmberObject from '@ember/object';

describe('Integration: InputSeconds', function () {
  setupRenderingTest();

  describe('basic rendering', function () {
    context('when value is empty', function () {
      beforeEach(async function () {
        this.set('value', null);
        await render(hbs`('
          {{#bs-form model=model as |form|}}
            {{input-seconds
              value=value
              form=form
              label="Test"
              class="test-class"
              dataTest="test"
            }}
          {{/bs-form}}
        ')`);
      });
      it('renders number input field', function () {
        expect(find('input[type="number"]')).to.exist;
      });
      it('value is empty', function () {
        expect(find('input[type="number"]').value).to.eq('');
      });
      it('renders label', function () {
        expect(find('label').textContent.trim()).to.eq('Test');
      });
      it('has correct class', function () {
        expect(find('[data-test-second="test"]')).to.have.class('test-class');
      });
    });
    context('when value is not empty', function () {
      it('displays value without suffix', async function () {
        this.set('value', '40s');
        await render(hbs`('
          {{#bs-form model=model as |form|}}
            {{input-seconds
              value=value
              form=form
            }}
          {{/bs-form}}
        ')`);
        expect(find('input[type="number"]').value).to.eq('40');
      });
    });
  });

  describe('entering a number', () =>
    it('appends suffix', async function () {
      this.set('value', null);
      this.set('model', EmberObject.create({ test: null }));
      await render(hbs`('
        {{#bs-form model=model as |form|}}
          {{input-seconds
            value=value
            form=form
            label="Test"
            property="test"
            class="test-class"
          }}
        {{/bs-form}}
      ')`);
      await fillIn('input', '60');
      expect(this.value).to.eq('60s');
    }));
});
