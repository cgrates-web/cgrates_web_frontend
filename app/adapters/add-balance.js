import Ember from 'ember';
import ApplicationAdapter from 'cgrates-web-frontend/adapters/application';

export default ApplicationAdapter.extend({
  pathForType: function (modelName) {
    return Ember.String.dasherize(modelName);
  }
});
