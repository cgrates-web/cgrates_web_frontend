import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { __, includes, pipe, prop, reject, anyPass, pick, path } from 'ramda';

const isPaginationQP = includes(__, ['page', 'pageSize']);
const isSortingQP = includes(__, ['sortColumn', 'sortOrder']);

export default class TpNewOrEditControllerBase extends Controller {
  @tracked
  sortColumn = 'id';

  @tracked
  sortOrder = 'asc';

  @tracked
  page = 1;

  @tracked
  pageSize = 10;

  get filterQP() {
    return pipe(
      prop('queryParams'),
      reject(anyPass([isPaginationQP, isSortingQP]))
    )(this);
  }

  get filters() {
    return pick(this.filterQP, this);
  }

  get pagination() {
    return {
      page: this.page,
      totalPages:
        path(['meta', 'total_pages'], this) ||
        path(['meta', 'totalPages'], this) ||
        1,
    };
  }

  get totalPages() {
    return this.meta.total_pages || 1;
  }

  @action
  search(query) {
    query['page'] = 1;
    return this.transitionToRoute({ queryParams: query });
  }

  @action
  toPage(page) {
    this.page = page;
  }

  @action
  sortBy(sortColumn, sortOrder) {
    this.sortColumn = sortColumn;
    this.sortOrder = sortOrder;
  }

  @action
  remove(record) {
    return record.destroyRecord();
  }
}
