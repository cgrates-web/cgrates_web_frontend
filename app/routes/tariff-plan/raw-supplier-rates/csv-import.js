import Route from '@ember/routing/route';

export default Route.extend({
  model() { 
    return this.store.createRecord('raw-supplier-rate-import-job', {
      tpid: this.modelFor('tariff-plan').get('id')
    });
  },

  actions: {
    willTransition() {
      if (this.currentModel.get('isNew')) { this.urrentModel.destroyRecord(); }
    }
  }
});