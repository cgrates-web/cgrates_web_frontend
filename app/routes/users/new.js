import Route from '@ember/routing/route';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class NewUserRoute extends Route {
  @service
  currentUser;

  model() {
    const { tenant } = this.currentUser.user;
    return this.store.createRecord('user', { tenant });
  }

  @action
  willTransition() {
    if (this.currentModel.isNew) {
      return this.currentModel.destroyRecord();
    }
  }
}
