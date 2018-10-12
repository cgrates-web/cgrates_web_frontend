import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { isBlank } from '@ember/utils';

export default Controller.extend({
  ajax:           service(),
  flashMessages:  service(),

  flushDB:  false,
  dryRun:   false,
  validate: false,

  actions: {
    upload() {
      const attrs = {
        "tpid":     this.get('model.alias'),
        "flush-db": this.get('flushDB'),
        "dry-run":  this.get('dryRun'),
        "validate": this.get('validate')
      };

      return this.get('ajax').post('/api/load-tariff-plan', {data: {data: {attributes: attrs}}}).then( res => {
        if (isBlank(res.error)) {
          return this.get('flashMessages').success('Tariff plan has been uploaded to CGrates');
        } else {
          return this.get('flashMessages').danger(`Error! ${res.error}`);
        }
      }).catch( () => this.get('flashMessages').danger('Something went wrong'));
    }
  }
});
