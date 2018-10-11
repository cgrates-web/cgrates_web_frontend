import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  identification: [
    validator('presence', true),
    validator('format', {
      type: 'email',
    }),
  ],
  password: validator('presence', true),

});
export default Controller.extend(Validations, {
  session:        service(),
  router:         service(),
  flashMessages:  service(),

  actions: {
    signIn() {
      return this.get('session').authenticate('authenticator:jwt', this.getProperties('identification', 'password')).then(() => {
        return this.get('router').transitionTo('realtime');
      }).catch(() => this.get('flashMessages').danger('Something went wrong'));
    }
  }
});
