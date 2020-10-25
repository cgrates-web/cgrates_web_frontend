import { describe, it, beforeEach, context } from 'mocha';
import { expect } from 'chai';
import { setupRenderingTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import { find, click, render } from '@ember/test-helpers';

describe('Integration: Filter C=collapse button', function () {
  setupRenderingTest();

  describe('basic rendering', function () {
    beforeEach(async function () {
      this.set('collapsed', true);
      await render(hbs`('
          {{filter-collapse-btn
            label="Test"
            collapsed=collapsed
          }}
      ')`);
    });
    it('renders label', function () {
      expect(find('[data-test-label]').textContent.trim()).to.eq('Test');
    });
    it('renders down arrow icon', function () {
      expect(find('i.material-icons').textContent.trim()).to.eq(
        'arrow_drop_down'
      );
    });
    context('click on button', function () {
      it('change arrow icon', async function () {
        await click('.filter-collapse-btn');
        expect(find('i.material-icons').textContent.trim()).to.eq(
          'arrow_drop_up'
        );
      });
    });
  });
});
