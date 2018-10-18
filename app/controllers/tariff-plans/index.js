import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  flashMessages: service(),
  actions: {
    remove(record) {
      if (confirm('Are you sure?')) {
        try {
          record.destroyRecord();
          this.get('flashMessages').success('Tariff plan have been deleted');
        } catch (err) {
          this.get('flashMessages').danger('Somethings went wrong');
        }
      }
    }
  }
});
