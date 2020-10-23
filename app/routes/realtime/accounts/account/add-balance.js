import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return this.store.createRecord('add-balance', {
      account: this.modelFor('realtime.accounts.account').id,
    });
  },

  actions: {
    willTransition() {
      if (this.currentModel.isNew) {
        return this.currentModel.destroyRecord();
      }
    },
  },
});
