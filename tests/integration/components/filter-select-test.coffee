# jshint expr:true
import { describe, it } from 'mocha'
import { setupComponentTest } from 'ember-mocha'
import hbs from 'htmlbars-inline-precompile'
import { click, fillIn, find, findAll, keyEvent, triggerEvent } from 'ember-native-dom-helpers'
import { typeInSearch, clickTrigger, selectChoose } from 'cgrates-web-frontend/tests/helpers/ember-power-select'

describe 'Integration: FilterSelect', ->
  setupComponentTest 'filter-select', { integration: true }

  describe 'basic rendering', ->
    it 'renders select with options', ->
      @set 'value', 'test1'
      @set 'content', ['test1', 'test2']
      @render(hbs "{{filter-select label='Test' key='test' value=value content=content}}")
      expect(@$('.input-field .ember-power-select-trigger')).to.have.length 1
      expect(@$('label').text().trim()).to.eq 'Test'
      expect(@$('.ember-power-select-selected-item').text().trim()).to.eq 'test1'
      expect(@$('label').attr('for')).to.eq @$('.ember-power-select-trigger').attr('id')
      expect(@$('.ember-power-select-trigger').attr('id')).to.eq "#{@$('.input-field').attr('id')}-select"
      clickTrigger()
      expect($('.ember-power-select-options')).to.have.length 1
      expect($('.ember-power-select-option')).to.have.length 2
      expect($('.ember-power-select-option:nth-child(1)').text().trim()).to.eq 'test1'
      expect($('.ember-power-select-option:nth-child(2)').text().trim()).to.eq 'test2'

  describe 'selecting an item', ->
    it 'sends associated action', ->
      @set 'value', null
      @set 'content', ['test1', 'test2']
      @set 'actionCounter', 0
      @set 'pushValue', (key, value) ->
        @set 'actionCounter', @get('actionCounter') + 1
        expect(key).to.eq 'test'
        if(Ember.isEqual(@get('actionCounter'), 1))
          expect(value).to.eq null
        else
          expect(value).to.eq 'test1'
      @render(hbs "{{filter-select key='test' value=value onValueChange=(action pushValue) content=content}}")
      expect(@get('actionCounter')).to.eq 1
      clickTrigger()
      selectChoose('.ember-power-select-trigger', 'test1')
      expect(@get('actionCounter')).to.eq 2
