import Mixin from '@ember/object/mixin';

export default Mixin.create({
  actions: {
    willTransition() {
      if (this.currentModel.isNew) {
        return this.currentModel.destroyRecord();
      }
    },
  },
});
