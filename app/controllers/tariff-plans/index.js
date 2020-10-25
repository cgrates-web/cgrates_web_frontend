import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default Controller.extend({
  flashMessages: service(),

  remove: task(function* (record) {
    if (confirm('Are you sure?')) {
      try {
        yield record.destroyRecord();
        this.flashMessages.success('Tariff plan have been deleted');
      } catch (err) {
        this.flashMessages.danger('Somethings went wrong');
        throw err;
      }
    }
  }),
});
