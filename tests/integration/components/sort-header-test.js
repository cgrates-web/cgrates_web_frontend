import { describe, it } from 'mocha';
import { expect } from 'chai';
import { setupRenderingTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import { click, render, find } from '@ember/test-helpers';

describe('Integration: SortHeader', function () {
  setupRenderingTest();

  describe('rendering', function () {
    describe('not a current column', () =>
      it('renders column name and no arrow', async function () {
        await render(
          hbs(
            "{{sort-header label='Labeltest' key='keytest' sortColumn='other' sortOrder='asc'}}"
          )
        );
        expect(find('a').textContent.trim()).to.eq('Labeltest');
        expect(find('i.material-icons')).not.to.exist;
      }));

    describe('current column, ascending sorting', () =>
      it('renders column name and an upward arrow', async function () {
        await render(
          hbs(
            "{{sort-header label='Labeltest' key='keytest' sortColumn='keytest' sortOrder='asc'}}"
          )
        );
        expect(find('a').textContent.trim()).to.eq('Labeltest');
        expect(find('i.material-icons').textContent.trim()).to.eq(
          'arrow_upward'
        );
      }));

    describe('current column, descending sorting', () =>
      it('renders column name and a downward arrow', async function () {
        await render(
          hbs(
            "{{sort-header label='Labeltest' key='keytest' sortColumn='keytest' sortOrder='desc'}}"
          )
        );
        expect(find('a').textContent.trim()).to.eq('Labeltest');
        expect(find('i.material-icons').textContent.trim()).to.eq(
          'arrow_downward'
        );
      }));
  });

  describe('clicking', function () {
    describe('not a current column', () =>
      it('sets column as current with ascending sorting', async function () {
        this.set('actionTriggered', false);
        this.set('sortBy', function (column, direction) {
          this.set('actionTriggered', true);
          expect(column).to.equal('testkey');
          expect(direction).to.equal('asc');
        });
        await render(
          hbs(
            "{{sort-header key='testkey' sortColumn='other' sortOrder='desc' sortAction=(action sortBy)}}"
          )
        );
        await click('a');
        expect(this.actionTriggered).to.be.true;
      }));

    describe('current column, ascending sorting', () =>
      it('leaves column as current and sets descending sorting', async function () {
        this.set('actionTriggered', false);
        this.set('sortBy', function (column, direction) {
          this.set('actionTriggered', true);
          expect(column).to.equal('testkey');
          expect(direction).to.equal('desc');
        });
        await render(
          hbs(
            "{{sort-header key='testkey' sortColumn='testkey' sortOrder='asc' sortAction=(action sortBy)}}"
          )
        );
        await click('a');
        expect(this.actionTriggered).to.be.true;
      }));

    describe('current column, descending sorting', () =>
      it('leaves column as current and sets ascending sorting', async function () {
        this.set('actionTriggered', false);
        this.set('sortBy', function (column, direction) {
          this.set('actionTriggered', true);
          expect(column).to.equal('testkey');
          expect(direction).to.equal('asc');
        });
        await render(
          hbs(
            "{{sort-header key='testkey' sortColumn='testkey' sortOrder='desc' sortAction=(action sortBy)}}"
          )
        );
        await click('a');
        expect(this.actionTriggered).to.be.true;
      }));
  });
});
