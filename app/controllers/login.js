import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { validator, buildValidations } from 'ember-cp-validations';
import { task } from 'ember-concurrency';

const Validations = buildValidations({
  email: [
    validator('presence', true),
    validator('format', {
      type: 'email',
    }),
  ],
  password: validator('presence', true),
});
export default class extends Controller.extend(Validations) {
  @service
  session;

  @service
  router;

  @service
  flashMessages;

  @service
  currentUser;

  @(task(function*() {
    try {
      yield this.session.authenticate('authenticator:oauth2', this.email, this.password);
      yield this.currentUser.loadCurrentUser();
      this.router.transitionTo('realtime');
    } catch (e) {
      this.flashMessages.danger('Something went wrong')
      throw e;
    }
  }).drop())
  signIn;
};
