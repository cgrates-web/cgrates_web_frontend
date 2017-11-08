# jshint expr:true
import { describe, it } from 'mocha'
import { setupComponentTest } from 'ember-mocha'
import hbs from 'htmlbars-inline-precompile'
import { click, fillIn, find, findAll, keyEvent, triggerEvent } from 'ember-native-dom-helpers'
import { typeInSearch, clickTrigger, selectChoose } from 'cgrates-web-frontend/tests/helpers/ember-power-select'
import { startMirage } from 'cgrates-web-frontend/initializers/ember-cli-mirage'
import wait from 'ember-test-helpers/wait'

describe 'Integration: InputTags', ->
  setupComponentTest 'input-tags', { integration: true }

  beforeEach ->
    @server = startMirage()

  afterEach ->
    @server.shutdown()

  describe 'basic rendering', ->
    context 'do not allow *any value', ->
      it 'renders select with options', ->
        @set 'value', 'test1'
        @set 'errors', ['errortest']
        @render(hbs "{{input-tags value=value label='Test' errors=errors}}")
        expect(@$('.input-field .ember-power-select-trigger')).to.have.length 1
        expect(@$('label').text().trim()).to.eq 'Test'
        expect(@$('.ember-power-select-selected-item').text().trim()).to.eq 'test1'
        expect(@$('.error-message').text().trim()).to.eq 'errortest'
        expect(@$('label').attr('for')).to.eq @$('.ember-power-select-trigger').attr('id')
        expect(@$('.ember-power-select-trigger').attr('id')).to.eq "#{@$('.input-field').attr('id')}-select"
        clickTrigger()
        expect($('.ember-power-select-options')).to.have.length 1
        expect($('.ember-power-select-option--search-message')).to.have.length 1

    context 'allow *any value', ->
      it 'renders *any option', ->
        @set 'value', 'test1'
        @set 'errors', ['errortest']
        @render(hbs "{{input-tags value=value label='Test' errors=errors allowAny=true}}")
        expect(@$('.input-field .ember-power-select-trigger')).to.have.length 1
        clickTrigger()
        expect($('.ember-power-select-option--search-message')).to.have.length 0
        expect($('.ember-power-select-options .ember-power-select-option')).to.have.length 1
        expect($('.ember-power-select-options .ember-power-select-option').text().trim()).to.eq '*any'

  describe 'searching for a tag', ->
    context 'do not allow *any value', ->
      it 'sends correct query to the server', ->
        allClear = false

        @server.get('/tp-rates/', (schema, request) ->
          tpid = request.queryParams['tpid']
          filter = request.queryParams['filter[tag]']
          sort = request.queryParams['sort']
          if(Ember.isEqual(tpid, 'tptest') && Ember.isEqual(filter, 'tagtest') && Ember.isEqual(sort, 'tag'))
            allClear = true
          return { data: [{id: '1', type: 'tp-rate'}] }
        )

        @set 'value', null
        @render(hbs "{{input-tags value=value label='Test' modelName='tp-rate' tpid='tptest'}}")
        clickTrigger()
        typeInSearch('tagtest')
        wait().then ->
          expect(allClear).to.eq true

    context 'allow *any value', ->
      it 'displays *any along with results', ->
        @server.get('/tp-rates/', (schema, request) ->
          return { data: [{id: '1', type: 'tp-rate', attributes: {tag: 'test'}}] }
        )

        @set 'value', null
        @render(hbs "{{input-tags value=value label='Test' modelName='tp-rate' tpid='tptest' allowAny=true}}")
        clickTrigger()
        typeInSearch('tagtest')
        wait().then ->
          expect($('.ember-power-select-options .ember-power-select-option')).to.have.length 2
          expect($('.ember-power-select-options .ember-power-select-option:first-of-type').text().trim()).to.eq 'test'
          expect($('.ember-power-select-options .ember-power-select-option:last-of-type').text().trim()).to.eq '*any'
