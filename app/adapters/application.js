import DS from 'ember-data';
import config from 'cgrates-web-frontend/config/environment';
import TokenAuthorizerMixin from 'ember-simple-auth-token/mixins/token-authorizer';

export default DS.JSONAPIAdapter.extend(TokenAuthorizerMixin, {
  namespace: 'api',
  host: config.API_HOST,
});
