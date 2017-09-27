# jshint expr:true
import { describe, it } from 'mocha'
import { setupComponentTest } from 'ember-mocha'
import hbs from 'htmlbars-inline-precompile'
import { click, fillIn, find, findAll, keyEvent, triggerEvent } from 'ember-native-dom-helpers'

describe 'Integration: SortHeader', ->
  setupComponentTest 'sort-header', { integration: true }

  describe 'rendering', ->
    describe 'not a current column', ->
      it 'renders column name and no arrow', ->
        @render(hbs "{{sort-header label='Labeltest' key='keytest' sortColumn='other' sortOrder='asc'}}")
        expect(@$('a').text().trim()).to.eq 'Labeltest'
        expect(@$('i.material-icons')).to.have.length 0

    describe 'current column, ascending sorting', ->
      it 'renders column name and an upward arrow', ->
        @render(hbs "{{sort-header label='Labeltest' key='keytest' sortColumn='keytest' sortOrder='asc'}}")
        expect(@$('a').text().trim()).to.eq 'Labeltest'
        expect(@$('i.material-icons')).to.have.length 1
        expect(@$('i.material-icons').text().trim()).to.eq 'arrow_upward'

    describe 'current column, descending sorting', ->
      it 'renders column name and a downward arrow', ->
        @render(hbs "{{sort-header label='Labeltest' key='keytest' sortColumn='keytest' sortOrder='desc'}}")
        expect(@$('a').text().trim()).to.eq 'Labeltest'
        expect(@$('i.material-icons')).to.have.length 1
        expect(@$('i.material-icons').text().trim()).to.eq 'arrow_downward'

  describe 'clicking', ->
    describe 'not a current column', ->
      it 'sets column as current with ascending sorting', ->
        @set 'actionTriggered', false
        @set 'sortBy', (column, direction) ->
          @set 'actionTriggered', true
          expect(column).to.equal 'testkey'
          expect(direction).to.equal 'asc'
        @render(hbs "{{sort-header key='testkey' sortColumn='other' sortOrder='desc' sortAction=(action sortBy)}}")
        click 'a'
        expect(@get('actionTriggered')).to.be.ok

    describe 'current column, ascending sorting', ->
      it 'leaves column as current and sets descending sorting', ->
        @set 'actionTriggered', false
        @set 'sortBy', (column, direction) ->
          @set 'actionTriggered', true
          expect(column).to.equal 'testkey'
          expect(direction).to.equal 'desc'
        @render(hbs "{{sort-header key='testkey' sortColumn='testkey' sortOrder='asc' sortAction=(action sortBy)}}")
        click 'a'
        expect(@get('actionTriggered')).to.be.ok

    describe 'current column, descending sorting', ->
      it 'leaves column as current and sets ascending sorting', ->
        @set 'actionTriggered', false
        @set 'sortBy', (column, direction) ->
          @set 'actionTriggered', true
          expect(column).to.equal 'testkey'
          expect(direction).to.equal 'asc'
        @render(hbs "{{sort-header key='testkey' sortColumn='testkey' sortOrder='desc' sortAction=(action sortBy)}}")
        click 'a'
        expect(@get('actionTriggered')).to.be.ok
