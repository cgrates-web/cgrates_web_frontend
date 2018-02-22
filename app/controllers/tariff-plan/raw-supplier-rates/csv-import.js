import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
export default Controller.extend({
  flashMessages: service(),
  actions: {
    save() {
      const file = document.getElementById('csv_import').files[0];
      this.model.set('csv', file);
      this.model.save().then(() => {
        this.get('flashMessages').success('Import from CSV is starting')
        this.transitionToRoute('tariff-plan.raw-supplier-rates.index')
      }).catch(() => {
        this.get('flashMessages').alert('Somethings went wrong')
      })
    }
  }
})
