import Ember from 'ember'

export default Ember.Controller.extend
  router: Ember.inject.service()

  actions:
    save: ->
      @model.save().then => @get('router').transitionTo('tariff-plans')
