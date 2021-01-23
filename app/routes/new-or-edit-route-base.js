import Route from '@ember/routing/route';
import { action } from '@ember/object';

export default class NewOrEditRouteBase extends Route {
  @action
  willTransition() {
    if (this.currentModel.hasDirtyAttributes) {
      return this.currentModel.rollbackAttributes();
    }
  }
}
