import DS from 'ember-data'

export default DS.Model.extend
  allowNegative:  DS.attr 'boolean', defaultValue: false
  disabled:       DS.attr 'boolean', defaultValue: false
  balanceMap:     DS.attr defaultValue: null
  unitCounters:   DS.attr defaultValue: null
  actionTriggers: DS.attr defaultValue: null

  balanceMonetaryValues: Ember.computed.mapBy 'balanceMap.*monetary', 'value'
  balance:               Ember.computed.sum 'balanceMonetaryValues'
