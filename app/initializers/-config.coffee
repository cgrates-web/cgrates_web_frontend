import fetch from 'ember-network/fetch'
import config from 'cgrates-web-frontend/config/environment'
import Configuration from 'ember-simple-auth-token/configuration'

export default {
  name: 'config'
  after: 'ember-simple-auth-token'

  initialize: (app) ->
    if config.environment == 'development'
      host = location.host
      protocol = location.protocol

      app.deferReadiness()

      fetch("#{protocol}//#{host}/config.json").then((res) -> res.json()).then (json)->
        Object.keys(json).forEach (k) ->
          config[k] = json[k] if json[k]?
        Configuration.serverTokenEndpoint = "#{config.API_HOST}/sessions"
        app.advanceReadiness()
}
