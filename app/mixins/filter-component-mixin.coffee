import Ember from 'ember'

export default Ember.Mixin.create
  _onInit: Ember.on 'didReceiveAttrs', ->
    @set('valueWrapper', @get('value'))
    @sendAction 'onValueChange', @get('key'), @get('valueWrapper')

  valueChanged: Ember.observer 'valueWrapper', ->
    @sendAction 'onValueChange', @get('key'), @get('valueWrapper') if @get('value') != @get('valueWrapper')
