import Route from '@ember/routing/route';
import QueryRouteMixin from 'cgrates-web-frontend/mixins/query-route-mixin';

export default Route.extend(QueryRouteMixin, {
  queryParams: {
    tag: { refreshModel: true },
    account: { refreshModel: true },
    strategy: { refreshModel: true },
    ratingSubject: { refreshModel: true },
    sortColumn: { refreshModel: true },
    sortOrder: { refreshModel: true },
    page: { refreshModel: true },
    pageSize: { refreshModel: true },
  },

  filterParams: Object.freeze(['tag', 'account', 'strategy', 'ratingSubject']),

  modelName: 'tp-shared-group',
});
