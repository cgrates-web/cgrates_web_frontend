# jshint expr:true
import Ember from 'ember'
import { describe, it } from 'mocha'
import { expect } from 'chai'
import { setupModelTest } from 'ember-mocha'

describe "TpRate", ->
  setupModelTest 'tp-rate', ->
    needs: []

  describe '#rateUnitNumber', ->
    describe 'get', ->
      it 'returns number without s', ->
        model = @subject()
        Ember.run ->
          model.set 'rateUnit', '60s'
          expect(model.get('rateUnitNumber')).to.equal '60'

    describe 'set', ->
      it 'sets string with s at the end', ->
        model = @subject()
        Ember.run ->
          model.set 'rateUnitNumber', 60
          expect(model.get('rateUnit')).to.equal '60s'

  describe '#rateIncrementNumber', ->
    describe 'get', ->
      it 'returns number without s', ->
        model = @subject()
        Ember.run ->
          model.set 'rateIncrement', '60s'
          expect(model.get('rateIncrementNumber')).to.equal '60'

    describe 'set', ->
      it 'sets string with s at the end', ->
        model = @subject()
        Ember.run ->
          model.set 'rateIncrementNumber', 60
          expect(model.get('rateIncrement')).to.equal '60s'

  describe '#gisNumber', ->
    describe 'get', ->
      it 'returns number without s', ->
        model = @subject()
        Ember.run ->
          model.set 'groupIntervalStart', '60s'
          expect(model.get('gisNumber')).to.equal '60'

    describe 'set', ->
      it 'sets string with s at the end', ->
        model = @subject()
        Ember.run ->
          model.set 'gisNumber', 60
          expect(model.get('groupIntervalStart')).to.equal '60s'
