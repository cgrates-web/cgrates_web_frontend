# jshint expr:true
import { describe, it } from 'mocha'
import { setupComponentTest } from 'ember-mocha'
import hbs from 'htmlbars-inline-precompile'
import { click, fillIn, find, findAll, keyEvent, triggerEvent } from 'ember-native-dom-helpers'


describe 'Integration: FilterSeconds', ->
  setupComponentTest 'filter-seconds', { integration: true }

  describe 'basic rendering', ->
    it 'renders number input field', ->
      @set 'filterValue', null
      @render(hbs "{{filter-seconds label='Test' key='test' value=filterValue}}")
      expect(@$('input[type="number"]')).to.have.length 1
      expect(@$('label').text().trim()).to.eq 'Test'

  describe 'entering valid number', ->
    it 'sends associated action', ->
      @set 'value', null
      @set 'actionCounter', 0
      @set 'pushValue', (key, value) ->
        @set 'actionCounter', @get('actionCounter') + 1
        expect(key).to.eq 'test'
        if(Ember.isEqual(@get('actionCounter'), 1))
          expect(value).to.eq null
        else
          expect(value).to.eq '60s'
      @render(hbs "{{filter-seconds label='Test' key='test' value=value onValueChange=(action pushValue) step='0.01'}}")
      expect(@get('actionCounter')).to.eq 1
      fillIn 'input', '60'
      expect(@get('actionCounter')).to.eq 2
