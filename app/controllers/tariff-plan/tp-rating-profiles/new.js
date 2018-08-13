import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  selectValues: service(),

  actions: {
    save() {
      return this.model.save().then(() => this.transitionToRoute('tariff-plan.tp-rating-profiles'));
    }
  }
});
