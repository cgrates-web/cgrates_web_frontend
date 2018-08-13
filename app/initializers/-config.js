import fetch from 'ember-network/fetch';
import config from 'cgrates-web-frontend/config/environment';
import Configuration from 'ember-simple-auth-token/configuration';

export default ({
  name: 'config',
  after: 'ember-simple-auth-token',

  initialize(app) {
    if (config.environment === 'production') {
      const { host } = location;
      const { protocol } = location;

      app.deferReadiness();

      return fetch(`${protocol}//${host}/config.json`).then(res => res.json()).then(function(json){
        Object.keys(json).forEach(function(k) {
          if (json[k] != null) { return config[k] = json[k]; }
        });
        Configuration.serverTokenEndpoint = `${config.API_HOST}/sessions`;
        return app.advanceReadiness();
      });
    }
  }
});
