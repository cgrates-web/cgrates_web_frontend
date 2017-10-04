# jshint expr:true
import Ember from 'ember'
import { describe, it } from 'mocha'
import { expect } from 'chai'
import { setupModelTest } from 'ember-mocha'

describe "Account", ->
  setupModelTest 'account', ->
    needs: []

  describe '#balance', ->
    it 'returns the sum of values', ->
      model = @subject()
      Ember.run ->
        model.set 'balanceMap', { '*monetary': [{ value: 10 }, { value: 20 }] }
        expect(model.get('balanceMonetaryValues')).to.deep.equal [10, 20]
        expect(model.get('balance')).to.equal 30
