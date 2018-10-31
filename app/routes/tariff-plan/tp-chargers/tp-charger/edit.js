import Route from '@ember/routing/route';

export default Route.extend({
  actions: {
    willTransition() {
      if (this.currentModel.get('hasDirtyAttributes')) {
        return this.currentModel.rollbackAttributes();
      }
    }
  }
});
