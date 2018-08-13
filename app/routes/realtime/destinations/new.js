import Route from '@ember/routing/route';

export default Route.extend({
  model() { return this.store.createRecord('destination'); },

  actions: {
    willTransition() { if (this.currentModel.get('isNew')) { return this.currentModel.destroyRecord(); } }
  }
});
