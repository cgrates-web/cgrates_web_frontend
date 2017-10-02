import Ember from 'ember'

export default Ember.Mixin.create
  classNames: ['input-field']

  id: Ember.computed 'elementId', ->
    "#{@get('elementId')}-select"
