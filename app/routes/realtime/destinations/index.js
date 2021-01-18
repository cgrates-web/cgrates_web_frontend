import Route from '@ember/routing/route';

export default class DestinationsRoute extends Route {
  model() {
    return this.store.findAll('destination');
  }
}
