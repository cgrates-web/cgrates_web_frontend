import Component from '@ember/component';
import { computed } from '@ember/object';
import { isEqual } from '@ember/utils';

export default Component.extend({
  classNames: ['sort-header'],
  tagName: 'td',

  currentColumn: computed('key', 'sortColumn', function() {
    return isEqual(this.get('key'), this.get('sortColumn'));
  }),

  actions: {
    toggleSort() {
      if (this.get('currentColumn')) {
        let newSortOrder;
        if (isEqual(this.get('sortOrder'), 'desc')) {
          newSortOrder = 'asc';
        } else {
          newSortOrder = 'desc';
        }
        return this.sendAction('sortAction', this.get('sortColumn'), newSortOrder);
      } else {
        return this.sendAction('sortAction', this.get('key'), 'asc');
      }
    }
  }
});
