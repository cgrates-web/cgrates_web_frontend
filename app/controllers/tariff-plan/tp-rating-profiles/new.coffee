import Ember from 'ember'

export default Ember.Controller.extend
  directionList: ['IN', 'OUT']

  actions:
    save: ->
      @model.save().then => @transitionToRoute('tariff-plan.tp-rating-profiles')
