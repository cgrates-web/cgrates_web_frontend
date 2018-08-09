import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { equal } from '@ember/object/computed';
import { isBlank } from '@ember/utils';

export default Controller.extend({
  ajax:     service(),

  flushDB:  false,
  dryRun:   false,
  validate: false,

  uploadIsSuccessful: equal('uploadStatus', 'success'),
  uploadIsFailed:     equal('uploadStatus', 'error'),

  refreshUploadStatus() {
    this.set('uploadStatus', null);
    return this.set('uploadErrors', null);
  },

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
          return this.set('uploadStatus', 'success');
        } else {
          this.set('uploadStatus', 'error');
          return this.set('uploadError', res.error);
        }
      }).catch( () => this.set('uploadStatus', 'error'));
    }
  }
});
