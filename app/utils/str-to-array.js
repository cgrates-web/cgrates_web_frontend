import { isPresent } from '@ember/utils';

export default function strToArray(str) {
  return isPresent(str) ? str.toString().split(',') : [];
}
