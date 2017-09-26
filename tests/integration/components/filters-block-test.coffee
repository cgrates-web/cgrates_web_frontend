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

  describe 'clicking search button', ->
    it 'sends associated action', ->
      @set 'actionTriggered', false
      @set 'search', ->
        @set 'actionTriggered', true
      @render(hbs "{{filters-block search=(action search)}}")
      click 'button[type="submit"]'
      expect(@get('actionTriggered')).to.be.ok

  describe 'setting filter values and clicking search button', ->
    it 'sends action with correct arguments', ->
      @set 'filter', testFilter
      @set 'actionTriggered', false
      @set 'search', (filters) ->
        @set 'actionTriggered', true
        expect(filters).to.deep.equal {'test': 'valuetest'}
      @render(hbs "
        {{#filters-block search=(action search)}}
          {{filter-text filter=filter}}
        {{/filters-block}}
      ")
      fillIn 'input', 'valuetest'
      click 'button.search-button'
      expect(@get('actionTriggered')).to.be.ok
