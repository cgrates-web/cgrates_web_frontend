import Mixin from '@ember/object/mixin';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default Mixin.create({
  flashMessages: service(),

  save: task(function* () {
    try {
      yield this.model.save();
      this.transitionToRoute(this.afterSaveRoute);
      this.flashMessages.success(
        `${this.get('model._internalModel.modelName')} has been saved`
      );
    } catch (err) {
      this.flashMessages.danger('Something went wrong');
    }
  }),
});
