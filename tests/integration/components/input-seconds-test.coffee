# jshint expr:true
import { describe, it } from 'mocha'
import { setupComponentTest } from 'ember-mocha'
import hbs from 'htmlbars-inline-precompile'
import { click, fillIn, find, findAll, keyEvent, triggerEvent } from 'ember-native-dom-helpers'


describe 'Integration: InputSeconds', ->
  setupComponentTest 'input-seconds', { integration: true }

  describe 'basic rendering', ->
    it 'renders number input field', ->
      @set 'value', null
      @render(hbs "{{input-seconds label='Test' valueWrapper=value}}")
      expect(@$('input[type="number"]')).to.have.length 1
      expect(@$('label').text().trim()).to.eq 'Test'

  describe 'entering a number', ->
    it 'appends suffix', ->
      @set 'value', null
      @render(hbs "{{input-seconds label='Test' valueWrapper=value }}")
      fillIn 'input', '60'
      expect(@get('value')).to.eq '60s'
