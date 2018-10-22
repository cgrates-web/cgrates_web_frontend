import Component from '@ember/component';
import { computed } from '@ember/object';
import { isPresent } from '@ember/utils';

export default Component.extend({
  tagName: '',

  valueNumber: computed('value', function() {
    return isPresent(this.get('value')) ? this.get('value').replace(/s$/, '') : null;
  }),

  actions: {
    change(event) {
      this.set('value', isPresent(event.target.value) ? `${ event.target.value}s` : null);
    },
    input() {},
  }
});
