import Mixin from '@ember/object/mixin';
import { computed } from '@ember/object';

export default Mixin.create({
  sortColumn: 'id',
  sortOrder: 'asc',

  page: 1,
  pageSize: 10,

  pagination: computed('page', 'totalPages', function () {
    return {
      page: this.page,
      totalPages: this.totalPages,
    };
  }),

  totalPages: computed('meta.total_pages', function () {
    return this.get('meta.total_pages') || 1;
  }),

  actions: {
    search(query) {
      query['page'] = 1;
      return this.transitionToRoute({ queryParams: query });
    },

    toPage(page) {
      this.set('page', page);
    },

    sortBy(sortColumn, sortOrder) {
      this.set('sortColumn', sortColumn);
      return this.set('sortOrder', sortOrder);
    },

    remove(record) {
      return record.destroyRecord();
    },
  },
});
