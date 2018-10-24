import Mixin from '@ember/object/mixin';

export default Mixin.create({
  parentModelName: '',
  model() {
    return this.store.createRecord(`${this.get('parentModelName')}-import-job`, {
      tpid: this.modelFor('tariff-plan').get('alias')
    });
  },

  setupController(controller, model) {
    this._super(controller, model);
    controller.set('parentModelName', this.get('parentModelName'));
  },

  actions: {
    willTransition() {
      if (this.currentModel.get('isNew')) { this.currentModel.destroyRecord(); }
    }
  }
});
