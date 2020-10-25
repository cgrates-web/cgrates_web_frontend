import { describe, it, beforeEach, context } from 'mocha';
import { expect } from 'chai';
import { setupRenderingTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import { find, fillIn, render } from '@ember/test-helpers';
import { selectChoose } from 'ember-power-select/test-support/helpers';
import EmberObject from '@ember/object';

describe('Integration: InputInterval', function () {
  setupRenderingTest();

  const renderComponent = () =>
    render(hbs`('
      {{#bs-form model=model as |form|}}
        <InputInterval
          @value={{this.value}}
          @form={{form}}
          @label="Test"
          @class="test-class"
          @dataTest="test"
          @onChange={{fn (mut this.value)}}
        />
      {{/bs-form}}
    ')`);

  describe('basic rendering', function () {
    context('when value is empty', function () {
      beforeEach(async function () {
        this.set('value', null);
        await renderComponent();
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
        expect(find('[data-test-input-interval="test"]')).to.have.class(
          'test-class'
        );
      });
    });
    context('when value is not empty', function () {
      context('with seconds', function () {
        it('displays value without suffix', async function () {
          this.set('value', '40s');
          await renderComponent();
          expect(find('input[type="number"]').value).to.eq('40');
        });
      });
      context('with minutes', function () {
        it('displays value without suffix', async function () {
          this.set('value', '40m');
          await renderComponent();
          expect(find('input[type="number"]').value).to.eq('40');
        });
      });
      context('with hours', function () {
        it('displays value without suffix', async function () {
          this.set('value', '40h');
          await renderComponent();
          expect(find('input[type="number"]').value).to.eq('40');
        });
      });
      context('with other', function () {
        it('does not displays value', async function () {
          this.set('value', '40k');
          await renderComponent();
          expect(find('input[type="number"]').value).to.eq('');
        });
      });
    });
  });

  describe('entering a number', function () {
    beforeEach(async function () {
      this.set('value', null);
      this.set('model', EmberObject.create({ test: null }));
      await renderComponent();
      await fillIn('input', '60');
    });
    it('appends default suffix', async function () {
      expect(this.value).to.eq('60s');
    });
    context('select minutes interval', function () {
      it('appends m suffix', async function () {
        await selectChoose('[data-test-input-interval="test"]', 'm');
        expect(this.value).to.eq('60m');
      });
    });
    context('select hours interval', function () {
      it('appends h suffix', async function () {
        await selectChoose('[data-test-input-interval="test"]', 'h');
        expect(this.value).to.eq('60h');
      });
    });
  });
});
