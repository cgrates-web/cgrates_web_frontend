import Ember from 'ember'
import SelectComponentMixin from 'cgrates-web-frontend/mixins/select-component-mixin'
import { task, timeout } from 'ember-concurrency'

export default Ember.Component.extend SelectComponentMixin,
  store: Ember.inject.service()

  allowAny: false

  anyIfAllowed: Ember.computed 'allowAny', ->
    if @get('allowAny') then ['*any'] else null

  searchTask: task((searchTerm) ->
    yield timeout(300)
    @get('store').query(
      @get('modelName'), {tpid: @get('tpid'), filter: {tag: searchTerm}, sort: 'tag'}
    ).then (items) =>
      result = items.mapBy('tag').uniq()
      result.push('*any') if @get('allowAny')
      result
  )
