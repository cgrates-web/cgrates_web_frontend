import Mixin from '@ember/object/mixin';
import { computed } from '@ember/object';
import { __, includes, pipe, prop, reject, anyPass, pick, path } from 'ramda';

const isPaginationQP = includes(__, ['page', 'pageSize']);
const isSortingQP = includes(__, ['sortColumn', 'sortOrder']);

function self() {
  return this;
}

export default Mixin.create({
  sortColumn: 'id',
  sortOrder: 'asc',

  page: 1,
  pageSize: 10,

  filtersQP: computed(
    'queryParams',
    pipe(
      self,
      prop('queryParams'),
      reject(anyPass([isPaginationQP, isSortingQP]))
    )
  ),

  filters: computed('filtersQP', function () {
    return pick(this.filtersQP, this);
  }),

  pagination: computed('meta.total_pages', 'page', 'totalPages', function () {
    return {
      page: this.page,
      totalPages: path('meta.total_pages', this) || 1,
    };
  }),

  totalPages: computed('meta.total_pages', function () {
    return this.meta.total_pages || 1;
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
