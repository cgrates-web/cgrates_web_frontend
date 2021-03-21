import Service, { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class CurrentUserService extends Service {
  @tracked
  user = null;

  @service store;

  @service session;

  async loadCurrentUser() {
    if (this.session.isAuthenticated) {
      this.user = await this.store.findRecord(
        'user',
        this.session.data.authenticated.user_id,
        { include: 'tenant' }
      );
    }
  }
}
