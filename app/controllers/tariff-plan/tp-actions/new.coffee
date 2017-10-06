import Ember from 'ember'

export default Ember.Controller.extend
  selectValues: Ember.inject.service()

  actions:
    save: ->
      @model.save().then => @transitionToRoute('tariff-plan.tp-actions')
