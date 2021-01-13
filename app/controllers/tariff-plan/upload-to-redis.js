import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { isBlank } from '@ember/utils';
import { task } from 'ember-concurrency';

export default class UploadToRedisController extends Controller {
  @service ajax;
  @service flashMessages;

  flushDB = false;
  dryRun = false;
  validate = false;

  @(task(function* () {
    const attrs = {
      tpid: this.model.alias,
      'flush-db': this.flushDB,
      'dry-run': this.dryRun,
      validate: this.validate,
    };
    try {
      const res = yield this.ajax.post('/api/load-tariff-plan', {
        data: { data: { attributes: attrs } },
      });
      if (isBlank(res.error)) {
        return this.flashMessages.success(
          'Tariff plan has been uploaded to CGrates'
        );
      } else {
        return this.flashMessages.danger(`Error! ${res.error}`);
      }
    } catch (e) {
      this.flashMessages.danger(`Something went wrong: ${e}`);
    }
  }).drop())
  uploadTask;
}
