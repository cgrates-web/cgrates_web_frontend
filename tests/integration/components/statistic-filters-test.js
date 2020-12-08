import { expect } from 'chai';
import { describe, it, beforeEach } from 'mocha';
import { setupRenderingTest } from 'ember-mocha';
import { render, click, findAll } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import sinon from 'sinon';
import { selectChoose, clickTrigger } from 'ember-power-select/test-support/helpers';

describe('Integration | Component | statistic-filters', function () {
  setupRenderingTest();

  describe('render', function () {
    let onSubmit;
    beforeEach(async function () {
      onSubmit = sinon.stub();
      this.set('onSubmit', onSubmit)
      await render(hbs`<StatisticFilters @onSubmit={{this.onSubmit}} />`);
    });
    it('renders 3 elements in the "Group By" select', async function () {
      await clickTrigger('[data-test-select="group-by"]');
      expect(findAll('.ember-power-select-option')).to.have.length(3);
    });

    describe('change a filter and submit', function () {
      it('calls `onSubmit` function', async function () {
        await selectChoose('[data-test-select="group-by"]', 'weekly');
        await click('[data-test-submit-filters]');
        expect(onSubmit.calledWith({ group: 'weekly' })).to.eq(true);
      });
    });
  });
});
