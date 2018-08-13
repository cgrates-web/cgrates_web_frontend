import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    save() {
      const file = document.getElementById('csv_import').files[0];
      this.model.set('csv', file);
      return this.model.save();
    }
  }
});
