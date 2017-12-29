import Ember from 'ember'

export default Ember.Route.extend
  actions:
    willTransition: -> @currentModel.rollbackAttributes() if @currentModel.get('hasDirtyAttributes')
