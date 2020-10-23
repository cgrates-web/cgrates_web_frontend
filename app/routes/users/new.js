import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return this.store.createRecord('user');
  },

  actions: {
    willTransition() {
      if (this.currentModel.isNew) {
        return this.currentModel.destroyRecord();
      }
    },
  },
});
