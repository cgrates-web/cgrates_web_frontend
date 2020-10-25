import { describe, it, context } from 'mocha';
import { expect } from 'chai';
import { setupRenderingTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import { render, find } from '@ember/test-helpers';

describe('Integration: Loading button text', function () {
  setupRenderingTest();

  describe('rendering', function () {
    context('when isLoading == false', function () {
      it('displays text', async function () {
        await render(
          hbs("{{loading-button-text text='testText' isLoading=false}}")
        );
        expect(this.element.textContent.trim()).to.eq('testText');
      });
    });
    context('when isLoading == true', function () {
      it('add loading class', async function () {
        await render(
          hbs("{{loading-button-text text='testText' isLoading=true}}")
        );
        expect(find('.loading-button')).to.have.class('loading');
      });
    });
  });
});
