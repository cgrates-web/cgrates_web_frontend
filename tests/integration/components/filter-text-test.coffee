# jshint expr:true
import { describe, it } from 'mocha'
import { setupComponentTest } from 'ember-mocha'
import hbs from 'htmlbars-inline-precompile'
import { click, fillIn, find, findAll, keyEvent, triggerEvent } from 'ember-native-dom-helpers'


describe 'Integration: FilterText', ->
  setupComponentTest 'filter-text', { integration: true }

  describe 'basic rendering', ->
    it 'renders text input field', ->
      @set 'filterValue', ''
      @render(hbs "{{filter-text label='Test' key='test' value=filterValue}}")
      expect(@$('input[type="text"]')).to.have.length 1
      expect(@$('label').text().trim()).to.eq 'Test'

  describe 'typing into text input', ->
    it 'sends associated action', ->
      @set 'filterValue', ''
      @set 'actionCounter', 0
      @set 'pushValue', (key, value) ->
        expect(key).to.eq 'test'
        @set 'actionCounter', @get('actionCounter') + 1
      @render(hbs "{{filter-text label='Test' key='test' value=filterValue onValueChange=(action pushValue)}}")
      expect(@get('actionCounter')).to.eq 1
      fillIn 'input', 'valuetest'
      expect(@get('actionCounter')).to.eq 2
