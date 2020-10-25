import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ApplicationRoute extends Route {
  @service
  router;

  @service
  session;

  afterModel() {
    if (
      this.router.currentRouteName != 'login' &&
      !this.session.isAuthenticated
    ) {
      this.router.transitionTo('login');
    }
  }
}
