import JSONAPIAdapter from '@ember-data/adapter/json-api';
import ENV from '../config/environment';
import { inject as service } from '@ember/service';

export default class ApplicationAdapter extends JSONAPIAdapter {
  @service session;

  namespace = 'api';
  host = ENV.API_HOST;

  get headers() {
    let headers = {};
    if (this.session.isAuthenticated) {
      // OAuth 2
      headers[
        'Authorization'
      ] = `Bearer ${this.session.data.authenticated.access_token}`;
    }

    return headers;
  }

  handleResponse(status) {
    if (status === 401 && this.session.isAuthenticated) {
      this.session.invalidate();
      window.location.href = '/login';
    }
    return super.handleResponse(...arguments);
  }
}
