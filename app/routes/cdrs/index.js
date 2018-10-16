import Route from '@ember/routing/route';
import QueryRouteMixin from 'cgrates-web-frontend/mixins/query-route-mixin';

export default Route.extend(QueryRouteMixin, {
  queryParams: {
    cgrid: {
      refreshModel: true
    },
    runId: {
      refreshModel: true
    },
    originHost: {
      refreshModel: true
    },
    source: {
      refreshModel: true
    },
    originId: {
      refreshModel: true
    },
    tor: {
      refreshModel: true
    },
    tenant: {
      refreshModel: true
    },
    category: {
      refreshModel: true
    },
    account: {
      refreshModel: true
    },
    destination: {
      refreshModel: true
    },
    sortColumn: {
      refreshModel: true
    },
    sortOrder: {
      refreshModel: true
    },
    page: {
      refreshModel: true
    },
    pageSize: {
      refreshModel: true
    }
  },

  filterParams: [
    'cgrid', 'runId', 'originHost', 'source', 'originId', 'tor',
     'tenant', 'category', 'account', 'destination'
  ],

  modelName: 'cdr',

  notInTariffPlan: true
});
