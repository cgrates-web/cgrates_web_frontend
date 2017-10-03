# jshint expr:true
import { describe, it } from 'mocha'
import { setupComponentTest } from 'ember-mocha'
import hbs from 'htmlbars-inline-precompile'
import { click, fillIn, find, findAll, keyEvent, triggerEvent } from 'ember-native-dom-helpers'
import { typeInSearch, clickTrigger, selectChoose } from 'cgrates-web-frontend/tests/helpers/ember-power-select'

describe 'Integration: InputSelect', ->
  setupComponentTest 'input-select', { integration: true }

  describe 'basic rendering', ->
    it 'renders select with options', ->
      @set 'value', 'test1'
      @set 'errors', ['errortest']
      @set 'content', ['test1', 'test2']
      @render(hbs "{{input-select value=value label='Test' errors=errors content=content}}")
      expect(@$('.input-field .ember-power-select-trigger')).to.have.length 1
      expect(@$('label').text().trim()).to.eq 'Test'
      expect(@$('.ember-power-select-selected-item').text().trim()).to.eq 'test1'
      expect(@$('.error-message').text().trim()).to.eq 'errortest'
      expect(@$('label').attr('for')).to.eq @$('.ember-power-select-trigger').attr('id')
      expect(@$('.ember-power-select-trigger').attr('id')).to.eq "#{@$('.input-field').attr('id')}-select"
      clickTrigger()
      expect($('.ember-power-select-options')).to.have.length 1
      expect($('.ember-power-select-option')).to.have.length 2
      expect($('.ember-power-select-option:nth-child(1)').text().trim()).to.eq 'test1'
      expect($('.ember-power-select-option:nth-child(2)').text().trim()).to.eq 'test2'

  describe 'selecting an item', ->
    it 'changes value', ->
      @set 'value', 'test1'
      @set 'content', ['test1', 'test2']
      @render(hbs "{{input-select value=value label='Test' content=content}}")
      clickTrigger()
      selectChoose('.ember-power-select-trigger', 'test2')
      expect(@get('value')).to.eq 'test2'
