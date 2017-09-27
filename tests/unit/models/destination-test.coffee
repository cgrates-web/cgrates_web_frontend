# jshint expr:true
import Ember from 'ember'
import { describe, it } from 'mocha'
import { expect } from 'chai'
import { setupModelTest } from 'ember-mocha'

describe "Destination", ->
  setupModelTest 'destination', ->
    needs: []

  describe '#prefixesString', ->
    describe 'get', ->
      it 'joins all prefixes', ->
        model = @subject()
        Ember.run ->
          model.set 'prefixes', ["+7", "+44"]
          expect(model.get('prefixesString', "+7, +44"))

    describe 'set', ->
      it 'sets prefixes array', ->
        model = @subject()
        Ember.run ->
          model.set 'prefixesString', '+77, +44,+7'
          expect(model.get('prefixes')).to.include('+77')
          expect(model.get('prefixes')).to.include('+44')
          expect(model.get('prefixes')).to.include('+7')
