import Ember from 'ember'

export default Ember.Controller.extend
  session: Ember.inject.service()
  router: Ember.inject.service()

  actions:
    signIn: ->
      @get('session').authenticate('authenticator:jwt', @getProperties('identification', 'password')).then =>
        @get('router').transitionTo('realtime')
