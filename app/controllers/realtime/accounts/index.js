import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  queryParams:     ['page', 'pageSize'],
  accountsSorting: ['id'],

  page:     1,
  pageSize: 10,

  sortedAccounts: computed.sort('model', 'accountsSorting'),


  pagination: computed('page', 'totalPages', function () {
    return {
      page: this.get('page'),
      totalPages: this.get('totalPages'),
    };
  }),

  totalPages: computed('page', function () {
    return this.get('page') + 1;
  }),

  actions: {
    remove(account) { return account.destroyRecord(); },
    toPage(page) { this.set('page', page); }
  }
});
