import Route from '@ember/routing/route';

export default Route.extend({
  queryParams: {
    page: {
      refreshModel: true,
    },
    pageSize: {
      refreshModel: true,
    },
  },

  model(params) {
    return this.store.query('account', {
      page: params.page,
      per_page: params.pageSize,
    });
  },
});
