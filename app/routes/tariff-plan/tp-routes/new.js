import BaseRoute from '../../new-or-edit-route-base';

export default class NewTpRouteRoute extends BaseRoute {
  model() {
    return this.store.createRecord('tp-route', {
      tpid: this.modelFor('tariff-plan').alias,
    });
  }
}
