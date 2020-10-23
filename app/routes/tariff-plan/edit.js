import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return this.modelFor('tariff-plan');
  },

  actions: {
    willTransition() {
      if (this.currentModel.hasDirtyAttributes) {
        return this.currentModel.rollbackAttributes();
      }
    },
  },
});
