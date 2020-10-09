import Ember from 'ember';
import config from 'cgrates-web-frontend/config/environment';
import AjaxService from 'ember-ajax/services/ajax';

export default AjaxService.extend({
  session: Ember.inject.service(),

  host: config.API_HOST,

  headers: Ember.computed('session.data.authenticated.token', function () {
    let headers = {
      Accept: 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
    };
    const token = this.get('session.data.authenticated.token');
    if (!Ember.isBlank(token)) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }),
});
