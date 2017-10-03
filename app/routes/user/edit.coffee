import Ember from 'ember'

export default Ember.Route.extend
  model: -> @modelFor('user')

  actions:
    willTransition: -> @currentModel.rollbackAttributes() if @currentModel.get('hasDirtyAttributes')
