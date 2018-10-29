import Helper from '@ember/component/helper';

export default Helper.extend({
  compute([validationType]) {
    switch (validationType) {
      case 'error':
        return 'is-invalid';
      case 'success':
        return 'is-valid';
      case 'warning':
        return 'is-warning';
      default:
        return '';
    }
  }
});
