import Route from '@ember/routing/route';
import QueryRouteMixin from 'cgrates-web-frontend/mixins/query-route-mixin';

export default Route.extend(QueryRouteMixin, {
  queryParams: {
    tenant: { refreshModel: true },
    customId: { refreshModel: true },
    filterIds: { refreshModel: true },
    activationInterval: { refreshModel: true },
    runId: { refreshModel: true },
    attributeIds: { refreshModel: true },
    weight: { refreshModel: true },
    sortColumn: { refreshModel: true },
    sortOrder: { refreshModel: true },
    page: { refreshModel: true },
    pageSize: { refreshModel: true },
  },

  filterParams: Object.freeze([
    'tenant',
    'customId',
    'filterIds',
    'activationInterval',
    'runId',
    'attributeIds',
    'weight',
  ]),

  modelName: 'tp-charger',
});
