import Ember from 'ember';

export default Ember.Route.extend({
  router: Ember.inject.service(),
  beforeModel() { return this.get('router').transitionTo('realtime'); }
});
