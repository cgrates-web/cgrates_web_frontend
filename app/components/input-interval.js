import Component from '@glimmer/component';
import { action } from '@ember/object';
import { isPresent } from '@ember/utils';
import { last, includes, __ } from 'ramda';

const INTERVAL_UNITS = Object.freeze(['s', 'm', 'h']);

const isCorrectInterval = includes(__, INTERVAL_UNITS);

const DEFAULT_UNIT = 's';

export default class InputIntervalComponent extends Component {
  intervalUnits = Object.freeze(['s', 'm', 'h']);

  get valueNumber() {
    if (isPresent(this.args.value)) {
      const lastItem = last(this.args.value);
      if (isCorrectInterval(lastItem)) {
        return this.args.value.replace(new RegExp(`${lastItem}$`, 'g'), '');
      }
    }
    return '';
  }

  get currentIntervalUnit() {
    if (isPresent(this.args.value)) {
      const lastItem = last(this.args.value);
      if (isCorrectInterval(lastItem)) {
        return lastItem;
      } else {
        return DEFAULT_UNIT;
      }
    }
    return DEFAULT_UNIT;
  }

  @action
  intervalChange(unit) {
    this.args.onChange(this.valueNumber + unit);
  }

  @action
  onChange(value) {
    this.args.onChange(value + this.currentIntervalUnit);
  }
}
