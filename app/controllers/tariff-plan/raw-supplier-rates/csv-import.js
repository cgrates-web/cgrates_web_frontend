import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
export default Controller.extend({
  flashMessages: service(),
  actions: {
    save() {
      const file = this.get('file');
      this.model.set('csv', file);
      this.model.save().then(() => {
        this.get('flashMessages').success('Import from CSV is starting');
        this.transitionToRoute('tariff-plan.raw-supplier-rates.index');
      }).catch(() => {
        this.get('flashMessages').danger('Somethings went wrong')
      })
    }
  }
})
