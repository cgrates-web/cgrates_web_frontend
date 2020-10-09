import Component from '@ember/component';
import { computed } from '@ember/object';
import { isEqual } from '@ember/utils';

export default Component.extend({
  classNames: ['sort-header'],
  tagName: 'td',

  currentColumn: computed('key', 'sortColumn', function () {
    return isEqual(this.key, this.sortColumn);
  }),

  actions: {
    toggleSort() {
      if (this.currentColumn) {
        let newSortOrder;
        if (isEqual(this.sortOrder, 'desc')) {
          newSortOrder = 'asc';
        } else {
          newSortOrder = 'desc';
        }
        return this.sendAction('sortAction', this.sortColumn, newSortOrder);
      } else {
        return this.sendAction('sortAction', this.key, 'asc');
      }
    },
  },
});
