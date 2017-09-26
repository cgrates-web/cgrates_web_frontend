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

describe 'Integration: FilterText', ->
  setupComponentTest 'filter-text', { integration: true }

  describe 'basic rendering', ->
    it 'renders text input field', ->
      @set 'filter', testFilter
      @render(hbs "{{filter-text filter=filter}}")
      expect(@$('input[type="text"]')).to.have.length 1
      expect(@$('label').text().trim()).to.eq 'Test'

  describe 'typing into text input', ->
    it 'sends associated action', ->
      @set 'filter', testFilter
      @set 'actionCounter', 0
      @set 'pushValue', (key, value) ->
        expect(key).to.eq 'test'
        @set 'actionCounter', @get('actionCounter') + 1
      @render(hbs "{{filter-text filter=filter onValueChange=(action pushValue)}}")
      # Triggered once on init
      expect(@get('actionCounter')).to.eq 1
      fillIn 'input', 'valuetest'
      expect(@get('actionCounter')).to.eq 2
