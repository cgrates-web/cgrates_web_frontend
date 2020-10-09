import Component from '@ember/component';
import { computed } from '@ember/object';
import config from 'cgrates-web-frontend/config/environment';
import { inject as service } from '@ember/service';
import { isPresent } from '@ember/utils';
import { pluralize } from 'ember-inflector';

export default Component.extend({
  classNames: ['csv-uploader'],

  flashMessages: service(),
  router: service(),

  redirectAfterSave: true,
  host: config.API_HOST,

  exampleUrl: computed('host', 'parentModelName', function () {
    if (isPresent(this.parentModelName))
      return `${this.host}/csv-example/${this.parentModelName}.csv`;
    return null;
  }),

  actions: {
    attachFile(file) {
      this.set('file', file.blob);
    },
    save() {
      const file = this.file;
      this.model.set('csv', file);
      this.model
        .save()
        .then(() => {
          this.flashMessages.success('Import from CSV is starting');
          if (this.redirectAfterSave)
            this.router.transitionTo(
              `tariff-plan.${pluralize(this.parentModelName)}.index`
            );
        })
        .catch(() => {
          this.flashMessages.danger('Somethings went wrong');
        });
    },
  },
});
