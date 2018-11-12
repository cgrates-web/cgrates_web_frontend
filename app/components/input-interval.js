import Component from '@ember/component';
import { computed } from '@ember/object';
import { isPresent } from '@ember/utils';

export default Component.extend({
  tagName: '',
  currentIntervalUnit: 's',
  intervalUnits: Object.freeze(['s', 'm', 'h']),

  valueNumber: computed('value', function () {
    if (isPresent(this.get('value'))) {
      const lastItem = this.get('value').substr(-1);
      if (this.intervalUnits.indexOf(lastItem) !== -1) {
        this.set('currentIntervalUnit', lastItem);
        return this.get('value').replace(new RegExp(`${lastItem}$`, 'g'), '');
      }
    }
    return null;
  }),

  actions: {
    intervalChange(value) {
      this.set('currentIntervalUnit', value);
      this.set('value', `${this.valueNumber}${value}`);
    },
    change() {},
    input(event) {
      this.set('value', isPresent(event.target.value) ? `${ event.target.value}${this.currentIntervalUnit}` : null);
    },
  }
});
