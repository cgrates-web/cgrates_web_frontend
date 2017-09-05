import DS from 'ember-data'
import Ember from 'ember'

export default DS.Model.extend
  prefixes: DS.attr()

  prefixesString: Ember.computed 'prefixes.length',
    get: ->
      return '' if Ember.isBlank(@get('prefixes'))
      @get('prefixes').join(', ')
    set: (key, value) ->
      @set 'prefixes', value.split(/\s*,\s*/)
