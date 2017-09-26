import Ember from 'ember'

export default Ember.Mixin.create
  valueChanged: Ember.on 'init', Ember.observer 'filter.value', ->
    Ember.run.once this, ->
      @sendAction 'onValueChange', @get('filter.key'), @get('filter.value')
