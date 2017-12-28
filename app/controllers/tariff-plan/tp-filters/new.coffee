import Ember from 'ember'

export default Ember.Controller.extend
  actions:
    save: ->
      @model.save().then => @transitionToRoute('tariff-plan.tp-rates')
