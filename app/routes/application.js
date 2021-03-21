import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ApplicationRoute extends Route {
  @service
  router;

  @service
  session;

  @service
  currentUser;

  beforeModel() {
    return this.currentUser.loadCurrentUser();
  }

  afterModel() {
    if (
      this.router.currentRouteName != 'login' &&
      !this.session.isAuthenticated
    ) {
      this.router.transitionTo('login');
    }
  }
}
