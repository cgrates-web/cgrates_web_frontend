import Route from '@ember/routing/route';

export default Route.extend({
  model() { return this.store.createRecord('add-balance', {account: this.modelFor('realtime.accounts.account').get('id')}); },

  actions: {
    willTransition() { if (this.currentModel.get('isNew')) { return this.currentModel.destroyRecord(); } }
  }
});
