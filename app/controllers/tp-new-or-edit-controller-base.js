import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default class TpNewOrEditControllerBase extends Controller {
  @service flashMessages;

  @task(function* () {
    try {
      yield this.model.save();
      this.transitionToRoute(this.afterSaveRoute);
      this.flashMessages.success(
        `${this.model._internalModel.modelName} has been saved`
      );
    } catch (err) {
      this.flashMessages.danger('Something went wrong');
      throw err;
    }
  })
  save;
}
