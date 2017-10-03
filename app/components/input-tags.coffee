import Ember from 'ember'
import SelectComponentMixin from 'cgrates-web-frontend/mixins/select-component-mixin'
import { task, timeout } from 'ember-concurrency'

export default Ember.Component.extend SelectComponentMixin,
  store: Ember.inject.service()

  searchTask: task((searchTerm) ->
    yield timeout(300)
    @get('store').query(
      @get('modelName'), {tpid: @get('tpid'), filter: {tag: searchTerm}, sort: 'tag'}
    ).then (items) ->
      items.mapBy('tag').uniq()
  )
