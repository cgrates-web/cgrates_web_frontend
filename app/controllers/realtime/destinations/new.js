import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  router: service(),

  actions: {
    save() {
      return this.model
        .save()
        .then(() => this.router.transitionTo('realtime.destinations'));
    },
  },
});
