# jshint expr:true
import { describe, it } from 'mocha'
import { setupComponentTest } from 'ember-mocha'
import hbs from 'htmlbars-inline-precompile'
import { click, fillIn, find, findAll, keyEvent, triggerEvent } from 'ember-native-dom-helpers'

testFilter = {
  type: 'filter-text',
  label: 'Test',
  key: 'test',
  value: ''
}

describe 'Integration: FiltersBlock', ->
  setupComponentTest 'filters-block', { integration: true }

  describe 'basic rendering', ->
    it 'renders a form', ->
      @render(hbs "{{filters-block}}")
      expect(@$('h5').text().trim()).to.eq 'Filters'
      expect(@$('form')).to.have.length 1
      expect(@$('button')).to.have.length 2

  describe 'setting filter values and clicking search button', ->
    it 'sends action with correct arguments', ->
      @set 'filterValue', ''
      @set 'actionTriggered', false
      @set 'search', (filters) ->
        @set 'actionTriggered', true
        expect(filters).to.deep.equal {'test': 'valuetest'}
      @render(hbs "
        {{#filters-block search=(action search) as |block|}}
          {{filter-text label='Test' key='test' value=filterValue onValueChange=(action 'pushValue' target=block)}}
        {{/filters-block}}
      ")
      fillIn 'input', 'valuetest'
      click 'button.search-button'
      expect(@get('actionTriggered')).to.be.ok

  describe 'setting filter values and clicking reset button', ->
    it 'sends action and passes null values', ->
      @set 'filter', testFilter
      @set 'actionTriggered', false
      @set 'search', (filters) ->
        @set 'actionTriggered', true
        expect(filters).to.deep.equal {'test': null}
      @render(hbs "
        {{#filters-block search=(action search) as |block|}}
          {{filter-text label='Test' key='test' value=filterValue onValueChange=(action 'pushValue' target=block)}}
        {{/filters-block}}
      ")
      fillIn 'input', 'valuetest'
      click 'button.reset-button'
      expect(@get('actionTriggered')).to.be.ok
