import Ember from 'ember'

export default Ember.Controller.extend
  actions:
    save: ->
      file = document.getElementById('csv_import').files[0]
      @model.set('csv', file)
      @model.save()
