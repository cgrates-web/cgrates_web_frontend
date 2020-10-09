import Component from '@ember/component';
import { computed } from '@ember/object';
import { isPresent } from '@ember/utils';
// TODO:  replace this component to input-interval after template-lint merge
export default Component.extend({
  tagName: '',

  valueNumber: computed('value', function () {
    return isPresent(this.value) ? this.value.replace(/s$/, '') : null;
  }),

  actions: {
    change(event) {
      this.set(
        'value',
        isPresent(event.target.value) ? `${event.target.value}s` : null
      );
    },
    input() {},
  },
});
