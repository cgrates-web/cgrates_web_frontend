import Component from '@ember/component';

export default Component.extend({
  classNames: ['csv-uploader'],
  actions: {
    attachFile(file) {
      this.set('file', file.blob);
    }
  }
});
