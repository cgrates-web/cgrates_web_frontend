import config from 'cgrates-web-frontend/config/environment';
import AjaxService from 'ember-ajax/services/ajax';
import { inject as service } from '@ember/service';
import { path } from 'ramda';

const getAccessToken = path('data.authenticated.access_token');

export default class Ajax extends AjaxService {
  @service()
  session;

  host = config.API_HOST;

  get headers() {
    const headers = {
      Accept: 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
    };
    const token = getAccessToken(this.session);
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
  }
}
