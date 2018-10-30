import { helper } from '@ember/component/helper';

export function bsElementValidation([validationType]) {
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
export default helper(bsElementValidation);
