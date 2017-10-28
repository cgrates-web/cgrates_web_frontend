import Ember from 'ember'

export default Ember.Controller.extend
  ajax:       Ember.inject.service()

  flushDB:  false
  dryRun:   false
  validate: false

  uploadIsSuccessful: Ember.computed.equal 'uploadStatus', 'success'
  uploadIsFailed:     Ember.computed.equal 'uploadStatus', 'error'

  refreshUploadStatus: ->
    @set 'uploadStatus', null
    @set 'uploadErrors', null

  actions:
    upload: ->
      attrs = {
        "tpid":     @get('model.alias')
        "flush-db": @get('flushDB')
        "dry-run":  @get('dryRun')
        "validate": @get('validate')
      }

      @get('ajax').post('/api/load-tariff-plan', data: {data: {attributes: attrs}}).then( (res) =>
        if Ember.isBlank(res.error)
          @set 'uploadStatus', 'success'
        else
          @set 'uploadStatus', 'error'
          @set 'uploadError', res.error
      ).catch( => @set 'uploadStatus', 'error')
