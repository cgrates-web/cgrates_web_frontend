import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  session:  service(),
  router:   service(),

  actions: {
    signIn() {
      return this.get('session').authenticate('authenticator:jwt', this.getProperties('identification', 'password')).then(() => {
        return this.get('router').transitionTo('realtime');
      });
    }
  }
});
