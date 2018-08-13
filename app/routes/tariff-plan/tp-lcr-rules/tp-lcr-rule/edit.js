import Route from '@ember/routing/route';

export default Route.extend({
  model() { return this.modelFor('tariff-plan.tp-lcr-rules.tp-lcr-rule'); },

  actions: {
    willTransition() { if (this.currentModel.get('hasDirtyAttributes')) { return this.currentModel.rollbackAttributes(); } }
  }
});
