import DS from 'ember-data';
import config from 'cgrates-web-frontend/config/environment';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

export default DS.JSONAPIAdapter.extend(DataAdapterMixin, {
  authorizer: 'authorizer:jwt',
  namespace: 'api',
  host: config.API_HOST
});
