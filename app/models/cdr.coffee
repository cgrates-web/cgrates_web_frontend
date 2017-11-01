import DS from 'ember-data'

export default DS.Model.extend
  cgrid:           DS.attr 'string'
  runId:           DS.attr 'string'
  originHost:      DS.attr 'string'
  source:          DS.attr 'string'
  originId:        DS.attr 'string'
  tor:             DS.attr 'string'
  requestType:     DS.attr 'string'
  direction:       DS.attr 'string'
  tenant:          DS.attr 'string'
  category:        DS.attr 'string'
  account:         DS.attr 'string'
  subject:         DS.attr 'string'
  destination:     DS.attr 'string'
  setupTime:       DS.attr 'date'
  pdd:             DS.attr 'number'
  answerTime:      DS.attr 'date'
  usage:           DS.attr 'number'
  supplier:        DS.attr 'string'
  disconnectCause: DS.attr 'string'
  extraFields:     DS.attr defaultValue: null
  costSource:      DS.attr 'string'
  cost:            DS.attr 'number'
  costDetails:     DS.attr defaultValue: null
  accountSummary:  DS.attr defaultValue: null
  extraInfo:       DS.attr defaultValue: null

  createdAt:       DS.attr 'date'
  updatedAt:       DS.attr 'date'
  deletedAt:       DS.attr 'date'

  extraFieldsObj: Ember.computed 'extraFields', ->
    JSON.parse(@get('extraFields')) if @get('extraFields')

  costDetailsObj: Ember.computed 'costDetails', ->
    JSON.parse(@get('costDetails')) if @get('costDetails')

  accountSummaryObj: Ember.computed 'accountSummary', ->
    JSON.parse(@get('accountSummary')) if @get('accountSummary')

  extraInfoObj: Ember.computed 'extraInfo', ->
    JSON.parse(@get('extraInfo')) if @get('extraInfo')
