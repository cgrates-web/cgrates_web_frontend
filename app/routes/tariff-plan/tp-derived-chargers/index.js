import Route from '@ember/routing/route';
import QueryRouteMixin from 'cgrates-web-frontend/mixins/query-route-mixin';

export default Route.extend(QueryRouteMixin, {
  queryParams: {
    loadid: { refreshModel: true },
    direction: { refreshModel: true },
    tenant: { refreshModel: true },
    category: { refreshModel: true },
    account: { refreshModel: true },
    subject: { refreshModel: true },
    destinationIds: { refreshModel: true },
    sortColumn: { refreshModel: true },
    sortOrder: { refreshModel: true },
    page: { refreshModel: true },
    pageSize: { refreshModel: true },
  },

  filterParams: Object.freeze([
    'loadid',
    'direction',
    'tenant',
    'category',
    'account',
    'subject',
    'destinationIds',
  ]),

  modelName: 'tp-derived-charger',
});
