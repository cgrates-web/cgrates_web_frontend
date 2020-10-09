import Mixin from '@ember/object/mixin';

export default Mixin.create({
  actions: {
    willTransition() {
      if (this.currentModel.get('hasDirtyAttributes')) {
        return this.currentModel.rollbackAttributes();
      }
    },
  },
});
