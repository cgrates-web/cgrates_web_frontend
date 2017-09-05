import DS from 'ember-data';
import config from 'cgrates-web-frontend/config/environment';

export default DS.JSONAPIAdapter.extend({
  namespace: 'api',
  host: config.API_HOST
});
