import DS from 'ember-data'

export default DS.Model.extend
  tpid:               DS.attr 'string'
  tag:                DS.attr 'string'
  rateUnit:           DS.attr 'string'
  rateIncrement:      DS.attr 'string'
  rate:               DS.attr 'number'
  groupIntervalStart: DS.attr 'string'
  connectFee:         DS.attr 'number'
  createdAt:          DS.attr 'date'

  rateUnitNumber: Ember.computed 'rateUnit',
    get: (key) ->
      return null if Ember.isBlank(@get('rateUnit'))
      @get('rateUnit').replace(/s$/, '')
    set: (key, value) ->
      @set 'rateUnit', "#{value}s"
      value

  rateIncrementNumber: Ember.computed 'rateIncrement',
    get:(key) ->
      return null if Ember.isBlank(@get('rateIncrement'))
      @get('rateIncrement').replace(/s$/, '')
    set: (key, value) ->
      @set 'rateIncrement', "#{value}s"
      value

  gisNumber: Ember.computed 'groupIntervalStart',
    get: (key) ->
      return null if Ember.isBlank(@get('groupIntervalStart'))
      @get('groupIntervalStart').replace(/s$/, '')
    set: (key, value) ->
      @set 'groupIntervalStart', "#{value}s"
      value
