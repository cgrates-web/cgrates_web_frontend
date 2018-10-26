import { describe, it, context } from 'mocha';
import { expect } from 'chai';
import { setupRenderingTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import { render } from '@ember/test-helpers';

describe('Integration: Total records', function () {
  setupRenderingTest();

  describe('rendering', function () {
    context('when total records is exist', function () {
      it('displays total records', async function () {
        this.set('totalRecords', 40);
        await render(hbs('{{total-records totalRecords=totalRecords}}'));
        expect(this.element.textContent.trim()).to.eq('Total: 40');
      });
    });
    context('when total records is not exist', function () {
      it('does not displays total records count', async function () {
        await render(hbs('{{total-records}}'));
        expect(this.element.textContent.trim()).to.eq('Total:');
      });
    });
  });
});
