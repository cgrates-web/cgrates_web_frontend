import Mixin from '@ember/object/mixin';
import { computed } from '@ember/object';

export default Mixin.create({
  sortColumn: 'id',
  sortOrder:  'asc',

  page:     1,
  pageSize: 10,

  totalPages: computed('meta.total_pages', function() {
    return this.get('meta.total_pages');
  }),

  actions: {
    search(query) {
      query['page'] = 1;
      return this.transitionToRoute({queryParams: query});
    },

    sortBy(sortColumn, sortOrder) {
      this.set('sortColumn', sortColumn);
      return this.set('sortOrder', sortOrder);
    },

    remove(record) { return record.destroyRecord(); }
  }
});
