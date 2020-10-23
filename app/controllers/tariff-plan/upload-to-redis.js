import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { isBlank } from '@ember/utils';

export default Controller.extend({
  ajax: service(),
  flashMessages: service(),

  flushDB: false,
  dryRun: false,
  validate: false,

  actions: {
    upload() {
      const attrs = {
        tpid: this.model.alias,
        'flush-db': this.flushDB,
        'dry-run': this.dryRun,
        validate: this.validate,
      };

      return this.ajax
        .post('/api/load-tariff-plan', {
          data: { data: { attributes: attrs } },
        })
        .then((res) => {
          if (isBlank(res.error)) {
            return this.flashMessages.success(
              'Tariff plan has been uploaded to CGrates'
            );
          } else {
            return this.flashMessages.danger(`Error! ${res.error}`);
          }
        })
        .catch(() => this.flashMessages.danger('Something went wrong'));
    },
  },
});
