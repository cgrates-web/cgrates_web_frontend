import { render } from '@ember/test-helpers';
import { expect } from 'chai';
import { describe, it, context } from 'mocha';
import { setupRenderingTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration: BsElementValidation', function () {
  setupRenderingTest();

  describe('rendering', function () {
    context('without params', function () {
      it('returned empty string', async function () {
        await render(hbs('{{bs-element-validation }}'));
        expect(this.element.textContent.trim()).to.equal('');
      });
    });
    context('set error param', function () {
      it('return is-invalid string', async function () {
        await render(hbs("{{bs-element-validation 'error'}}"));
        expect(this.element.textContent.trim()).to.equal('is-invalid');
      });
    });
    context('set success param', function () {
      it('return is-valid string', async function () {
        await render(hbs("{{bs-element-validation 'success'}}"));
        expect(this.element.textContent.trim()).to.equal('is-valid');
      });
    });
    context('set warning param', function () {
      it('return is-warning string', async function () {
        await render(hbs("{{bs-element-validation 'warning'}}"));
        expect(this.element.textContent.trim()).to.equal('is-warning');
      });
    });
  });
});
