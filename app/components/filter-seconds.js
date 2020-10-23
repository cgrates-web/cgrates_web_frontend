import Component from '@ember/component';
import { action, set } from '@ember/object';
import { replace } from 'ramda';

const replaceSeconds = replace(/s$/, '');

export default class FilterSecondsComponent extends Component {
  get valueWithoutSeconds() {
    return replaceSeconds(this.value || '');
  }

  @action
  onInput({ target: { value } }) {
    const valToSet = value ? `${value}s` : value;
    set(this, 'value', valToSet);
  }
}
