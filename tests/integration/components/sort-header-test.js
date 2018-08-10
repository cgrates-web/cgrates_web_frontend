import { describe, it } from 'mocha';
import { expect } from 'chai';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration: SortHeader', function() {
  setupComponentTest('sort-header', { integration: true });

  describe('rendering', function() {
    describe('not a current column', () =>
      it('renders column name and no arrow', function() {
        this.render(hbs("{{sort-header label='Labeltest' key='keytest' sortColumn='other' sortOrder='asc'}}"));
        expect(this.$('a').text().trim()).to.eq('Labeltest');
        return expect(this.$('i.material-icons')).to.have.length(0);
      })
    );

    describe('current column, ascending sorting', () =>
      it('renders column name and an upward arrow', function() {
        this.render(hbs("{{sort-header label='Labeltest' key='keytest' sortColumn='keytest' sortOrder='asc'}}"));
        expect(this.$('a').text().trim()).to.eq('Labeltest');
        expect(this.$('i.material-icons')).to.have.length(1);
        return expect(this.$('i.material-icons').text().trim()).to.eq('arrow_upward');
      })
    );

    return describe('current column, descending sorting', () =>
      it('renders column name and a downward arrow', function() {
        this.render(hbs("{{sort-header label='Labeltest' key='keytest' sortColumn='keytest' sortOrder='desc'}}"));
        expect(this.$('a').text().trim()).to.eq('Labeltest');
        expect(this.$('i.material-icons')).to.have.length(1);
        return expect(this.$('i.material-icons').text().trim()).to.eq('arrow_downward');
      })
    );
  });

  return describe('clicking', function() {
    describe('not a current column', () =>
      it('sets column as current with ascending sorting', function() {
        this.set('actionTriggered', false);
        this.set('sortBy', function(column, direction) {
          this.set('actionTriggered', true);
          expect(column).to.equal('testkey');
          return expect(direction).to.equal('asc');
        });
        this.render(hbs("{{sort-header key='testkey' sortColumn='other' sortOrder='desc' sortAction=(action sortBy)}}"));
        click('a');
        return expect(this.get('actionTriggered')).to.be.ok;
      })
    );

    describe('current column, ascending sorting', () =>
      it('leaves column as current and sets descending sorting', function() {
        this.set('actionTriggered', false);
        this.set('sortBy', function(column, direction) {
          this.set('actionTriggered', true);
          expect(column).to.equal('testkey');
          return expect(direction).to.equal('desc');
        });
        this.render(hbs("{{sort-header key='testkey' sortColumn='testkey' sortOrder='asc' sortAction=(action sortBy)}}"));
        click('a');
        return expect(this.get('actionTriggered')).to.be.ok;
      })
    );

    return describe('current column, descending sorting', () =>
      it('leaves column as current and sets ascending sorting', function() {
        this.set('actionTriggered', false);
        this.set('sortBy', function(column, direction) {
          this.set('actionTriggered', true);
          expect(column).to.equal('testkey');
          return expect(direction).to.equal('asc');
        });
        this.render(hbs("{{sort-header key='testkey' sortColumn='testkey' sortOrder='desc' sortAction=(action sortBy)}}"));
        click('a');
        return expect(this.get('actionTriggered')).to.be.ok;
      })
    );
  });
});
