import config from 'cgrates-web-frontend/config/environment';
import fetch from 'fetch';

export default {
  name: 'config',
  initialize(app) {
    if (config.environment === 'production') {
      const { host } = location;
      const { protocol } = location;
      app.deferReadiness();
      return fetch(`${protocol}//${host}/config.json`)
        .then((res) => res.json())
        .then(function (json) {
          Object.keys(json).forEach(function (k) {
            if (json[k] != null) {
              return (config[k] = json[k]);
            }
          });
          return app.advanceReadiness();
        });
    }
  },
};
