import Ember from "ember"

export default Ember.Route.extend({
  router: Ember.inject.service(),
  session: Ember.inject.service(),

  afterModel() {
    if ((this.get('route.currentRouteName') != 'login') && (!this.get('session.isAuthenticated'))){
      this.get('router').transitionTo('login')
    }      
  }
})
