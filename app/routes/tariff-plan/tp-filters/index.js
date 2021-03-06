import Route from '@ember/routing/route';
import QueryRouteMixin from 'cgrates-web-frontend/mixins/query-route-mixin';

export default Route.extend(QueryRouteMixin, {
  queryParams: {
    tenant: {
      refreshModel: true,
    },
    customId: {
      refreshModel: true,
    },
    activationInterval: {
      refreshModel: true,
    },
    sortColumn: {
      refreshModel: true,
    },
    sortOrder: {
      refreshModel: true,
    },
    page: {
      refreshModel: true,
    },
    pageSize: {
      refreshModel: true,
    },
  },

  filterParams: Object.freeze(['tenant', 'customId', 'activationInterval']),

  modelName: 'tp-filter',
});
