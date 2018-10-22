import Component from '@ember/component';
import { computed } from '@ember/object';
import config from 'cgrates-web-frontend/config/environment';
import { inject as service } from '@ember/service';
import { isPresent } from '@ember/utils'

export default Component.extend({
  classNames: ['csv-uploader'],

  flashMessages:      service(),
  router:             service(),

  redirectAfterSave:  true,
  host:               config.API_HOST,

  exampleUrl: computed('parentModelName', function () {
    if (isPresent(this.get('parentModelName')))
      return `${this.get('host')}/csv-example/${this.get('parentModelName')}.csv`;
    return null;
  }),

  actions: {
    attachFile(file) {
      this.set('file', file.blob);
    },
    save() {
      const file = this.get('file');
      this.model.set('csv', file);
      this.model.save().then(() => {
        this.get('flashMessages').success('Import from CSV is starting');
        if (this.get('redirectAfterSave'))
          this.get('router').transitionTo(`tariff-plan.${this.get('parentModelName')}s.index`);
      }).catch(() => {
        this.get('flashMessages').danger('Somethings went wrong');
      })
    }
  }
});
