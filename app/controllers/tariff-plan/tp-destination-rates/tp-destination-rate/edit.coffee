import Ember from 'ember'

export default Ember.Controller.extend
  roundingMethodList:  ['*up', '*down', '*middle']
  maxCostStrategyList: ['*free', '*disconnect']

  actions:
    save: ->
      @model.save().then => @transitionToRoute('tariff-plan.tp-destination-rates')
